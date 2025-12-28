const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { AssetsPage } = require('../pages/AssetsPage');

test('Login and open Assets page', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const assetsPage = new AssetsPage(page);

  await loginPage.goto();
  await loginPage.login('admin', 'password');

  await assetsPage.goto();
  await expect(page).toHaveURL(/hardware/);
});
