import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/rajdhani/400.css'
import '@fontsource/rajdhani/500.css'
import '@fontsource/rajdhani/600.css'
import '@fontsource/rajdhani/700.css'
import './index.css'
import App from './App.jsx'

// Clean up legacy caches immediately so new assets are loaded without manual browser purge
if (typeof window !== 'undefined' && 'caches' in window) {
  caches.keys().then((keys) => {
    keys.forEach((key) => {
      if (key !== 'thirdeye-v3-static') {
        caches.delete(key);
      }
    });
  }).catch(() => {});
}

// Register Service Worker for aggressive offline & background asset caching
if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then((reg) => {
      reg.update().catch(() => {});
    }).catch(() => {});
  });
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

