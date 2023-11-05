class CheckoutPage {
    constructor(page) {
      this.page = page;
    }
  
    async fillCheckoutInformation(firstName, lastName, zipCode) {
      await this.page.fill('#first-name', firstName);
      await this.page.fill('#last-name', lastName);
      await this.page.fill('#postal-code', zipCode);
      await this.page.click('#continue');
    }
  
    async verifyOrderSummary(productName) {
      const orderSummarySelector = `text=${productName}`;
      await this.page.waitForSelector(orderSummarySelector);
    }
  
    async completePurchase() {
      await this.page.click('#finish');
    }

    async isPurchaseSuccessful() {
        // Define a selector that represents a confirmation element after a successful purchase
        const confirmationSelector = '.complete-header';
        
        try {
          await this.page.waitForSelector(confirmationSelector, { state: 'visible' });
          return true; // Successful purchase confirmation is visible
        } catch (error) {
          return false; // Confirmation is not visible, indicating an unsuccessful purchase
        }
      }
  }
  
  module.exports = CheckoutPage;
  