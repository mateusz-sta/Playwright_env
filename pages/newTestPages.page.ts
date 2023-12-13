import { Page } from '@playwright/test';

export class newTestLogin {
  constructor(private page: Page) {}
  loginInput = this.page.getByTestId('login-input');
  passwordInput = this.page.getByTestId('password-input');
  loginButton = this.page.getByRole('button', { name: 'zaloguj się' });
  expectedUserName = this.page.getByTestId('user-name')
}

export class newTestTransfer {
    constructor(private page: Page) {}
    transferReceiverInput = this.page.locator('#widget_1_transfer_receiver')
    transferAmountInput = this.page.locator('#widget_1_transfer_amount')
    transferTitleInput = this.page.locator('#widget_1_transfer_title')
    transferButton = this.page.getByRole('button', { name: 'wykonaj' })
    closeButon = this.page.getByTestId('close-button')
    expectedUserTransfer = this.page.locator('#show_messages');
  }