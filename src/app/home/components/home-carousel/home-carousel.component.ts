import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { HelperService } from '@app/core/services/common/helper.service';

@Component({
  selector: 'app-home-carousel',
  templateUrl: './home-carousel.component.html',
  styleUrls: ['./home-carousel.component.scss'],
})
export class HomeCarouselComponent implements OnInit {
  @Output() subscribeClicked = new EventEmitter();

  constructor(private router: Router, private helperService: HelperService) {}

  ngOnInit(): void {}

  gotoCapsulesPage(): void {
    this.helperService.setSelectedMenu(null);
    this.router.navigateByUrl('/capsules/myfeeds');
  }
}
