import { Component, Input, OnInit } from '@angular/core';
import { CapsuleApiService } from '@app/core/services/capsule-api/capsule-api.service';

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

  onCardClick():void {
    console.log("capsule clicked .. redirecting to  : ",this.capsule.resourceUrl);
    this.capsuleApiService.registerCapsuleClick(this.capsule.capsuleId);
    window.open(this.capsule.resourceUrl, "_blank");
  }
}
