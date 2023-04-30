import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class HelperService {
  isMobileResolution: boolean;

  constructor(private router: Router, private messageService: MessageService) {}

  private routeToSingIn() {
    if (!this.router.url.includes('auth')) {
      this.router.navigate(['auth/signin']);
    }
  }

  showSuccess(msg) {
    this.messageService.add({ key: 'tc', severity: 'success', summary: 'Success', detail: msg });
  }

  showError(msg) {
    this.messageService.add({ key: 'tc', severity: 'error', summary: 'Error', detail: msg });
  }

  setMobileResolution(isMobileResolution) {
    this.isMobileResolution = isMobileResolution;
  }

  getMobileResolution() {
    return this.isMobileResolution;
  }
}
