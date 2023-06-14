import { Component, OnInit } from '@angular/core';

import { AppSpinnerService } from '@app/core';

@Component({
  selector: 'app-market-place',
  templateUrl: './market-place.component.html',
  styleUrls: ['./market-place.component.scss'],
})
export class MarketPlaceComponent implements OnInit {
  constructor(private spinner: AppSpinnerService) {}

  ngOnInit(): void {
  }
}
