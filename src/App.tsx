/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CityDestinations } from './components/CityDestinations';
import { TourPackages } from './components/TourPackages';
import { TravelVideoShowcase } from './components/TravelVideoShowcase';
import { PaybillSection } from './components/PaybillSection';
import { ReviewsAndFaq } from './components/ReviewsAndFaq';
import { LocationTravelTips } from './components/LocationTravelTips';
import { FacebookCommunitySection } from './components/FacebookCommunitySection';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { CityDetailsModal } from './components/CityDetailsModal';
import { ReceiptModal } from './components/ReceiptModal';
import { QrCodeModal } from './components/QrCodeModal';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';
import { AiChatAgent } from './components/AiChatAgent';
import { TravelerProfileModal } from './components/TravelerProfileModal';
import { OfflineIndicator } from './components/OfflineIndicator';
import { initOfflineStorage, getLatestOfflineReceipt } from './utils/offlineStorage';
import { CITIES_DATA, TOUR_PACKAGES } from './data/toursData';
import { CityDestination, TourPackage, Currency, BookingSubmission } from './types/tour';

export default function App() {
  const [currentCurrency, setCurrentCurrency] = useState<Currency>('KES');
  const [selectedCityFilter, setSelectedCityFilter] = useState<string>('all');
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [qrModalOpen, setQrModalOpen] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [receiptModalOpen, setReceiptModalOpen] = useState(false);
  const [selectedCityForDetails, setSelectedCityForDetails] = useState<CityDestination | null>(null);
  const [preselectedPackage, setPreselectedPackage] = useState<TourPackage | null>(null);
  const [confirmedBooking, setConfirmedBooking] = useState<BookingSubmission | null>(null);

  // Initialize PWA offline cache for booking receipts & travel tips
  useEffect(() => {
    initOfflineStorage();
  }, []);

  // Search filter handler from hero
  const handleHeroSearch = (cityId: string) => {
    setSelectedCityFilter(cityId);
  };

  // Open booking modal with default or selected tour
  const handleOpenBooking = () => {
    setPreselectedPackage(null);
    setBookingModalOpen(true);
  };

  // User clicks "Book Trip" on a city card
  const handleBookCity = (city: CityDestination) => {
    const matchingPkg =
      TOUR_PACKAGES.find((p) => p.cityId === city.id) || TOUR_PACKAGES[0];
    setPreselectedPackage(matchingPkg);
    setBookingModalOpen(true);
  };

  // User clicks "Reserve Package With M-Pesa" on a package card
  const handleBookPackage = (pkg: TourPackage) => {
    setPreselectedPackage(pkg);
    setBookingModalOpen(true);
  };

  // User clicks "View Itinerary" on a package card
  const handleViewPackageItinerary = (pkg: TourPackage) => {
    const matchingCity =
      CITIES_DATA.find((c) => c.id === pkg.cityId) ||
      CITIES_DATA.find((c) => pkg.cityName.toLowerCase().includes(c.name.toLowerCase())) ||
      CITIES_DATA[0];
    setSelectedCityForDetails(matchingCity);
  };

  // User verifies an M-Pesa code in the Paybill section
  const handleVerifyMpesaCode = (code: string, amount: number, accountName: string) => {
    const defaultPkg = TOUR_PACKAGES[0];
    const newBooking: BookingSubmission = {
      id: 'SQ-' + Math.floor(100000 + Math.random() * 900000),
      fullName: accountName || 'Valued Traveler',
      email: 'guest@traveler.com',
      phone: '0752632206',
      cityId: defaultPkg.cityId,
      packageId: defaultPkg.id,
      packageName: defaultPkg.title,
      travelDate: new Date(Date.now() + 86400000 * 5).toISOString().split('T')[0],
      guestsCount: 2,
      totalAmountKES: defaultPkg.pricePerPersonKES * 2,
      depositAmountKES: amount,
      paymentType: amount >= defaultPkg.pricePerPersonKES * 2 ? 'full' : 'deposit',
      mpesaCode: code,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
    };
    setConfirmedBooking(newBooking);
    setReceiptModalOpen(true);
  };

  // Handle successful submission from the booking modal
  const handleBookingSubmit = (booking: BookingSubmission) => {
    setBookingModalOpen(false);
    setConfirmedBooking(booking);
    setReceiptModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-emerald-500 selection:text-white transition-colors duration-150">
      {/* Navigation */}
      <Navbar
        currentCurrency={currentCurrency}
        onCurrencyChange={setCurrentCurrency}
        onOpenBooking={handleOpenBooking}
        onOpenQrModal={() => setQrModalOpen(true)}
        onOpenProfile={() => setProfileModalOpen(true)}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero with Paybill quick badge & search bar */}
        <Hero
          onSearch={handleHeroSearch}
          onOpenBooking={handleOpenBooking}
        />

        {/* Featured City Destinations with High-Res Photography */}
        <CityDestinations
          cities={CITIES_DATA}
          currentCurrency={currentCurrency}
          selectedFilter={selectedCityFilter}
          onFilterChange={setSelectedCityFilter}
          onSelectCity={(city) => setSelectedCityForDetails(city)}
          onBookCity={handleBookCity}
        />

        {/* Curated Tour Packages */}
        <TourPackages
          packages={TOUR_PACKAGES}
          currentCurrency={currentCurrency}
          onBookPackage={handleBookPackage}
          onViewItinerary={handleViewPackageItinerary}
        />

        {/* Short Tour and Travel Video Showcase: Cities, Hotels & Safari Lodges, Game Parks */}
        <TravelVideoShowcase
          onSelectPackage={(pkgId) => {
            const pkg = TOUR_PACKAGES.find((p) => p.id === pkgId);
            if (pkg) handleBookPackage(pkg);
          }}
        />

        {/* Paybill 6608497 & Lipa Na M-Pesa Interactive Guide & Calculator */}
        <PaybillSection
          currentCurrency={currentCurrency}
          onVerifyCode={handleVerifyMpesaCode}
          onStartBookingWithPackage={(pkgId) => {
            const pkg = TOUR_PACKAGES.find((p) => p.id === pkgId);
            if (pkg) handleBookPackage(pkg);
          }}
          onOpenQrModal={() => setQrModalOpen(true)}
        />

        {/* Facebook Page & Community Hub */}
        <FacebookCommunitySection onOpenBooking={handleOpenBooking} />

        {/* Traveler Reviews & FAQs Accordion */}
        <ReviewsAndFaq />

        {/* Dynamic Location-Specific Travel Tips (Best Time to Visit, Local Etiquette, Currency, Packing, Safety) */}
        <LocationTravelTips
          currentFilter={selectedCityFilter}
          onFilterChange={setSelectedCityFilter}
        />
      </main>

      {/* Footer */}
      <Footer onOpenProfile={() => setProfileModalOpen(true)} />

      {/* Interactive Modals */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        initialPackage={preselectedPackage}
        currentCurrency={currentCurrency}
        onBookingSubmit={handleBookingSubmit}
      />

      <CityDetailsModal
        city={selectedCityForDetails}
        currentCurrency={currentCurrency}
        onClose={() => setSelectedCityForDetails(null)}
        onBookCity={handleBookCity}
        onBookPackage={handleBookPackage}
      />

      {(confirmedBooking || receiptModalOpen) && (
        <ReceiptModal
          booking={confirmedBooking || getLatestOfflineReceipt().booking}
          onClose={() => {
            setConfirmedBooking(null);
            setReceiptModalOpen(false);
          }}
        />
      )}

      {/* Universal QR Code Hub for Visitors & Customers */}
      <QrCodeModal
        isOpen={qrModalOpen}
        onClose={() => setQrModalOpen(false)}
      />

      {/* Frequent Traveler Profile & Badges Showcase Modal */}
      <TravelerProfileModal
        isOpen={profileModalOpen}
        onClose={() => setProfileModalOpen(false)}
      />

      {/* Non-intrusive Offline Connectivity Indicator & Quick Voucher Shortcut */}
      <OfflineIndicator
        onOpenReceipt={() => setReceiptModalOpen(true)}
        onOpenTips={() => {
          const el = document.getElementById('travel-tips');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Multilingual AI Concierge & Safari Guide */}
      <AiChatAgent onOpenBooking={handleOpenBooking} />

      {/* Floating Action Button for direct WhatsApp support */}
      <WhatsAppFloatingButton phoneNumber="254752632206" />
    </div>
  );
}
