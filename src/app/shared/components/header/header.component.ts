import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '@app/auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isLoggedIn = false;
  userDetails = null;

  constructor(private auth: AuthService, private zone: NgZone, private router: Router) {}

  ngOnInit(): void {
    this.auth.onLoggedInStatusChange().subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
      this.userDetails = this.auth.getUserInfo();
      this.zone.run(() => {
        this.isLoggedIn = isLoggedIn;
        this.router.navigateByUrl('/home');
      });
    });
  }

  signOutUser(): void {
    this.auth.signOutUser();
  }
}
