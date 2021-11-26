import { Component, NgZone, OnInit } from '@angular/core';

import { AuthService } from '@app/core';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  errorMessage = '';

  constructor(private zone: NgZone, private auth: AuthService) {}

  ngOnInit(): void {
    this.auth.onSignInErrorChange().subscribe(message => {
      this.zone.run(() => {
        this.errorMessage = message;
      });
    });
  }
}
