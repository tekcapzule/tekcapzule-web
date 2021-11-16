import { Component, OnInit } from '@angular/core';
import { finalize, take } from 'rxjs/operators';

import { AppSpinnerService, CapsuleApiService, UserApiService } from '@app/core';
import { AuthService } from '@app/auth';
import { UserInfo } from '@app/shared';

@Component({
  selector: 'app-capsule-feeds',
  templateUrl: './capsule-feeds.component.html',
  styleUrls: ['./capsule-feeds.component.scss'],
})
export class CapsuleFeedsComponent implements OnInit {
  capsules = [];

  constructor(
    private authService: AuthService,
    private capsuleApiService: CapsuleApiService,
    private userApiService: UserApiService,
    private spinner: AppSpinnerService
  ) {}

  ngOnInit(): void {
    if (this.authService.isUserLoggedIn()) {
      this.spinner.show();

      this.userApiService
        .getUser(this.authService.getUserInfo().attributes.email)
        .subscribe((userInfo: UserInfo) => {
          this.capsuleApiService
            .getMyFeedCapsules(userInfo.subscribedTopics || [])
            .pipe(
              finalize(() => {
                this.spinner.hide();
              })
            )
            .subscribe(capsules => {
              this.capsules = capsules;
            });
        });
    }
  }
}
