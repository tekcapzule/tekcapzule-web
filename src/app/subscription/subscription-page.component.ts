import { Component } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { ContactSalesComponent } from './contact-sales/contact-sales.component';

@Component({
  selector: 'app-subscription-page',
  templateUrl: './subscription-page.component.html',
  styleUrls: ['./subscription-page.component.scss']
})
export class SubscriptionPageComponent {
  
  constructor(public dialogService: DialogService) {}

  showDialog() {
    const ref = this.dialogService.open(ContactSalesComponent, {
      header: 'Header',
      width: '70%'
    });
  }
}
