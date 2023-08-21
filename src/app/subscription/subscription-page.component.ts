import { Component } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { ContactSalesComponent } from './contact-sales/contact-sales.component';

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
