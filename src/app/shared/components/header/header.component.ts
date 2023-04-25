import { Component, HostBinding, NgZone, OnInit, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { Router } from '@angular/router';

import { TopicApiService, AuthService, AwsUserInfo } from '@app/core';
import { TopicItem } from '@app/shared/models';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @ViewChild(MatMenuTrigger) globalSearchTrigger: MatMenuTrigger;

  isLoggedIn = false;
  userDetails: AwsUserInfo = null;
  searchInputValue = '';
  topics: TopicItem[] = [];
  searchedTopics: TopicItem[] = [];
  isMobileResolution: boolean;

  constructor(
    private auth: AuthService,
    private zone: NgZone,
    private router: Router,
    private topicApi: TopicApiService
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
}
