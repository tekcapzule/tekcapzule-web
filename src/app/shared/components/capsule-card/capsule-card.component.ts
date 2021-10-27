import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-capsule-card',
  templateUrl: './capsule-card.component.html',
  styleUrls: ['./capsule-card.component.scss'],
})
export class CapsuleCardComponent implements OnInit {
  isCardFlipped = false;

  constructor() {}

  ngOnInit(): void {}

  doFlipCard(): void {
    this.isCardFlipped = !this.isCardFlipped;
  }
}
