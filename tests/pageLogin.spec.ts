import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';

// Arrange

const login = loginData.login;
const password = loginData.password;
const incorrectLogin = loginData.incorrectLogin;
const expectedTransferReceiver = 'Jan Demobankowy';
const expectedLoginAssert = 'identyfikator ma min. 8 znaków';
const expectedPasswordAssert = 'hasło ma min. 8 znaków';
const topUpAmount = '150';
const topUpReceiver = '502 xxx xxx';
const expectedMessage = `Doładowanie wykonane! ${topUpAmount},00PLN na numer ${topUpReceiver}`;
const transferAmount = '650';
const loanTitle = 'pożyczka';

test.describe('User login to Demobank', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });
  // Act
  test('login with correct credentials', async ({ page }) => {
    await page.getByTestId('login-input').fill(login);
    await page.getByTestId('password-input').fill(password);
    await page.getByTestId('login-button').click();

    //Assert
    await expect(page.getByTestId('user-name')).toHaveText(
      expectedTransferReceiver,
    );
  });

  test('login with incorrect credentials with incorrect username', async ({
    page,
  }) => {
    await page.getByTestId('login-input').fill(incorrectLogin);
    await page.getByTestId('password-input').fill(password);

    await expect(page.getByTestId('error-login-id')).toHaveText(
      expectedLoginAssert,
    );
  });

  test('login with incorrect credentials with incorrect password', async ({
    page,
  }) => {
    await page.getByTestId('login-input').fill(login);
    await page.getByTestId('password-input').fill('123');
    await page.getByTestId('password-input').press('Tab');

    await expect(page.getByTestId('error-login-password')).toHaveText(
      expectedPasswordAssert,
    );
  });

  test('login with incorrect credentials without login and password', async ({
    page,
  }) => {
    await page.getByTestId('login-input').fill('');
    await page.getByTestId('password-input').fill('');

    await expect(page.getByTestId('error-login-id')).toHaveText(
      'pole wymagane',
    );
  });

  test('Login to app with correct credentials', async ({ page }) => {
    await page.getByTestId('login-input').fill(login);
    await page.getByTestId('password-input').fill(password);
    await page.getByTestId('login-button').click();

    await expect(page.getByTestId('user-name')).toHaveText(
      expectedTransferReceiver,
    );

    //Bank transfer
    await page.locator('#widget_1_transfer_receiver').selectOption('3');
    await page.locator('#widget_1_transfer_amount').fill(transferAmount);
    await page.locator('#widget_1_transfer_title').fill(loanTitle);
    await page.getByRole('button', { name: 'wykonaj' }).click();
    await page.getByTestId('close-button').click();

    //Act phone transfer
    await page.locator('#widget_1_topup_receiver').selectOption(topUpReceiver);
    await page.locator('#widget_1_topup_amount').fill(topUpAmount);
    await page.locator('#uniform-widget_1_topup_agreement').click();
    await page
      .locator('#uniform-widget_1_topup_agreement span')
      .getByLabel('zapoznałem się z regulaminem i akceptuję warunki');
    await page.getByRole('button', { name: 'doładuj telefon' }).click();
    await page.getByRole('button', { name: 'Ok' }).click();
    //Assert
    await expect(page.locator('#show_messages')).toHaveText(expectedMessage);
  });
});

//www.automationpractice.com
