class AssetsPage {
  constructor(page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('https://demo.snipeitapp.com/hardware', {
      waitUntil: 'domcontentloaded',
    });
  }
}

module.exports = { AssetsPage };
