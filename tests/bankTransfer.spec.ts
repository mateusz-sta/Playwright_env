import { test, expect } from '@playwright/test';
import { userLoginData } from '../test-data/userLoginData.spec';
import { TestLogin } from '../pages/testLogin.page';
import { transferData } from '../test-data/transferData.spec';
import { transferAccountData } from '../pages/bankTransferData.page';

test.describe('going to the payment tab and making the transfer', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    //Arrange
    const userLogin = userLoginData.userLogin;
    const userPassword = userLoginData.userPassword;
    const expectedUser = userLoginData.expectedUser;

    //Act
    const login = new TestLogin(page);
    await login.loginInput.fill(userLogin);
    await login.passwordInput.fill(userPassword);
    await login.loginButton.click();
    //Assert
    await expect(login.expectedUserName).toHaveText(expectedUser);
  });

  test('Going to the payment tab and making the transfer', async ({ page }) => {
    //Arrange
    const transferReceiver = transferData.transferReceiver;
    const accountNumber = transferData.accountNumber;
    const transferAmount = transferData.transferAmount;
    const transferTitle = transferData.transferTitle;
    const email = transferData.email;
    const expectedMessage = `Przelew wykonany! ${transferAmount},00PLN dla ${transferReceiver}`;
    //Act
    const transfer = new transferAccountData(page);
    await transfer.paymentTab.click();
    await transfer.transferReceiver.fill(transferReceiver);
    await transfer.accountReceiver.fill(accountNumber);
    await transfer.transferAmount.fill(transferAmount);
    await transfer.transferTitle.fill(transferTitle);
    await transfer.transferTypeButton.check();
    await transfer.confirmCheckboxEmail.click();
    await transfer.emailInput.fill(email);
    await transfer.transferButton.click();
    await transfer.transferCloseButton.click();
    //Assert
    await expect(transfer.expectedTransferReceiver).toHaveText(expectedMessage)
    });
  });
//});
