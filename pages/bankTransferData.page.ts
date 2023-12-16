import { Page } from '@playwright/test';

export class transferAccountData {
  constructor(private page: Page) {}
  paymentTab = this.page.getByRole('link', { name: 'płatności' });
  transferReceiver = this.page.getByTestId('transfer_receiver');
  accountReceiver = this.page.getByTestId('form_account_to');
  transferAmount = this.page.getByTestId('form_amount');
  transferTitle = this.page.getByTestId('form_title');
  transferTypeButton = this.page.getByLabel('ekspresowy');
  confirmCheckboxEmail = this.page.locator('#uniform-form_is_email span');
  emailInput = this.page.locator('#form_email');
  transferButton = this.page.getByRole('button', { name: 'wykonaj przelew' });
  transferCloseButton = this.page.getByTestId('close-button');
  expectedTransferReceiver = this.page.locator('#show_messages')
  }
