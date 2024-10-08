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
} from '@app/core';
import { HelperService } from '@app/core/services/common/helper.service';
import { NavTab } from '@app/shared/models';
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
  isMenuClicked = false;
  destroy$ = new Subject<boolean>();
  subscription: Subscription[] = [];

  constructor(
    private auth: AuthService,
    private authState: AuthStateService,
    private router: Router,
    private eventChannel: EventChannelService,
    private cdr: ChangeDetectorRef,
    private helperService: HelperService
  ) {
    this.menuClickOutsideEvent();
  }

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
        if (!this.selectedTopMenuItem) {
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

  }


  onTopMenuClick(navTab: NavTab, needToCloseMenu = true) {
    this.selectedTopMenuItem = navTab;
    this.selectedMenuItem = null;
    this.router.navigateByUrl(navTab.navUrl);
    if (this.isMobileResolution && needToCloseMenu) {
      this.closeMenu();
    }
    if (!needToCloseMenu) {
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
    this.isMenuClicked = true;
    if (!this.selectedMenuItem.children) {
      this.selectedChildMenuItem = null;
    }
    this.openedMenuItem = null;
    this.router.navigate([navTab.navUrl]);
  }

  onMobileMenuClick(navTab: NavTab): void {
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
      this.router.navigate([navTab.navUrl]);
    }
  }

  onMenuOver(navTab: NavTab): void {
    if (navTab.children && !this.isMenuClicked) {
      this.openedMenuItem = navTab;
    }
  }

  onMenuOut() {
    this.openedMenuItem = null;
    this.isMenuClicked = false;
  }


  onChildMenuClick(topTab: NavTab, menuItem: NavTab): void {
    this.selectedTopMenuItem = topTab;
    this.closeMenu();
    this.openedMenuItem = null;

    if (menuItem.navUrl) {
      this.selectedChildMenuItem = menuItem;

      menuItem.navUrl.startsWith('https')
        ? this.openBlog(menuItem.navUrl)
        : this.router.navigate([menuItem.navUrl]);

    } else {
      this.eventChannel.publish({ event: ChannelEvent.ShowBrowseByTopic });
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

  openBlog(blog) {
    window.open(blog, '_blank');
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
