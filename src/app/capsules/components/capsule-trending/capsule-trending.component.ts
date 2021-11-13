import { Component, OnInit } from '@angular/core';
import { CapsuleApiService } from '@app/core';
import { CapsuleItem } from '@app/shared';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-capsule-trending',
  templateUrl: './capsule-trending.component.html',
  styleUrls: ['./capsule-trending.component.scss'],
})
export class CapsuleTrendingComponent implements OnInit {
  capsules: CapsuleItem[] = [];

  constructor(private capsuleApiService: CapsuleApiService) {}

  ngOnInit(): void {
    this.capsuleApiService
      .getTrendingCapsules()
      .pipe(take(1))
      .subscribe(capsules => {
        this.capsules = capsules;
      });
  }
}
