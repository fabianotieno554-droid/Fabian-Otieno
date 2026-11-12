import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import { LanguageProvider } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';
import './index.css';
import { registerSW } from 'virtual:pwa-register';

// Register PWA service worker for offline booking receipt & travel tips caching
registerSW({
  immediate: true,
  onRegistered(r) {
    if (r) {
      console.log('KenyaQuest Safari PWA service worker registered');
    }
  },
  onRegisterError(error) {
    console.warn('PWA service worker registration:', error);
  },
});

createRoot(document.getElementById('root')!).render(
  <ThemeProvider>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </ThemeProvider>
);
