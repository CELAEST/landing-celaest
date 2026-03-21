import { render, screen, fireEvent } from '@testing-library/react';
import { expect, test, vi } from 'vitest';
import { LanguageSelector } from '../../src/components/landing/language-selector';

// Mock next-intl hooks
vi.mock('next-intl', () => ({
  useLocale: () => 'en'
}));

// Mock navigation hooks
const mockReplace = vi.fn();
vi.mock('@/i18n/navigation', () => ({
  useRouter: () => ({
    replace: mockReplace
  }),
  usePathname: () => '/'
}));

// Mock routing constants
vi.mock('@/i18n/routing', () => ({
  routing: { locales: ['en', 'es'] },
  localeNames: { en: 'English', es: 'Español' },
  localeCodes: { en: 'EN', es: 'ES' }
}));

// Mock React's useTransition to immediately execute the callback
vi.mock('react', async () => {
  const actual = await vi.importActual('react');
  return {
    ...actual,
    useTransition: () => [false, (cb: () => void) => cb()]
  };
});

test('LanguageSelector renders correctly and toggles dropdown', () => {
  render(<LanguageSelector />);
  
  // Trigger button should display current locale 'EN'
  const button = screen.getByRole('button', { name: /Language: EN/i });
  expect(button).toBeInTheDocument();
  
  // Dropdown should initially be closed
  expect(screen.queryByText('Español')).not.toBeInTheDocument();
  
  // Click to open dropdown
  fireEvent.click(button);
  expect(screen.getByText('Español')).toBeInTheDocument();
  expect(screen.getByText('English')).toBeInTheDocument();
  
  // Click an option to change language
  const esButton = screen.getByText('Español').closest('button');
  fireEvent.click(esButton!);
  
  // Expect router.replace to have been called with the new locale 'es'
  expect(mockReplace).toHaveBeenCalledWith(
    { pathname: '/' },
    { locale: 'es' }
  );
});
