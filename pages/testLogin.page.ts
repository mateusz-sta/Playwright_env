import { Page } from '@playwright/test';

export class TestLogin {
    constructor(private page: Page) {}
    loginInput = this.page.getByTestId('login-input');
    passwordInput = this.page.getByTestId('password-input');
    loginButton = this.page.getByRole('button', { name: 'zaloguj się' });
    expectedUserName = this.page.getByTestId('user-name');
  }