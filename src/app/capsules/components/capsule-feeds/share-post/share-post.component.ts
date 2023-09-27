import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-share-post',
  templateUrl: './share-post.component.html',
  styleUrls: ['./share-post.component.scss'],
})
export class SharePostComponent {
  @Input() isDialogVisible = false;
  @Output() dialogClosed = new EventEmitter();

  onDialogClosed() {
    this.dialogClosed.emit();
  }
}
