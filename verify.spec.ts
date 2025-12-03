import { test, expect } from '@playwright/test';

test('verify mobile design and speech-only mode', async ({ page }) => {
  // Set viewport for mobile
  await page.setViewportSize({ width: 375, height: 667 });

  await page.goto('http://localhost:8000/');

  // 1. Capture the initial mobile screen
  await page.screenshot({ path: 'mobile_view.png' });

  // 2. Check for initial message
  const wordElement = page.locator('#word');
  await expect(wordElement).toContainText('לחץ על הלוגו כדי להתחיל');

  // 3. Select the "Speech only" mode
  await page.selectOption('#speech-mode', 'speech-only');

  // 4. Click the logo to start
  await page.locator('#logo').click({ force: true });

  // 5. In "Speech only" mode, the word container should have a space
  await expect(wordElement).toHaveText(' ');

  // 6. Click the word container to reveal the word
  await page.locator('#word-container').click();

  // 6. Assert that the word is now visible
  await expect(wordElement).not.toHaveText(' ');
  await expect(wordElement).not.toBeEmpty();

  // 7. Capture the final state
  await page.screenshot({ path: 'revealed_word.png' });
});
