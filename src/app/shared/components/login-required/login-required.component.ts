import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AuthService } from '@app/core';

@Component({
  selector: 'app-login-required',
  templateUrl: './login-required.component.html',
  styleUrls: ['./login-required.component.scss'],
})
export class LoginRequiredComponent {
  @Input() isDialogVisible = false;
  @Output() dialogClosed = new EventEmitter();

  constructor(private auth: AuthService) {
  }

  onDialogClosed() {
    this.dialogClosed.emit();
  }

  onLoginClick() {
    this.auth.signInUser();
  }
}
