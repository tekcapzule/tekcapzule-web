import { Component, Input, OnInit } from '@angular/core';

import { CapsuleItem } from '@app/shared';

@Component({
  selector: 'app-capsule-card',
  templateUrl: './capsule-card.component.html',
  styleUrls: ['./capsule-card.component.scss'],
})
export class CapsuleCardComponent implements OnInit {
  isCardFlipped = false;

  @Input() capsule: CapsuleItem;

  constructor() {}

  ngOnInit(): void {}

  doFlipCard(): void {
    this.isCardFlipped = !this.isCardFlipped;
  }

  doStartReading(): void {
    window.open(this.capsule.resourceUrl, '_blank');
  }
}
