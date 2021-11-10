import { Component, Input, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';

import { CapsuleApiService } from '@app/core';
import { CapsuleItem } from '@app/shared';

@Component({
  selector: 'app-capsule-card',
  templateUrl: './capsule-card.component.html',
  styleUrls: ['./capsule-card.component.scss'],
})
export class CapsuleCardComponent implements OnInit {
  isCardFlipped = false;

  @Input() capsule: CapsuleItem;

  constructor(private capsuleApiService: CapsuleApiService) {}

  ngOnInit(): void {}

  doFlipCard(): void {
    this.isCardFlipped = !this.isCardFlipped;
  }

  doStartReading(): void {
    window.open(this.capsule.resourceUrl, '_blank');
  }

  onCardClick(): void {
    this.capsuleApiService.updateCapsuleViewCount(this.capsule.capsuleId).pipe(take(1)).subscribe();
    window.open(this.capsule.resourceUrl, '_blank');
  }
}
