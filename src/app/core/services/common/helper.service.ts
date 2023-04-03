import { Injectable } from '@angular/core';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root',
})
export class HelperService {
  
  constructor(private router:Router) {
  }

  private routeToSingIn() {
    if(!this.router.url.includes('auth')) {
      this.router.navigate(['auth/signin']);
    }
  }
}
