import { Component } from '@angular/core';

@Component({
  selector: 'app-subscription-page',
  templateUrl: './subscription-page.component.html',
  styleUrls: ['./subscription-page.component.scss'],
})
export class SubscriptionPageComponent {
  isContactSalesDialogShown = false;

  showContactSalesDialog() {
    this.isContactSalesDialogShown = true;
  }

  hideContactSalesDialog() {
    this.isContactSalesDialogShown = false;
  }
}
