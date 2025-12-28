class LoginPage {
  constructor(page) {
    this.page = page;
    this.username = '#username';
    this.password = '#password';
    this.loginButton = 'button[type="submit"]';
  }

  async goto() {
    await this.page.goto('https://demo.snipeitapp.com/login', {
      waitUntil: 'domcontentloaded',
    });
  }

  async login(username, password) {
    await this.page.fill(this.username, username);
    await this.page.fill(this.password, password);
    await Promise.all([
      this.page.waitForLoadState('domcontentloaded'),
      this.page.click(this.loginButton),
    ]);
  }
}

module.exports = { LoginPage };
