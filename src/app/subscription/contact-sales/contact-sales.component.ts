import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-contact-sales',
  templateUrl: './contact-sales.component.html',
  styleUrls: ['./contact-sales.component.scss']
})
export class ContactSalesComponent {
  @Input() isDialogVisible = false;
  @Output() dialogClosed = new EventEmitter();

  
  onDialogClosed() {
    this.dialogClosed.emit();
  }
}
