import { Component, OnInit, NgZone } from '@angular/core';
import { LoginService } from '@app/shared/services/login.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  isLoggedIn = false;
  userDetails = null;
  constructor(public loginService: LoginService, public zone: NgZone) {
    loginService.loggedInStatusChange.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
      if (isLoggedIn) {
        this.userDetails = loginService.userDetails;
      }else{
        this.userDetails = null;
      }
      this.zone.run(() => this.isLoggedIn = isLoggedIn)

    })
  }

  ngOnInit(): void { }
}
