import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  NgZone,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';

import {
  AuthService,
  AwsUserInfo,
  ChannelEvent,
  EventChannelService,
  TopicApiService,
} from '@app/core';
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
  @ViewChild('navbarNav') navbarNav: ElementRef;
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
  math = Math;

  constructor(
    private renderer: Renderer2,
    private auth: AuthService,
    private zone: NgZone,
    private router: Router,
    private topicApi: TopicApiService,
    private eventChannel: EventChannelService,
    private cdr: ChangeDetectorRef,
    private helperService: HelperService
  ) {
    this.menuClickOutsideEvent();
  }

  menuClickOutsideEvent() {
    window.addEventListener('click', (e) => {
      if (this.navbarNav.nativeElement.classList.contains('show')) {
        if(!e.target['classList'].contains('navbar-toggler') && !e.target['classList'].contains('nav-item') && !e.target['classList'].contains('sub-menu-element')) {
          e.preventDefault();
          e.stopPropagation();
        }
        if(!e.target['classList'].contains('parent-menu') && !e.target['classList'].contains('sub-menu') && !e.target['classList'].contains('sub-menu-element')) {
          this.closeMenu();
        }
      }
    }, true);
  }

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
      this.helperService.setTopicData(data);
    });
  }

  onStopClick(eve) {
    eve.stopPropagation();
  }

  scrollToTop() {
    this.router.events.subscribe(ev => {
      if (ev instanceof NavigationStart) {
        window.scrollTo(0, 0);
        if (!this.selectedMenuItem || !this.helperService.getSelectedMenu()) {
          const selectedMenu = this.helperService.findSelectedMenu(ev.url);
          this.selectedMenuItem = selectedMenu.selectedMenuItem;
          this.selectedChildMenuItem = selectedMenu.selectedChildMenuItem;
        }
      }
    });
  }

  signOutUser(): void {
    this.auth.signOutUser();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event = null) {
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
    if (!this.isMobileResolution && navTab.viewType !== 'ALL') {
      this.router.navigate([navTab.navUrl]);
      return;
    }
    if (!this.selectedMenuItem.children) {
      this.selectedChildMenuItem = null;
    }
    if (this.openedMenuItem && this.openedMenuItem.uniqueId === navTab.uniqueId) {
      this.openedMenuItem = null;
    } else {
      this.openedMenuItem = navTab;
      this.navbarNav.nativeElement.classList.add('show');

      if (!this.openedMenuItem.children) {
        this.closeMenu();
      }
      if(navTab.uniqueId !== "Skill_Studio") {
        this.router.navigate([this.openedMenuItem.navUrl]);
      }
    }
  }

  onChildMenuClick(menuItem: NavTab): void {
    this.closeMenu();
    if (menuItem.navUrl) {
      this.selectedChildMenuItem = menuItem;
      this.router.navigate([menuItem.navUrl]);
    } else {
      this.eventChannel.publish({ event: ChannelEvent.ShowBrowseByTopic });
    }
  }

  onSkillStudioClick() {
    this.selectedMenuItem = this.headerMenu[0];
    this.router.navigate(['topics', 'topicdetails']);
    if (this.isMobileResolution) {
      this.closeMenu();
    }
  }

  closeMenu() {
    if(!this.isMobileResolution) {
      this.navbarNav.nativeElement.classList.remove('show');
      this.openedMenuItem = null;
    } else {
      let inputElement: HTMLElement = this.collapseBtn.nativeElement as HTMLElement;
      inputElement.click();
      this.cdr.detectChanges();
    }
  }

  openBlog(eve) {
    window.open('https://tekcapsule.blog/', '_blank');
  }

  onSingIn() {
    this.router.navigateByUrl('/auth/signin');
  }
  onSingOut() {
    this.auth.signOutUser();
  }
}
