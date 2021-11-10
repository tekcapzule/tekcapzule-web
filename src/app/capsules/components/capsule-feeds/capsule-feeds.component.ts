import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';

import { CapsuleApiService } from '@app/core';
import { AuthService } from '@app/auth';

@Component({
  selector: 'app-capsule-feeds',
  templateUrl: './capsule-feeds.component.html',
  styleUrls: ['./capsule-feeds.component.scss'],
})
export class CapsuleFeedsComponent implements OnInit {
  capsules = [];

  constructor(private capsuleApiService: CapsuleApiService) {}

  ngOnInit(): void {
    this.capsuleApiService
      .getMyFeedCapsules(['cld', 'blk'])
      .pipe(take(1))
      .subscribe(capsules => {
        this.capsules = capsules;
      });
  }
}
