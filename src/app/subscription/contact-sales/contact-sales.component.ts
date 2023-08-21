import { Component } from '@angular/core';

@Component({
  selector: 'app-contact-sales',
  templateUrl: './contact-sales.component.html',
  styleUrls: ['./contact-sales.component.scss']
})
export class ContactSalesComponent {
  visible: boolean = true;

  showDialog() {
      this.visible = true;
  }
}
