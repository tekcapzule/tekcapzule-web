import { Component, OnInit } from '@angular/core';
import { LoginService } from '@app/shared/services/login.service';
@Component({
  selector: 'app-login-component',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public loginService : LoginService) { 
  }

  ngOnInit(): void {
  }

}
