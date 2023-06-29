import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AppSpinnerService, MarketPlaceApiService } from '@app/core';
import { IProduct } from '@app/shared/models/market.model';

@Component({
  selector: 'app-market-place',
  templateUrl: './market-place.component.html',
  styleUrls: ['./market-place.component.scss'],
})
export class MarketPlaceComponent implements OnInit {
  products: IProduct[] = [];
  filteredProducts: IProduct[] = [];
  selectedPayments: any[] = [];
  selectedOS: any[] = [];
  paymentCategories: any[] = [
    { name: 'Free', key: 'FREE' },
    { name: 'Premium', key: 'PREMIUM' },
    { name: 'Paid', key: 'PAID' }
  ];

  osCategories: any[] = [
    { name: 'Windows', key: 'Windows' },
    { name: 'Mac', key: 'Mac' },
    { name: 'Linux', key: 'linux' }
  ];

  constructor(private spinner: AppSpinnerService, private marketApi: MarketPlaceApiService,
    private router: Router) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.marketApi.getAllProducts().subscribe(data => {
      this.products = data;
      this.filteredProducts = data;
    });
  }

  onPaymentTypeChange(event, key: string) {
    if(event.checked.length && !this.selectedPayments.includes(key)) {
      this.selectedPayments.push(key);
    } else if(event.checked.length === 0) {
      this.selectedPayments = this.selectedPayments.filter(sp => sp !== key);
    }
    this.productFilter();
  }

  productFilter() {
    if(this.selectedPayments.length > 0) {
      this.filteredProducts = this.products.filter(p => this.selectedPayments.includes(p.prizingModel));
    } else {
      this.filteredProducts = this.products;
    }
  }

  onOSChange(value, type) {
    console.log('sdfdsf', value, type);
  }

  onUsedChange(value, type) {
    console.log('sdfdsf', value, type);
  }

  openProductDetails(product) {
    this.router.navigateByUrl('/product-detail/' + product.code);
  }
}
