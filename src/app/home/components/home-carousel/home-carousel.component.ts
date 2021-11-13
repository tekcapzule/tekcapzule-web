import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-carousel',
  templateUrl: './home-carousel.component.html',
  styleUrls: ['./home-carousel.component.scss'],
})
export class HomeCarouselComponent implements OnInit {
  @Output() subscribeClicked = new EventEmitter();

  constructor(private router: Router) {}

  ngOnInit(): void {}

  gotoCapsulesPage(): void {
    this.router.navigateByUrl('/capsules');
  }
}
