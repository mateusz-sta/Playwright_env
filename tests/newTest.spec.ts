import { test, expect } from '@playwright/test';

test.describe('Logging in to the bank and making a transfer', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Login with correct credentials', async ({ page }) => {
    const userLogin = 'Johnatan';
    const userPassword = '12345678';
    const expectedUser = 'Jan Demobankowy';
    //Act

    //Arrange
    await page.getByTestId('login-input').fill(userLogin);
    await page.getByTestId('password-input').fill(userPassword);
    await page.getByTestId('login-button').click();

    //Assert
    await expect(page.getByTestId('user-name')).toHaveText(expectedUser);
  });
});
