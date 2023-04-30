import { ChangeDetectorRef, Component, ElementRef, HostBinding, NgZone, OnInit, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { NavigationStart, Router } from '@angular/router';

import { TopicApiService, AuthService, AwsUserInfo, ChannelEvent, EventChannelService } from '@app/core';
import { HelperService } from '@app/core/services/common/helper.service';
import { NavTab, TopicItem } from '@app/shared/models';
import { Constants } from '@app/shared/utils';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @ViewChild(MatMenuTrigger) globalSearchTrigger: MatMenuTrigger;
  @ViewChild('collapseBtn') collapseBtn: ElementRef;
  isLoggedIn = false;
  userDetails: AwsUserInfo = null;
  searchInputValue = '';
  topics: TopicItem[] = [];
  searchedTopics: TopicItem[] = [];
  isMobileResolution: boolean;
  openedMenuItem: NavTab;
  headerMenu: NavTab[] = Constants.HeaderMenu;
  selectedMenuItem: NavTab;
  selectedChildMenuItem: NavTab;

  constructor(
    private auth: AuthService,
    private zone: NgZone,
    private router: Router,
    private topicApi: TopicApiService,
    private eventChannel: EventChannelService,
    private cdr: ChangeDetectorRef,
    private helperService: HelperService
  ) {}

  ngOnInit(): void {
    this.onResize();
    this.scrollToTop();
    this.auth.onLoggedInStatusChange().subscribe(isLoggedIn => {
      this.zone.run(() => {
        this.isLoggedIn = isLoggedIn;
        this.userDetails = this.auth.getAwsUserInfo();
      });
    });

    this.topicApi.getAllTopics().subscribe(data => {
      this.topics = data;
    });
  }

  scrollToTop() {
    this.router.events.subscribe(ev => {
      if (ev instanceof NavigationStart) {
        window.scrollTo(0, 0);
        if(!this.selectedMenuItem) {
          this.getSelectedMenu(ev);
        }
      }
    });
  }
  
  getSelectedMenu(ev: any) {
    this.headerMenu.forEach(hm => {
      if(hm.navUrl && ev.url.includes(hm.navUrl)) {
        this.selectedMenuItem = hm;
        if(this.selectedMenuItem.children) {
          hm.children.forEach(cm => {
            if(cm.navUrl && ev.url.includes(cm.navUrl)) {
              this.selectedChildMenuItem = cm;
            }
          });
        }
      }
    });
  }

  signOutUser(): void {
    this.auth.signOutUser();
  }
  
  @HostBinding('widnow:resize')
  onResize(event = null) {
    console.log('helperService ', this.isMobileResolution);
    this.isMobileResolution = window.innerWidth < 992 ? true : false; 
    this.helperService.setMobileResolution(this.isMobileResolution);
  }

  searchInputChanged(value: string): void {
    if (value.length > 0) {
      this.searchedTopics = this.topics.filter(
        topic => topic.title.toLowerCase().includes(value.toLowerCase())
        // || topic.aliases.map(a => a.toLowerCase()).includes(value.toLowerCase())
      );

      if (this.searchedTopics.length > 0) {
        this.globalSearchTrigger.openMenu();
      } else {
        this.globalSearchTrigger.closeMenu();
      }
    } else {
      this.searchedTopics = [];
      this.globalSearchTrigger.closeMenu();
    }
  }

  gotoTopicDetailsPage(topic: TopicItem): void {
    this.searchInputValue = '';
    this.router.navigate(['topics', 'topicdetails'], {
      state: { topic },
      queryParams: { code: topic.code },
    });
  }

  onMenuClick(navTab: NavTab): void {
    this.selectedMenuItem = navTab;
    if(!this.isMobileResolution) {
      this.router.navigate([navTab.navUrl]);
      return;
    }
    if(!this.selectedMenuItem.children) {
      this.selectedChildMenuItem = null;
    }
    if(this.openedMenuItem && this.openedMenuItem.uniqueId === navTab.uniqueId) {
      this.openedMenuItem = null;
    } else {
      this.openedMenuItem = navTab;
      if(!this.openedMenuItem.children) {
        this.closeMenu();
      }
      this.router.navigate([this.openedMenuItem.navUrl]);
    }
  }
  
  onChildMenuClick(menuItem: NavTab): void {
    if(!this.isMobileResolution) {
      this.router.navigate([menuItem.navUrl]);
      return;
    }
    this.closeMenu();
    if(menuItem.navUrl) {
      this.selectedChildMenuItem = menuItem;
      this.router.navigate([menuItem.navUrl]);
    } else {
      this.eventChannel.publish({ event: ChannelEvent.ShowBrowseByTopic });
    }
  }
  
  onSkillStudioClick() {
    this.selectedMenuItem = this.headerMenu[0];
    this.router.navigate(['/']);
    if(this.isMobileResolution) {
      this.closeMenu();
    }
  }
  
  closeMenu() {
    let inputElement: HTMLElement = this.collapseBtn.nativeElement as HTMLElement;
    inputElement.click();
    this.cdr.detectChanges();
  }
}
