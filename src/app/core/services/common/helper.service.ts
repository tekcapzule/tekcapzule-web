import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ErrorModel } from '@app/shared/models';
import { SelectedMenu } from '@app/shared/models/nav-tab.model';
import { Constants } from '@app/shared/utils';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class HelperService {
  isMobileResolution: boolean;
  selectedMenu: SelectedMenu;

  constructor(private router: Router, private messageService: MessageService) {}

  private routeToSingIn() {
    if (!this.router.url.includes('auth')) {
      this.router.navigate(['auth/signin']);
    }
  }

  showSuccess(msg): void {
    this.messageService.add({ key: 'tc', severity: 'success', summary: 'Success', detail: msg });
  }

  getInternalErrorMessage(): ErrorModel {
    return { key: 'tc', severity: 'error', summary: 'Error', detail: 'Something went wrong! Please try again later.' };
  }

  setMobileResolution(isMobileResolution): void {
    this.isMobileResolution = isMobileResolution;
  }

  getMobileResolution(): boolean {
    return this.isMobileResolution;
  }

  getSelectedMenu(): SelectedMenu {
    return this.selectedMenu;
  }
  findSelectedMenu(navUrl: string) {
    const headerMenu = Constants.HeaderMenu;
    this.selectedMenu = {selectedMenuItem: headerMenu[0], selectedChildMenuItem: null};
    headerMenu.forEach(hm => {
      if(hm.navUrl && navUrl.includes(hm.navUrl)) {
        this.selectedMenu = {selectedMenuItem: hm, selectedChildMenuItem: null};
        if(hm.children) {
          hm.children.forEach(cm => {
            if(cm.navUrl && navUrl.includes(cm.navUrl)) {
              this.selectedMenu.selectedChildMenuItem = cm;
            }
          });
        }
      }
    });
    return this.selectedMenu;
  }
}
