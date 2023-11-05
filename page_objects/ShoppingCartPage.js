class ShoppingCartPage {
  constructor(page) {
    this.page = page;
  }

  async removeProductFromCart(productName) {
    const removeButtonSelector = `button[name=remove-${productName}]`;
    await this.page.click(removeButtonSelector);
  }

  async isProductInCart(productName) {
    const productInCartSelector = `text=${productName}`;
    try {
      await this.page.waitForSelector(productInCartSelector, { state: 'attached' });
      return true; // Product is in the cart
    } catch (error) {
      return false; // Product is not in the cart
    }
  }

  async continueShopping() {
    await this.page.click('.btn_secondary');
  }
  

  async checkout() {
    await this.page.click('.btn_action');
  }
}

module.exports = ShoppingCartPage;
