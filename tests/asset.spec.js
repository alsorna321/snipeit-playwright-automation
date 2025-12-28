const { test, expect } = require('@playwright/test');

test('Login to Snipe-IT', async ({ page }) => {
  test.setTimeout(90000);

  // 1️⃣ Go to login page
  await page.goto('https://demo.snipeitapp.com/login', {
    waitUntil: 'domcontentloaded',
  });

  // 2️⃣ Wait for login form
  await page.waitForSelector('#username');
  await page.waitForSelector('#password');

  // 3️⃣ Fill credentials
  await page.fill('#username', 'admin');
  await page.fill('#password', 'password');

  // 4️⃣ Click login AND wait for navigation/reload safely
  await Promise.all([
    page.waitForLoadState('domcontentloaded'),
    page.click('button[type="submit"]'),
  ]);

  // 5️⃣ Navigate directly to Assets page (stable)
  await page.goto('https://demo.snipeitapp.com/hardware', {
    waitUntil: 'domcontentloaded',
  });

  // 6️⃣ Verify Assets page
  await expect(page).toHaveURL(/hardware/);
});
