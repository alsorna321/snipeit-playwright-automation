const { test, expect } = require('@playwright/test');

test('Create and validate MacBook Pro asset', async ({ page }) => {
  test.setTimeout(180000);

  // =====================
  // LOGIN (STABLE)
  // =====================
  await page.goto('https://demo.snipeitapp.com/login', {
    waitUntil: 'domcontentloaded',
  });

  await page.locator('#username').fill('admin');
  await page.locator('#password').fill('password');

  await Promise.all([
    page.waitForLoadState('networkidle'),
    page.locator('button[type="submit"]').click(),
  ]);

  // =====================
  // OPEN CREATE ASSET PAGE DIRECTLY
  // (UI navigation is flaky — URL is stable)
  // =====================
  await page.goto('https://demo.snipeitapp.com/hardware/create', {
    waitUntil: 'domcontentloaded',
  });

  // Wait until form is actually usable
  const nameInput = page.locator('#name');
  await nameInput.waitFor({ state: 'attached' });

  const assetName = `MacBook Pro 13 - ${Date.now()}`;

  // =====================
  // FILL FORM
  // =====================
  await nameInput.fill(assetName);

  // Model
  await page.locator('#select2-model_select-container').click();
  await page.locator('.select2-search__field').fill('MacBook Pro 13');
  await page.keyboard.press('Enter');

  // Status
  await page.locator('#select2-status_select-container').click();
  await page.locator('.select2-search__field').fill('Ready to Deploy');
  await page.keyboard.press('Enter');

  // Assign to first user (random enough for demo)
  await page.locator('#select2-assigned_user_select-container').click();
  await page.keyboard.press('ArrowDown');
  await page.keyboard.press('Enter');

  // =====================
  // SAVE
  // =====================
  await Promise.all([
    page.waitForLoadState('networkidle'),
    page.locator('button[type="submit"]').click(),
  ]);

  // =====================
  // VERIFY ASSET IN LIST
  // =====================
  await expect(page.locator('table')).toContainText(assetName, {
    timeout: 60000,
  });

  await page.locator(`text=${assetName}`).first().click();

  // =====================
  // VERIFY DETAILS
  // =====================
  await expect(page.locator('h1')).toContainText(assetName);
  await expect(page.locator('body')).toContainText('MacBook Pro 13');
  await expect(page.locator('body')).toContainText('Ready to Deploy');

  // =====================
  // VERIFY HISTORY
  // =====================
  await page.locator('text=History').click();

  await expect(page.locator('table')).toContainText('Created');
});


