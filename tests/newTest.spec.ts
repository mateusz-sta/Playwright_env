import { test, expect } from '@playwright/test';
import {
  topUpData,
  transferData,
  userLoginData,
} from '../test-data/newTestData.spec';
import {
  newTestLogin,
  newTestTopUp,
  newTestTransfer,
} from '../pages/newTestPages.page';

test.describe('Logging in to the bank and making a transfer and phone top up', () => {
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

  test('Phone top up transfer', async ({ page }) => {
    //Arrange
    const topUpReceiver = topUpData.topUpReceiver;
    const topUpAmount = topUpData.topUpAmount;
    const topUpButton = topUpData.topUpButton;
    const topUpExpectedMessage = `Doładowanie wykonane! ${topUpAmount},00PLN na numer ${topUpReceiver}`;
    //Act
    const topUp = new newTestTopUp(page);
    await topUp.topUpReceiverInput.selectOption(topUpReceiver);
    await topUp.topUpAmountInput.fill(topUpAmount);
    await topUp.TopUpAgreementCheckbox.click();
    await topUp.topUpButton.click();
    await topUp.topUpCloseButton.click();
    //Assert
    await expect(topUp.topUpExpectedMessage).toHaveText(topUpExpectedMessage);
  });
});
