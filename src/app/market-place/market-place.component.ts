import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';

import { AppSpinnerService, ChannelEvent, EventChannelService, MarketPlaceApiService } from '@app/core';
import { IProduct } from '@app/shared/models/market.model';
import { finalize } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject, Subscription } from 'rxjs';
import { HelperService } from '@app/core/services/common/helper.service';

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
    { name: 'Free', key: 'Free' },
    { name: 'Premium', key: 'Premium' },
    { name: 'Paid', key: 'Standard' },
  ];

  osCategories: any[] = [
    { name: 'Windows', key: 'Windows' },
    { name: 'Mac', key: 'Mac' },
    { name: 'Linux', key: 'linux' },
  ];
  isMobileResolution: boolean;
  isFilterVisible = true;
  isSortVisible = true;
  destroy$ = new Subject<boolean>();
  subscription: Subscription[] = [];

  constructor(
    public spinner: AppSpinnerService,
    private marketApi: MarketPlaceApiService,
    private router: Router,
    private helperService: HelperService,
    private eventChannel: EventChannelService
  ) {}

  ngOnInit(): void {
    this.onResize()
    this.subscribeFilter();
    this.subscribeSort();
    this.getProducts();
  }

  
  subscribeFilter(): void {
    const sub = this.eventChannel.getChannel().pipe(
        filter(out => out.event === ChannelEvent.ShowHideFilter), takeUntil(this.destroy$))
      .subscribe(() => {
        this.isFilterVisible = !this.isFilterVisible;
      });
    this.subscription.push(sub);
  }

  subscribeSort(): void {
    const sub = this.eventChannel.getChannel().pipe(
        filter(out => out.event === ChannelEvent.ShowHideSort), takeUntil(this.destroy$))
      .subscribe(() => {
        this.isSortVisible = !this.isSortVisible;
      });
    this.subscription.push(sub);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event = null) {
    this.isMobileResolution = window.innerWidth < 992 ? true : false;
    this.helperService.setMobileResolution(this.isMobileResolution);
    if (this.isMobileResolution) {
      this.isFilterVisible = false;
      this.isSortVisible = false;
    }
  }
  
 

  getProducts() {
    this.spinner.show();
    this.marketApi
      .getAllProducts()
      .pipe(finalize(() => this.spinner.hide()))
      .subscribe(data => {
        this.products = data;
        this.filteredProducts = data;
      });
  }

  onPaymentTypeChange(event, key: string) {
    if (event.checked.length && !this.selectedPayments.includes(key)) {
      this.selectedPayments.push(key);
    } else if (event.checked.length === 0) {
      this.selectedPayments = this.selectedPayments.filter(sp => sp !== key);
    }
    this.productFilter();
  }

  productFilter() {
    if (this.selectedPayments.length > 0) {
      this.filteredProducts = this.products.filter(p =>
        this.selectedPayments.includes(p.prizingModel)
      );
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
    this.router.navigateByUrl('ai-hub/product-detail/' + product.code);
  }
}
