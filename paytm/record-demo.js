const { chromium } = require('playwright');
const path = require('path');

(async () => {
  console.log('Starting demo recording...');
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    recordVideo: {
      dir: __dirname,
      size: { width: 1440, height: 900 }
    }
  });

  const page = await context.newPage();

  console.log('Navigating to app...');
  await page.goto('http://localhost:3001');
  await page.waitForTimeout(2000);

  console.log('Clicking Launch App...');
  await page.click('text="Launch App"');
  await page.waitForTimeout(1500);

  console.log('Clicking Continue with Google...');
  await page.click('text="Google"');
  await page.waitForTimeout(1000);

  console.log('Typing email...');
  await page.fill('input[name="googleEmail"]', 'demo@settleguard.com');
  await page.waitForTimeout(800);

  console.log('Submitting login...');
  await page.click('button:has-text("Next")');
  
  console.log('Waiting for dashboard load...');
  await page.waitForURL('**/dashboard');
  await page.waitForTimeout(3000);

  console.log('Opening Connect Platforms...');
  await page.click('text="Connect Platforms"');
  await page.waitForTimeout(1500);

  console.log('Connecting Amazon...');
  const amazonConnectBtn = await page.locator('.cp-card', { hasText: 'Amazon Seller Central' }).locator('button', { hasText: 'Connect' });
  await amazonConnectBtn.click();
  
  console.log('Watching AI simulation...');
  await page.waitForTimeout(9000); // Wait for connection, simulation, results, and auto-close

  console.log('Finished. Closing...');
  await page.waitForTimeout(2000);

  const videoPath = await page.video().path();
  await context.close();
  await browser.close();

  const fs = require('fs');
  const finalPath = path.join(__dirname, 'SettleGuard_Demo.webm');
  fs.renameSync(videoPath, finalPath);
  
  console.log(`Successfully saved high-quality demo video to: ${finalPath}`);
})();
