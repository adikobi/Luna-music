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

test('reveals word on click in read-only mode', async ({ page }) => {
  await page.goto('http://localhost:8000/');

  // Wait for the logo button to be enabled
  const logoButton = page.locator('#logo-button');
  await expect(logoButton).toBeEnabled({ timeout: 10000 });

  // Open speech menu and select read-only mode
  await page.locator('#speech-button').click();
  await page.locator('#read-only-button').click();

  // Word container should be empty
  const wordContainer = page.locator('#word-container');
  await expect(wordContainer).toHaveText('');

  // Click the word container to reveal the word
  await wordContainer.click();

  // The word should be visible
  await expect(wordContainer).not.toHaveText('');
});
