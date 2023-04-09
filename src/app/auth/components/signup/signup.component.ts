import { Component, NgZone, OnInit } from '@angular/core';

import { AuthService } from '@app/core';
import { Auth } from 'aws-amplify';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  errorMessage = '';

  constructor(private zone: NgZone, private auth: AuthService) {}

  ngOnInit(): void {
  
  }

  public formFields = {
    signUp: {
      email: {
        order:1
      },
      phone_number: {
        order: 4
      },
      password: {
        order: 5
      },
      confirm_password: {
        order: 6
      }
    },
  }

}
