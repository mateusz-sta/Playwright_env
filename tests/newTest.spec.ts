import { test, expect } from '@playwright/test';
import { transferData, userLoginData } from '../test-data/newTestData.spec';
import { newTestLogin, newTestTransfer } from '../pages/newTestPages.page';

test.describe('Logging in to the bank and making a transfer', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    //Arrange
    const userLogin = userLoginData.userLogin;
    const userPassword = userLoginData.userPassword;
    const expectedUser = userLoginData.expectedUser;
    //Act
    const login = new newTestLogin(page);
    await login.loginInput.fill(userLogin);
    await login.passwordInput.fill(userPassword);
    await login.loginButton.click();
    //Assert
    await expect(login.expectedUserName).toHaveText(expectedUser);
  });

  test('Bank transfer', async ({ page }) => {
    //Arrange
    const transferReceiver = transferData.transferReceiver;
    const transferAmount = transferData.transferAmount;
    const transferTitle = transferData.transferTitle;
    const expectedMessage = `Przelew wykonany! Chuck Demobankowy - ${transferAmount},00PLN - Przelew`;
    //Act
    const transfer = new newTestTransfer(page);
    await transfer.transferReceiverInput.selectOption(transferReceiver);
    await transfer.transferAmountInput.fill(transferAmount);
    await transfer.transferTitleInput.fill(transferTitle);
    await transfer.transferButton.click();
    await transfer.closeButon.click();
    //Assert
    await expect(transfer.expectedUserTransfer).toHaveText(expectedMessage);
  });
});
