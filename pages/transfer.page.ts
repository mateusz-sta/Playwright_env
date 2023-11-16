import { Page } from '@playwright/test';

export class PaymentPage {
    constructor(private page: Page) {}

    paymentButton = this.page.getByRole('link', { name: 'płatności' })
  
    transferReceiverInput = this.page.getByTestId('transfer_receiver');
    transferAccount = this.page.getByTestId('form_account_to');
    showPicklist = this.page.locator('.i-show');
    adressInput = this.page.getByPlaceholder('ulica i numer domu / mieszkania');
    zipcodeInput = this.page.getByPlaceholder('kod pocztowy, miejscowość');
    transferAmount = this.page.getByTestId('form_amount');
    transferTitle = this.page.getByTestId('form_title');
    formDate = this.page.locator('#form_date');
    linkInput = this.page.getByRole('link', { name: '30' });
    expressTranfser = this.page.getByLabel('ekspresowy');
    expressTransferCheckbox = this.page.locator('#uniform-form_is_email span');
    formEmailCheckbox = this.page.locator('#form_email');
    formEmailInput = this.page.locator('#form_email');
    listReceiverCheckbox = this.page.locator('#uniform-form_add_receiver span');
    listReceiverInput = this.page.locator('#form_receiver_name');
    trustedCheckbox = this.page.getByLabel('jako zaufanego');
    transferButton = this.page.getByRole('button', { name: 'wykonaj przelew' });
    closeButton = this.page.getByTestId('close-button');
    messageText = this.page.locator('#show_messages');
  }
