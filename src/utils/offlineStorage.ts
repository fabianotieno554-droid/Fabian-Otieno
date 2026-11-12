import { useState, useEffect } from 'react';
import { BookingSubmission } from '../types/tour';
import { LOCATION_TRAVEL_TIPS, DestinationTip } from '../data/travelTipsData';
import { OFFICIAL_TILL_NUMBER, OFFICIAL_BUSINESS_NAME } from '../data/toursData';

const OFFLINE_RECEIPTS_KEY = 'safariquest_offline_receipts';
const OFFLINE_TRAVEL_TIPS_KEY = 'safariquest_offline_travel_tips';
const OFFLINE_ACTIVE_RECEIPT_ID_KEY = 'safariquest_offline_active_receipt_id';

export interface OfflineReceiptRecord {
  booking: BookingSubmission;
  qrDataUrl?: string;
  cachedAt: string;
}

/**
 * React hook to listen for online/offline connectivity changes in real-time
 */
export function useOnlineStatus(): boolean {
  const [isOnline, setIsOnline] = useState<boolean>(() => {
    return typeof navigator !== 'undefined' ? navigator.onLine : true;
  });

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return isOnline;
}

/**
 * Seed default offline receipt if none exists yet, so travelers can always view a valid pass offline
 */
export function getDefaultOfflineBooking(): BookingSubmission {
  return {
    id: 'SQ-660849',
    fullName: 'Fabian Otieno',
    email: 'reservations@Kenya-Quest-Safari.com',
    phone: '0752632206',
    cityId: 'maasai-mara',
    packageId: 'maasai-mara-safari',
    packageName: 'Maasai Mara Big Five Migration Safari (3 Days / 2 Nights)',
    travelDate: new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0],
    guestsCount: 2,
    totalAmountKES: 90000,
    depositAmountKES: 27000,
    paymentType: 'deposit',
    mpesaCode: 'TLL6608497',
    status: 'confirmed',
    createdAt: new Date().toISOString(),
    notes: 'Vegetarian meals preferred. Safari pickup at Westlands.',
  };
}

/**
 * Save a booking receipt and optional QR data URL to offline local storage
 */
export function saveOfflineReceipt(booking: BookingSubmission, qrDataUrl?: string): void {
  try {
    if (typeof window === 'undefined') return;

    const existingJson = localStorage.getItem(OFFLINE_RECEIPTS_KEY);
    const existing: Record<string, OfflineReceiptRecord> = existingJson ? JSON.parse(existingJson) : {};

    existing[booking.id] = {
      booking,
      qrDataUrl: qrDataUrl || existing[booking.id]?.qrDataUrl,
      cachedAt: new Date().toISOString(),
    };

    localStorage.setItem(OFFLINE_RECEIPTS_KEY, JSON.stringify(existing));
    localStorage.setItem(OFFLINE_ACTIVE_RECEIPT_ID_KEY, booking.id);
  } catch (err) {
    console.warn('Unable to persist offline receipt', err);
  }
}

/**
 * Retrieve the active or most recent offline receipt
 */
export function getLatestOfflineReceipt(): OfflineReceiptRecord {
  try {
    if (typeof window === 'undefined') {
      return { booking: getDefaultOfflineBooking(), cachedAt: new Date().toISOString() };
    }

    const activeId = localStorage.getItem(OFFLINE_ACTIVE_RECEIPT_ID_KEY);
    const existingJson = localStorage.getItem(OFFLINE_RECEIPTS_KEY);
    const existing: Record<string, OfflineReceiptRecord> = existingJson ? JSON.parse(existingJson) : {};

    if (activeId && existing[activeId]) {
      return existing[activeId];
    }

    const keys = Object.keys(existing);
    if (keys.length > 0) {
      return existing[keys[keys.length - 1]];
    }
  } catch (err) {
    console.warn('Error reading offline receipts', err);
  }

  // Fallback to default booking pass
  const defaultBooking = getDefaultOfflineBooking();
  return {
    booking: defaultBooking,
    cachedAt: new Date().toISOString(),
  };
}

/**
 * Retrieve all offline receipts saved on device
 */
export function getAllOfflineReceipts(): OfflineReceiptRecord[] {
  try {
    if (typeof window === 'undefined') return [];
    const existingJson = localStorage.getItem(OFFLINE_RECEIPTS_KEY);
    if (!existingJson) return [getLatestOfflineReceipt()];
    const existing: Record<string, OfflineReceiptRecord> = JSON.parse(existingJson);
    const list = Object.values(existing);
    return list.length > 0 ? list : [getLatestOfflineReceipt()];
  } catch {
    return [getLatestOfflineReceipt()];
  }
}

/**
 * Pre-cache all Location Travel Tips so travelers can read them without cellular connection
 */
export function cacheAllTravelTips(): void {
  try {
    if (typeof window === 'undefined') return;
    localStorage.setItem(OFFLINE_TRAVEL_TIPS_KEY, JSON.stringify(LOCATION_TRAVEL_TIPS));
  } catch (err) {
    console.warn('Unable to pre-cache travel tips', err);
  }
}

/**
 * Retrieve offline travel tips for a specific city or fallback to all
 */
export function getOfflineTravelTips(cityId?: string): DestinationTip {
  try {
    if (typeof window !== 'undefined') {
      const cached = localStorage.getItem(OFFLINE_TRAVEL_TIPS_KEY);
      const tips: Record<string, DestinationTip> = cached ? JSON.parse(cached) : LOCATION_TRAVEL_TIPS;
      if (cityId && tips[cityId]) {
        return tips[cityId];
      }
      return tips['all'] || tips['maasai-mara'] || LOCATION_TRAVEL_TIPS['all'];
    }
  } catch (err) {
    console.warn('Error reading offline travel tips', err);
  }

  return (cityId && LOCATION_TRAVEL_TIPS[cityId]) || LOCATION_TRAVEL_TIPS['all'];
}

/**
 * Initialize offline persistence on app startup
 */
export function initOfflineStorage(): void {
  cacheAllTravelTips();

  // If no offline receipt exists yet, save the default one
  try {
    if (typeof window !== 'undefined') {
      const existing = localStorage.getItem(OFFLINE_RECEIPTS_KEY);
      if (!existing) {
        saveOfflineReceipt(getDefaultOfflineBooking());
      }
    }
  } catch (err) {
    console.warn('Offline initialization error', err);
  }
}
