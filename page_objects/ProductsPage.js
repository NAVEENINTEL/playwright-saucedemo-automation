class ProductsPage {
  constructor(page) {
    this.page = page;
  }

  async addProductToCart(productName) {
    await this.page.click(`button[name=add-to-cart-${productName}]`);
  }

  async goToShoppingCart() {
    const shoppingCartBadgeSelector = '.shopping_cart_badge';
    await this.page.waitForSelector(shoppingCartBadgeSelector, { timeout: 10000 });
    await this.page.click(shoppingCartBadgeSelector);
  }
  
  async verifyProductOnPage(productName) {
    const productSelector = `text=${productName}`;
    await this.page.waitForSelector(productSelector);
  }

  async sortProducts(sortOption) {
    await this.page.selectOption('.product_sort_container', sortOption);
  }

  async isProductInCart(productName) {
    const productInCartSelector = `text=${productName}`;
    return await this.page.isVisible(productInCartSelector);
  }

  async isProductDisplayed(productName) {
    const productSelector = `text=${productName}`;
    return await this.page.isVisible(productSelector);
  }

  
}

module.exports = ProductsPage;
