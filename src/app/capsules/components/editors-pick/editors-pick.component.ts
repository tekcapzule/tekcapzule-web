import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';

import { CapsuleApiService } from '@app/core';

@Component({
  selector: 'app-editors-pick',
  templateUrl: './editors-pick.component.html',
  styleUrls: ['./editors-pick.component.scss'],
})
export class EditorsPickComponent implements OnInit {
  capsules = [];

  constructor(private capsuleApiService: CapsuleApiService) {}

  ngOnInit(): void {
    this.capsuleApiService
      .getEditorsPickCapsules()
      .pipe(take(1))
      .subscribe(capsules => {
        this.capsules = capsules;
      });
  }
}
