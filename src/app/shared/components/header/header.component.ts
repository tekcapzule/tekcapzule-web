import { ChangeDetectorRef, Component, ElementRef, HostBinding, NgZone, OnInit, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { Router } from '@angular/router';

import { TopicApiService, AuthService, AwsUserInfo, ChannelEvent, EventChannelService } from '@app/core';
import { NavTab, TopicItem } from '@app/shared/models';

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
  headerMenu: NavTab[] = [
    { uniqueId:'HOME', displayName: 'Home', navUrl:'/', showOnMobile: true},
    { uniqueId:'My_Feeds', displayName: 'My Feeds', navUrl:'/capsules',
      children: [
        { uniqueId:'For_You', displayName: 'For You', navUrl:'/capsules/myfeeds'},
        { uniqueId:'Trending', displayName: 'Trending', navUrl:'/capsules/trending'},
        { uniqueId:'Editor_Pick', displayName: 'Editor Pick', navUrl:'/capsules/editorspick'},
        { uniqueId:'BROWSE_BYTOPIC', displayName: 'Browse by Topic', navUrl:''}
      ]  
    },
    { uniqueId:'Skill_Studio', displayName: 'Skill Studio', navUrl: ''},
    { uniqueId:'Contribute', displayName: 'Contribute', navUrl:'capsules/contribute', showOnMobile: true},
    { uniqueId:'Community', displayName: 'Community', navUrl:'/community'},
    { uniqueId:'Our_Mission', displayName: 'Our Mission', navUrl:'/mission'}
  ];
  selectedMenuItem: NavTab = { uniqueId:'HOME', displayName: 'HOME', navUrl:'/', showOnMobile: true};

  constructor(
    private auth: AuthService,
    private zone: NgZone,
    private router: Router,
    private topicApi: TopicApiService,
    private eventChannel: EventChannelService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.auth.onLoggedInStatusChange().subscribe(isLoggedIn => {
      this.zone.run(() => {
        this.isLoggedIn = isLoggedIn;
        this.userDetails = this.auth.getAwsUserInfo();
      });
    });

    this.topicApi.getAllTopics().subscribe(data => {
      this.topics = data;
    });
    this.onResize();
  }

  signOutUser(): void {
    this.auth.signOutUser();
  }
  
  @HostBinding('widnow:resize')
  onResize(event = null) {
    this.isMobileResolution = window.innerWidth < 992 ? true : false; 
    console.log(this.isMobileResolution);
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
