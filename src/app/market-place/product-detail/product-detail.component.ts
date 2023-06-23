import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AppSpinnerService, MarketPlaceApiService } from '@app/core';
import { HelperService } from '@app/core/services/common/helper.service';
import { IProduct } from '@app/shared/models/market.model';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  product: IProduct;
  productList: IProduct[];
  titleUrl: string[];

  constructor(private spinner: AppSpinnerService,
    private marketService: MarketPlaceApiService,
    private route: ActivatedRoute,
    private helperService: HelperService
    ) {}

  ngOnInit(): void {
    this.titleUrl = [this.helperService.getTileDetails('tekbytes').navUrl];
    this.getProduct();
  }

  getProduct() {
    this.route.params.subscribe(params => {
      this.marketService.getProduct(params['code']).subscribe(data => {
        this.product = data;
        this.spinner.hide();
      }, err => {
        console.log(err);
        this.spinner.hide();
      });
    });
  }

  getAllProducts() {
    this.marketService.getAllProducts().subscribe(data => {
      this.productList = data.filter(pd => pd.category === this.product.category);
    });
  }


  onExplore() {
    window.open(this.product.productDemo.videoUrl, '_blank');
  }
}
