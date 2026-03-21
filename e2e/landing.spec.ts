import { test, expect } from '@playwright/test';

test('landing page smoke test', async ({ page }) => {
  // Start at the root (it will hit next-intl middleware and redirect)
  const response = await page.goto('/');
  
  // Basic smoke check: page loads successfully with 2xx status
  expect(response?.ok()).toBeTruthy();
  
  // Verify body is rendered
  await expect(page.locator('body')).toBeVisible();
});
