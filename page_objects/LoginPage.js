class LoginPage {
  constructor(page) {
    this.page = page;
  }

  async login(username, password) {
    await this.page.fill('#user-name', username);
    await this.page.fill('#password', password);
    await this.page.click('#login-button');
  }
}

module.exports = LoginPage;
