import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { Router } from '@angular/router';

import { AuthService } from '@app/auth/services/auth.service';
import { TopicApiService } from '@app/core';
import { TopicItem } from '@app/shared/models';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @ViewChild(MatMenuTrigger) globalSearchTrigger: MatMenuTrigger;

  isLoggedIn = false;
  userDetails = null;
  searchInputValue = '';
  topics: TopicItem[] = [];
  searchedTopics: TopicItem[] = [];

  constructor(
    private auth: AuthService,
    private zone: NgZone,
    private router: Router,
    private topicApiService: TopicApiService
  ) {}

  ngOnInit(): void {
    this.auth.onLoggedInStatusChange().subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
      this.userDetails = this.auth.getUserInfo();
      this.zone.run(() => {
        this.isLoggedIn = isLoggedIn;
        this.router.navigateByUrl('/home');
      });
    });

    this.topicApiService.getAllTopics().subscribe(data => {
      this.topics = data;
    });
  }

  signOutUser(): void {
    this.auth.signOutUser();
  }

  searchInputChanged(value: string): void {
    if (value.length > 0) {
      this.searchedTopics = this.topics.filter(
        topic =>
          topic.name.toLowerCase().includes(value.toLowerCase()) ||
          topic.aliases.map(a => a.toLowerCase()).includes(value.toLowerCase())
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
    });
  }
}
