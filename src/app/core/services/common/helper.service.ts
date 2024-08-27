import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ErrorModel } from '@app/shared/models';
import { NavTab, SelectedMenu } from '@app/shared/models/nav-tab.model';
import { Constants } from '@app/shared/utils';
import { MessageService } from 'primeng/api';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class HelperService {
  isMobileResolution = false;
  filterByCapsuleType = '';
  selectedMenu: SelectedMenu;
  private resizeChange$ = new BehaviorSubject<boolean>(this.isMobileResolution);

  constructor(private router: Router, private messageService: MessageService) {
  }

  private routeToSingIn() {
    if (!this.router.url.includes('auth')) {
      this.router.navigate(['auth/signin']);
    }
  }

  showSuccess(msg): void {
    this.messageService.add({key: 'tc', severity: 'success', detail: msg});
  }

  getInternalErrorMessage(): ErrorModel {
    return {
      key: 'tc',
      severity: 'error',
      // summary: 'Error',
      detail: 'Something went wrong! Try again later.',
    };
  }

  public onResizeChange$(): Observable<boolean> {
    return this.resizeChange$.asObservable();
  }

  setMobileResolution(isMobileResolution): void {
    this.isMobileResolution = isMobileResolution;
    this.resizeChange$.next(this.isMobileResolution);
  }

  getMobileResolution(): boolean {
    return this.isMobileResolution;
  }

  getSelectedMenu(): SelectedMenu {
    return this.selectedMenu;
  }

  setSelectedMenu(selectedMenu): void {
    this.selectedMenu = selectedMenu;
  }

  findSelectedTopMenu(navUrl: string) {
    if (navUrl === '/') {
      return null;
    }
    let selectedTopMenu;
    Constants.TopMenu.forEach(tm => {
      if (tm.navUrl && tm.navUrl.includes(navUrl)) {
        selectedTopMenu = tm;
      }
    });
    return selectedTopMenu;
  }

  findSelectedMenu(navUrl: string) {
    const headerMenu = Constants.HeaderMenu;
    this.selectedMenu = {selectedMenuItem: headerMenu[0], selectedChildMenuItem: null};
    if (navUrl === '/') {
      return this.selectedMenu;
    }
    let isMenuItemFound = false;
    headerMenu.forEach(hm => {
      if (hm.navUrl && hm.navUrl.includes(navUrl)) {
        isMenuItemFound = true;
        this.selectedMenu = {selectedMenuItem: hm, selectedChildMenuItem: null};
      }
    });
    return this.selectedMenu;
  }

  findPage(pageId: string) {
    const headerMenu = Constants.HeaderMenu;
    return headerMenu.find(hm => hm.uniqueId === pageId);
  }

  getIncludesStr(value: string, searchText: string): boolean {
    if (value) {
      value = value.toLowerCase();
      return value.includes(searchText.toLowerCase());
    }
    return false;
  }
}
