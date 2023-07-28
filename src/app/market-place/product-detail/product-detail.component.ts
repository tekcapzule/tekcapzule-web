import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AppSpinnerService, MarketPlaceApiService } from '@app/core';
import { HelperService } from '@app/core/services/common/helper.service';
import { IProduct } from '@app/shared/models/market.model';
import { Constants } from '@app/shared/utils';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  product: IProduct;
  productList: IProduct[] = [];
  titleUrl: string[];
  responsiveOptions: any[] = Constants.ResponsiveOptions;
  
  constructor(private spinner: AppSpinnerService,
    private marketService: MarketPlaceApiService,
    private route: ActivatedRoute,
    private helperService: HelperService,
    private router: Router) {
    }

  ngOnInit(): void {
    this.spinner.show();
    this.titleUrl = [this.helperService.getTileDetails('tekbytes').navUrl];
    this.route.params.subscribe(params => {
      this.getAllProducts(params['code']);
    });
  }

  getAllProducts(code: string) {
    this.marketService.getAllProducts().subscribe(data => {
      this.product = data.find(pd => pd.code === code);
      this.productList = data.filter(pd => pd.category === this.product.category);
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
    });
  }

  onExplore() {
    window.open(this.product.productDemo.videoUrl, '_blank');
  }

  openProductDetails(product) {
    this.router.navigateByUrl('/product-detail/' + product.code);
  }
}
