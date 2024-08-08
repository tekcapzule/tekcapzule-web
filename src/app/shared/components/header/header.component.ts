import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild
} from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { NavigationStart, Router } from '@angular/router';

import {
  AuthService,
  AuthStateService,
  EventChannelService,
  TopicApiService,
} from '@app/core';
import { HelperService } from '@app/core/services/common/helper.service';
import { NavTab, TopicItem } from '@app/shared/models';
import { ChannelEvent, EventChannelOutput } from '@app/shared/models/channel-item.model';
import { Constants } from '@app/shared/utils';
import { Subject, Subscription } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @ViewChild(MatMenuTrigger) globalSearchTrigger: MatMenuTrigger;
  @ViewChild('collapseBtn') collapseBtn: ElementRef;
  @ViewChild('navbarNav') navbarNav: ElementRef;
  isLoggedIn$ = this.authState.isLoggedIn$;
  searchInputValue = '';
  topics: TopicItem[] = [];
  searchedTopics: TopicItem[] = [];
  isMobileResolution: boolean;
  openedMenuItem: NavTab;
  headerMenu: NavTab[] = Constants.HeaderMenu;
  topMenu: NavTab[] = Constants.TopMenu;
  skillStudioMenu: NavTab[] = [];
  selectedTopMenuItem: NavTab;
  selectedExtraMenuItem: NavTab;
  selectedMenuItem: NavTab;
  selectedChildMenuItem: NavTab;
  math = Math;
  isLoginRequiredDialogShown: boolean = false;
  isSkillStudioMenuOpen = false;
  isBlogMenuOpen = false;

  destroy$ = new Subject<boolean>();
  subscription: Subscription[] = [];

  constructor(
    private auth: AuthService,
    private authState: AuthStateService,
    private router: Router,
    private topicApi: TopicApiService,
    private eventChannel: EventChannelService,
    private cdr: ChangeDetectorRef,
    private helperService: HelperService
  ) {
    // this.skillStudioMenu = this.headerMenu.find(menu => menu.uniqueId === 'Skill_Studio').children
    //this.menuClickOutsideEvent();
  }
  // toggleSkillStudioMenu() {
  //   this.isSkillStudioMenuOpen = !this.isSkillStudioMenuOpen;
  // }
  toggleBlogMenu() {
    this.isBlogMenuOpen = !this.isBlogMenuOpen;
  }
  menuClickOutsideEvent() {
    window.addEventListener(
      'click',
      e => {
        if (this.navbarNav.nativeElement.classList.contains('show')) {
          if (
            !e.target['classList'].contains('navbar-toggler') &&
            !e.target['classList'].contains('nav-item') &&
            !e.target['classList'].contains('sub-menu-element')
          ) {
            e.preventDefault();
            e.stopPropagation();
          }
          if (
            !e.target['classList'].contains('parent-menu') &&
            !e.target['classList'].contains('sub-menu') &&
            !e.target['classList'].contains('sub-menu-element')
          ) {
            this.closeMenu();
          }
        }
      },
      true
    );
  }

  ngOnInit(): void {
    this.onResize();
    this.scrollToTop();
    this.subscribeMenuClick()
    this.topicApi.getAllTopics().subscribe(data => {
      this.topics = data;
      this.helperService.setTopicData(data);
    });
  }

  onStopClick(eve) {
    eve.stopPropagation();
  }


  subscribeMenuClick(): void {
    const sub = this.eventChannel.getChannel().pipe(
        filter(out => out.event === ChannelEvent.MenuClick), takeUntil(this.destroy$))
      .subscribe((eventData: EventChannelOutput) => {
        this.onMenuClick(eventData.data)
      });
    this.subscription.push(sub);
  }

  scrollToTop() {
    this.router.events.subscribe(ev => {
      if (ev instanceof NavigationStart) {
        if(!this.selectedTopMenuItem) {
          this.selectedTopMenuItem = this.helperService.findSelectedTopMenu(ev.url);
          console.log('selec ', this.selectedTopMenuItem);
        }
        window.scrollTo(0, 0);
      }
    });
  }

  signInUser(): void {
    this.auth.signInUser();
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
      this.searchedTopics = this.topics.filter(topic =>
        topic.title.toLowerCase().includes(value.toLowerCase())
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

  onTopMenuClick(navTab: NavTab, needToCloseMenu = false) {
    this.selectedTopMenuItem = navTab;
    this.selectedMenuItem = null;
    this.router.navigate([navTab.navUrl]);
    if (this.isMobileResolution && needToCloseMenu) {
      this.closeMenu();
    }
    if(!needToCloseMenu) {
      if (this.openedMenuItem && this.openedMenuItem.uniqueId === navTab.uniqueId) {
        this.openedMenuItem = null;
      } else {
        this.openedMenuItem = navTab;
      }
    }
  }

  onMenuClick(navTab: NavTab): void {
    this.selectedTopMenuItem = navTab;
    this.selectedMenuItem = navTab;
    if (!this.selectedMenuItem.children) {
      this.selectedChildMenuItem = null;
    }
    if (this.openedMenuItem && this.openedMenuItem.uniqueId === navTab.uniqueId) {
      this.openedMenuItem = null;
    } else {
      this.openedMenuItem = navTab;
      if (!this.isMobileResolution) {
        this.navbarNav.nativeElement.classList.add('show');
        if (!this.openedMenuItem.children) {
          this.closeMenu();
        }
      } else {
        this.closeMenu();
      }

      if (navTab.uniqueId === 'HOME' && this.authState.isUserLoggedIn()) {
        this.router.navigate([this.helperService.findPage('My_Feeds').navUrl]);
      } else if(navTab.uniqueId === 'HOME' && !this.authState.isUserLoggedIn()) {
        this.router.navigate([navTab.navUrl]);
      } else if (navTab.uniqueId !== 'Skill_Studio' || this.authState.isUserLoggedIn()) {
        this.router.navigate([navTab.navUrl]);
      }
    }
  }

  onChildMenuClick(topTab: NavTab, menuItem: NavTab): void {
    this.selectedTopMenuItem = topTab;
    this.closeMenu();
    this.openedMenuItem = null;
    //Launching Soon... popup
    /*if(menuItem.enablePostLogin && !this.authState.isUserLoggedIn()) {
      this.showLoginRequiredDialog();
      return;
    }*/
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
    if (!this.isMobileResolution) {
      this.navbarNav.nativeElement.classList.remove('show');
      this.openedMenuItem = null;
    } else {
      let inputElement: HTMLElement = this.collapseBtn.nativeElement as HTMLElement;
      inputElement.click();
      this.cdr.detectChanges();
    }
  }

  openBlog(eve) {
    window.open('https://tekcapzule.blog/', '_blank');
  }


  showLoginRequiredDialog() {
    this.isLoginRequiredDialogShown = true;
  }

  hideLoginRequiredDialog() {
    this.isLoginRequiredDialogShown = false;
  }

  onShowFilter() {
    this.eventChannel.publish({ event: ChannelEvent.ShowHideFilter });
  }

  onShowSort() {
    this.eventChannel.publish({ event: ChannelEvent.ShowHideSort });
  }

}
