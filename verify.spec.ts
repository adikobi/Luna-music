
import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:8000/');
  await page.getByRole('button', { name: 'התחל משחק' }).click();
  await page.screenshot({ path: '/home/jules/verification/game_screen.png' });
});
