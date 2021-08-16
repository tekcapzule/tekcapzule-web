import { Component, NgZone, OnInit } from '@angular/core';

import { AuthService } from '@app/auth';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isLoggedIn = false;
  userDetails = null;

  constructor(private authService: AuthService, private zone: NgZone) {}

  ngOnInit(): void {
    this.authService.onLoggedInStatusChange().subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
      this.userDetails = this.authService.getUserInfo();
      this.zone.run(() => (this.isLoggedIn = isLoggedIn));
    });
  }

  signOutUser(): void {
    this.authService.signOutUser();
  }
}
