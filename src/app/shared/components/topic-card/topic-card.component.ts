import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '@app/auth';
import { UserApiService } from '@app/core';
import { TopicItem, UserInfo } from '@app/shared/models';

@Component({
  selector: 'app-topic-card',
  templateUrl: './topic-card.component.html',
  styleUrls: ['./topic-card.component.scss'],
})
export class TopicCardComponent implements OnInit {
  @Input() topic!: TopicItem;

  userInfo: UserInfo = null;

  constructor(private router: Router, private auth: AuthService, private userApi: UserApiService) {}

  ngOnInit(): void {}

  gotoTopicDetails(): void {
    this.router.navigate(['topics', 'topicdetails'], {
      state: {
        topic: this.topic,
      },
    });
  }

  isFollowingTopic(): boolean {
    return false;
  }

  followTopic(): void {
    if (!this.auth.isUserLoggedIn()) {
      this.router.navigateByUrl('/auth/signin');
      return;
    }
  }
}
