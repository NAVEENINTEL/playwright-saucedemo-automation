const { chromium } = require('playwright');
const assert = require('assert');
const LoginPage = require('../page_objects/LoginPage');
const ProductsPage = require('../page_objects/ProductsPage');
const ShoppingCartPage = require('../page_objects/ShoppingCartPage');
const CheckoutPage = require('../page_objects/CheckoutPage');

(async () => {
  const browser = await chromium.launch();
   // const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  const loginPage = new LoginPage(page);
  const productsPage = new ProductsPage(page);
  const shoppingCartPage = new ShoppingCartPage(page);
  const checkoutPage = new CheckoutPage(page);

  await page.goto('https://www.saucedemo.com/');

  await loginPage.login('standard_user', 'secret_sauce');

  // Test: Add a product to the cart
  await productsPage.addProductToCart('sauce-labs-backpack');
  assert.ok(await shoppingCartPage.isProductInCart('Sauce Labs Backpack'));

  // Test: Go to the shopping cart
  await productsPage.goToShoppingCart();

  // Test: Verifying that a product is displayed on the product page
  // After navigating to the shopping cart, we'll go back to the product page to verify
  await page.goto('https://www.saucedemo.com/inventory.html');
  const productToVerify = 'Sauce Labs Backpack';
  await productsPage.verifyProductOnPage(productToVerify);
  
  // Assertion: Check if the product is displayed on the product page
  assert.ok(await productsPage.isProductDisplayed(productToVerify));

  // Test: Sorting products by different criteria (e.g., price, name)
  await page.goto('https://www.saucedemo.com/inventory.html');
  const sortByPrice = 'Price (low to high)';
  await productsPage.sortProducts(sortByPrice);

  // Test: Proceeding to checkout from the shopping cart
  await productsPage.goToShoppingCart();
  await shoppingCartPage.checkout();

  // Test: Filling out the checkout information
  await checkoutPage.fillCheckoutInformation('John', 'Doe', '12345');

  // Test: Verifying that the order summary is correct
  await checkoutPage.verifyOrderSummary('Sauce Labs Backpack');

  // Test: Completing the purchase
  await checkoutPage.completePurchase();

  // Assertion: Check if the purchase is successful (you can define the assertion as per your requirements)
  assert.ok(await checkoutPage.isPurchaseSuccessful());

  await browser.close();
})();
