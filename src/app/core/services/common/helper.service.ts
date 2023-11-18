import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ErrorModel, TopicItem } from '@app/shared/models';
import { NavTab, SelectedMenu } from '@app/shared/models/nav-tab.model';
import { Constants } from '@app/shared/utils';
import { ITile } from '@app/skill-studio/models/tile.model';
import { MessageService } from 'primeng/api';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HelperService {
  isMobileResolution = false;
  filterByCapsuleType = '';
  selectedMenu: SelectedMenu;
  topicData: TopicItem[] = [];
  localPublisher: string[] = ['TEKCAPSULE', 'AITODAY', 'YOUTUBE'];
  private resizeChange$ = new BehaviorSubject<boolean>(this.isMobileResolution);
  private filterByCapsuleType$ = new BehaviorSubject<string>(this.filterByCapsuleType);

  constructor(private router: Router, private messageService: MessageService) {}

  private routeToSingIn() {
    if (!this.router.url.includes('auth')) {
      this.router.navigate(['auth/signin']);
    }
  }

  showSuccess(msg): void {
    this.messageService.add({ key: 'tc', severity: 'success', detail: msg });
  }

  getInternalErrorMessage(): ErrorModel {
    return {
      key: 'tc',
      severity: 'error',
      // summary: 'Error',
      detail: 'Oops! Something went wrong!',
    };
  }

  public onResizeChange$(): Observable<boolean> {
    return this.resizeChange$.asObservable();
  }

  public onFilterByCapsuleType$(): Observable<string> {
    return this.filterByCapsuleType$.asObservable();
  }

  setFilterByCapsuleType(selectedCapsuleType: string): void {
    this.filterByCapsuleType = selectedCapsuleType;
    this.filterByCapsuleType$.next(this.filterByCapsuleType);
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

  setTopicData(topicData: TopicItem[]): void {
    this.topicData = topicData;
  }

  getTopicData(): TopicItem[] {
    return this.topicData;
  }

  getTopic(topicCode: string): TopicItem {
    return this.topicData.find(topic => topic.code === topicCode);
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
    this.selectedMenu = { selectedMenuItem: headerMenu[0], selectedChildMenuItem: null };
    if (navUrl === '/') {
      return this.selectedMenu;
    }
    let isMenuItemFound = false;
    headerMenu.forEach(hm => {
      if (hm.navUrl && hm.navUrl.includes(navUrl)) {
        isMenuItemFound = true;
        this.selectedMenu = { selectedMenuItem: hm, selectedChildMenuItem: null };
        if (hm.children) {
          hm.children.forEach(cm => {
            if (cm.navUrl && navUrl.includes(cm.navUrl)) {
              this.selectedMenu.selectedChildMenuItem = cm;
            }
          });
        }
      }
    });

    if (!isMenuItemFound) {
      const tilesMenu = Constants.SkillTiles;
      tilesMenu.forEach(hm => {
        if (hm.navUrl && hm.navUrl.includes(navUrl)) {
          isMenuItemFound = true;
          this.selectedMenu = {
            selectedMenuItem: this.findPage('Skill_Studio'),
            selectedChildMenuItem: hm,
          };
        }
      });
    }
    return this.selectedMenu;
  }

  
  findExtraMenuPage(pageId: string): NavTab {
    return Constants.ExtraLink.find(el => el.uniqueId === pageId);
  }

  findPage(pageId: string) {
    const headerMenu = Constants.HeaderMenu;
    return headerMenu.find(hm => hm.uniqueId === pageId);
  }

  findAIHubPage(pageId: string) {
    const tiles = Constants.SkillTiles;
    return tiles.find(hm => hm.uniqueId === pageId);
  }

  getTileDetails(uniqueId): ITile {
    return Constants.SkillTiles.find(tile => tile.uniqueId === uniqueId);
  }

  isLocalPublisher(publisher: string) {
    return this.localPublisher.find(pub => pub.toLowerCase() === publisher.toLowerCase());
  }

  getIncludesStr(value: string, searchText: string): boolean {
    if (value) {
      value = value.toLowerCase();
      return value.includes(searchText.toLowerCase());
    }
    return false;
  }

  getTopicName(topicCode: string) {
    const topic = this.topicData.find(topic => topic.code === topicCode);
    return topic ? topic.title : '';
  }
}
