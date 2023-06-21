import { Component, OnInit } from '@angular/core';

import { AppSpinnerService } from '@app/core';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  constructor(private spinner: AppSpinnerService) {}

  ngOnInit(): void {
  }
}
