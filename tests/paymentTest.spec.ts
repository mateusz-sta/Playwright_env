import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';

test.describe('Payment tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    const login = loginData.login;
    const password = loginData.password;
    const loginPage = new LoginPage(page);
    await loginPage.loginInput.fill(login);
    await loginPage.passwordInput.fill(password);
    await loginPage.loginButton.click();
    await page.getByRole('link', { name: 'płatności' }).click();
  });
  test('Simple payment', async ({ page }) => {
    //Arrange
    const transferReceiver = 'Jan Kowalski';
    const transferAccount = '12 3456 7890 1234 5678 9999 99999';
    const transferAmount = '250';
    const expectedMessage = `Przelew wykonany! ${transferAmount},00PLN dla Jan Kowalski`;
    //Act
    await page.getByTestId('transfer_receiver').fill(transferReceiver);
    await page.getByTestId('form_account_to').fill(transferAccount);
    await page.getByTestId('form_amount').fill(transferAmount);
    await page.getByRole('button', { name: 'wykonaj przelew' }).click();
    await page.getByTestId('close-button').click();
    //Assert
    await expect(page.locator('#show_messages')).toHaveText(expectedMessage);
  });
});
