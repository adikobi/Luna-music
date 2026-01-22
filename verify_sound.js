const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  try {
      await page.goto('http://localhost:8000');

      // Wait for word to appear
      await page.waitForSelector('#word', { state: 'visible' });

      // Check Mute Button Exists
      await page.waitForSelector('#mute-button', { state: 'visible' });

      // Click Mute Button and Verify State Change
      const muteButton = await page.locator('#mute-button');

      const initialText = await muteButton.innerText();
      console.log('Initial Mute Text:', initialText);

      await muteButton.click();

      const mutedText = await muteButton.innerText();
      console.log('Muted Text:', mutedText);

      if (initialText === mutedText) {
          throw new Error('Mute button text did not change');
      }

      // Take screenshot of header area
      await page.screenshot({ path: '/home/jules/verification/sound_verification.png' });
      console.log('Screenshot taken');

  } catch (e) {
      console.error(e);
      process.exit(1);
  } finally {
      await browser.close();
  }
})();
