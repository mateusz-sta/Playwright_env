import { test, expect } from '@playwright/test';
import { transferLoginData } from '../test-data/login.data';
import { PulpitPage } from '../pages/login.page';
import { PaymentPage } from '../pages/transfer.page';

test.describe('login to Demobank', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    const login = transferLoginData.login;
    const password = transferLoginData.password;

    const loginPage = new PulpitPage(page);
    await loginPage.loginInput.fill(login);
    await loginPage.passwordInput.fill(password);
    await loginPage.loginButton.click();

    const pulpitPage = new PaymentPage(page);
    await pulpitPage.paymentButton.click();
  });
  test('bank ransfer', async ({ page }) => {
    //Arrange
    const transferReceiver = transferLoginData.transferReceiver;
    const transferAccount = transferLoginData.transferAccount;
    const adress = transferLoginData.adress;
    const zipcode = transferLoginData.zipcode;
    const transferAmount = transferLoginData.transferAmount;
    const transferTitle = transferLoginData.transferTitle;
    const email = transferLoginData.email;
    const nameReceiver = transferLoginData.namerReceiver;
    const expectedMessage = `Przelew wykonany! ${transferAmount},00PLN dla ${transferReceiver}`;
    //Act
    const paymentPage = new PaymentPage(page);
    await paymentPage.transferReceiverInput.fill(transferReceiver);
    await paymentPage.transferAccount.fill(transferAccount);
    await paymentPage.showPicklist.first().click();
    await paymentPage.adressInput.fill(adress);
    await paymentPage.zipcodeInput.fill(zipcode);
    await paymentPage.transferAmount.fill(transferAmount);
    await paymentPage.transferTitle.fill(transferTitle);
    await paymentPage.formDate.click();
    await paymentPage.linkInput.click();
    await paymentPage.expressTranfser.click();
    await paymentPage.expressTransferCheckbox.click();
    await paymentPage.formEmailCheckbox.click();
    await paymentPage.formEmailInput.fill(email);
    await paymentPage.listReceiverCheckbox.click();
    await paymentPage.listReceiverInput.fill(nameReceiver);
    await paymentPage.trustedCheckbox.click();
    await paymentPage.transferButton.click();
    await paymentPage.closeButton.click();
    //Assert
    await expect(paymentPage.messageText).toHaveText(expectedMessage);
  });
});
