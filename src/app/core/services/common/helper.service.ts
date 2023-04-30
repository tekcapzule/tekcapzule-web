import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NavTab } from '@app/shared/models';
import { SelectedMenu } from '@app/shared/models/nav-tab.model';
import { Constants } from '@app/shared/utils';
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

  showSuccess(msg): void {
    this.messageService.add({ key: 'tc', severity: 'success', summary: 'Success', detail: msg });
  }

  showError(msg): void {
    this.messageService.add({ key: 'tc', severity: 'error', summary: 'Error', detail: msg });
  }

  setMobileResolution(isMobileResolution): void {
    this.isMobileResolution = isMobileResolution;
  }

  getMobileResolution(): boolean {
    return this.isMobileResolution;
  }

  
  getSelectedMenu(navUrl: string) {
    let selectedMenu: SelectedMenu;
    Constants.HeaderMenu.forEach(hm => {
      if(hm.navUrl && navUrl.includes(hm.navUrl)) {
        selectedMenu = {selectedMenuItem: hm, selectedChildMenuItem: null};
        if(hm.children) {
          hm.children.forEach(cm => {
            if(cm.navUrl && navUrl.includes(cm.navUrl)) {
              selectedMenu.selectedChildMenuItem = cm;
            }
          });
        }
      }
    });
    return selectedMenu;
  }
}
