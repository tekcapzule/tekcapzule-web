import { Component, OnInit } from '@angular/core';
import { AppSpinnerService, CapsuleApiService } from '@app/core';
import { CapsuleItem } from '@app/shared';
import { finalize, take } from 'rxjs/operators';

@Component({
  selector: 'app-capsule-trending',
  templateUrl: './capsule-trending.component.html',
  styleUrls: ['./capsule-trending.component.scss'],
})
export class CapsuleTrendingComponent implements OnInit {
  capsules: CapsuleItem[] = [];

  constructor(private capsuleApiService: CapsuleApiService, private spinner: AppSpinnerService) {}

  ngOnInit(): void {
    this.spinner.show();

    this.capsuleApiService
      .getTrendingCapsules()
      .pipe(
        finalize(() => {
          this.spinner.hide();
        })
      )
      .subscribe(capsules => {
        this.capsules = capsules;
      });
  }
}
