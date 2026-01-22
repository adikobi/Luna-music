const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  try {
      await page.goto('http://localhost:8000');

      // Wait for word to appear
      await page.waitForSelector('#word', { state: 'visible' });

      // Check initial score
      const scoreEl = await page.locator('#current-score');
      const initialScore = await scoreEl.innerText();
      console.log('Initial Score:', initialScore);

      // Click Success Button
      // The button ID is success-button
      await page.click('#success-button');

      // Wait for score to update (it happens instantly but let's wait a bit for animation)
      await page.waitForTimeout(500);

      const newScore = await scoreEl.innerText();
      console.log('New Score:', newScore);

      if (parseInt(newScore) <= parseInt(initialScore)) {
          throw new Error('Score did not increase');
      }

      // Take screenshot
      await page.screenshot({ path: '/home/jules/verification/verification.png' });
      console.log('Screenshot taken');

  } catch (e) {
      console.error(e);
      process.exit(1);
  } finally {
      await browser.close();
  }
})();
