import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { PulpitPage } from '../pages/login.page';

const transferAmount = '650';
const loanTitle = 'pożyczka';

test.describe('User login to Demobank', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    const login = loginData.login;
    const password = loginData.password;

    const loginPage = new PulpitPage(page);
    await loginPage.loginInput.fill(login);
    await loginPage.passwordInput.fill(password);
    await loginPage.loginButton.click();
  });

  test('Bank transfer', async ({ page }) => {
    // Arrange
    await page.locator('#widget_1_transfer_receiver').selectOption('3');
    await page.locator('#widget_1_transfer_amount').fill(transferAmount);
    await page.locator('#widget_1_transfer_title').fill(loanTitle);
    await page.getByRole('button', { name: 'wykonaj' }).click();
    await page.getByTestId('close-button').click();
  });
});
