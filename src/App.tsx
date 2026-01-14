import { LandingPage } from './components/LandingPage';
import { LanguageProvider } from './context/LanguageContext';

// Configuración global para scroll restoration
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

export default function App() {
  return (
    <LanguageProvider>
      <LandingPage />
    </LanguageProvider>
  );
}
