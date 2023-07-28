import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { IProduct } from '@app/shared/models/market.model';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent {
  @Input() product: IProduct;

  constructor(private router: Router) {}

  openProductDetails() {
    this.router.navigateByUrl('/ai-hub/product-detail/' + this.product.code);
  }
}
