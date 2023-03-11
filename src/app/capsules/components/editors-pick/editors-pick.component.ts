import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';

import { AppSpinnerService, CapsuleApiService } from '@app/core';

@Component({
  selector: 'app-editors-pick',
  templateUrl: './editors-pick.component.html',
  styleUrls: ['./editors-pick.component.scss'],
})
export class EditorsPickComponent implements OnInit {
  capsules = [];

  constructor(private capsuleApi: CapsuleApiService, private spinner: AppSpinnerService) {}

  ngOnInit(): void {
    this.spinner.show();

    this.capsuleApi
      .getEditorsPickCapsules()
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
