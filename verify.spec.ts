import { test, expect } from '@playwright/test';

test('verify new high-contrast design and functionality', async ({ page }) => {
  await page.goto('http://localhost:8000/');

  // Wait for the logo button to be enabled (after words are fetched)
  const logoButton = page.locator('#logo-button');
  await expect(logoButton).toBeEnabled({ timeout: 10000 });

  // Click the logo button to generate a new word
  await logoButton.click();

  // Click the speech button to hear the word
  const speechButton = page.locator('#speech-button');
  await speechButton.click();

  // Take a screenshot to verify the new design
  await page.screenshot({ path: '/home/jules/verification/verification.png' });
});
