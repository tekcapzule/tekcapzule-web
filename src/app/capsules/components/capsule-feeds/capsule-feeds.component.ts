import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-capsule-feeds',
  templateUrl: './capsule-feeds.component.html',
  styleUrls: ['./capsule-feeds.component.scss'],
})
export class CapsuleFeedsComponent implements OnInit {
  className = "card";

  constructor() {}

  ngOnInit(): void {}

  getCardCSSClassName(){
    return this.className;
  }

  flipcard() {
    if(this.className != "card"){
      this.className = "card"
    }else {
      this.className = "card is-flipped"
    }
  }
}
