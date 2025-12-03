import { test, expect } from '@playwright/test';

test('verify speech-only mode and click-to-reveal', async ({ page }) => {
  await page.goto('http://localhost:8000/');

  // 1. Capture the initial screen with the styled dropdown
  await page.screenshot({ path: 'dropdown_style.png' });

  // 2. Select the "Speech only" mode
  await page.selectOption('#speech-mode', 'speech-only');

  // 3. Start the game
  await page.getByRole('button', { name: 'התחל משחק' }).click();

  // Wait for game screen to be visible
  await expect(page.locator('#game-screen')).toBeVisible();

  // 4. In "Speech only" mode, the word container should be almost empty initially
  // We set it to ' ' to make it clickable, so we'll check for that.
  const wordElement = page.locator('#word');
  await expect(wordElement).toHaveText(' ');

  // 5. Click the word container to reveal the word
  await page.locator('#word-container').click();

  // 6. Assert that the word is now visible
  await expect(wordElement).not.toHaveText(' ');
  await expect(wordElement).not.toBeEmpty();

  // 7. Capture the final state
  await page.screenshot({ path: 'revealed_word.png' });
});
