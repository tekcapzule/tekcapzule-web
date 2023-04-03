import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '@app/core';
import { Auth } from 'aws-amplify';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  errorMessage = '';
  
  constructor(private zone: NgZone, private auth: AuthService) {}

  ngOnInit(): void {
    Auth.currentAuthenticatedUser().then(data=> {
      Auth.signOut();
    }).catch(() => {

    });
    this.auth.onSignInErrorChange().subscribe(message => {
      this.zone.run(() => {
        this.errorMessage = message;
      });
    });
  }

}
