import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { PulpitPage } from '../pages/login.page';

test.describe('User login to Demobank', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('login with correct credentials', async ({ page }) => {
    // Arrange
    const login = loginData.login;
    const password = loginData.password;
    const expectedTransferReceiver = 'Jan Demobankowy';
    //Act
    const loginPage = new PulpitPage(page);
    await loginPage.loginInput.fill(login);
    await loginPage.passwordInput.fill(password);
    await loginPage.loginButton.click();
    //Assert
    await expect(page.getByTestId('user-name')).toHaveText(
      expectedTransferReceiver,
    );
  });
});
