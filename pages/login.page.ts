import { Page } from '@playwright/test';

export class PulpitPage {
  constructor(private page: Page) {}

  paymentButton = this.page.getByRole('link', { name: 'płatności' });

  loginInput = this.page.getByTestId('login-input');
  passwordInput = this.page.getByTestId('password-input');
  loginButton = this.page.getByTestId('login-button');
}
