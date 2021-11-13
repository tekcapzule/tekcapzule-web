import { Component, Input, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';

import { UserApiService } from '@app/core';
import { CapsuleItem, UserInfo } from '@app/shared';

@Component({
  selector: 'app-capsules',
  templateUrl: './capsules.component.html',
  styleUrls: ['./capsules.component.css'],
})
export class CapsulesComponent implements OnInit {
  userInfo: UserInfo;

  @Input() capsules: CapsuleItem[];

  constructor(private userApiService: UserApiService) {}

  ngOnInit(): void {
    this.userApiService
      .getUser()
      .pipe(take(1))
      .subscribe(userInfo => (this.userInfo = userInfo));
  }

  isBookmarked(capsule: CapsuleItem): boolean {
    if (!this.userInfo) {
      return false;
    }
    return !!this.userInfo.bookmarks.find(capsuleId => capsuleId === capsule.capsuleId);
  }
}
