import { Component, OnInit } from '@angular/core';
import { finalize, take } from 'rxjs/operators';

import { AppSpinnerService, CapsuleApiService } from '@app/core';
import { AuthService } from '@app/auth';

@Component({
  selector: 'app-capsule-feeds',
  templateUrl: './capsule-feeds.component.html',
  styleUrls: ['./capsule-feeds.component.scss'],
})
export class CapsuleFeedsComponent implements OnInit {
  capsules = [];

  constructor(
    private capsuleApiService: CapsuleApiService,
    private authService: AuthService,
    private spinner: AppSpinnerService
  ) {}

  ngOnInit(): void {
    if (this.authService.isUserLoggedIn()) {
      this.capsuleApiService
        .getMyFeedCapsules(['cld', 'blk'])
        .pipe(
          take(1),
          finalize(() => {
            this.spinner.hide();
          })
        )
        .subscribe(capsules => {
          this.capsules = capsules;
        });
    }
  }
}
