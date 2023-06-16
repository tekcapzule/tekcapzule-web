import { Component, OnDestroy, OnInit } from '@angular/core';
import { forkJoin, Observable, Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';

import { AppSpinnerService, CapsuleApiService, TekByteApiService, TopicApiService } from '@app/core';
import { CapsuleItem, TopicItem } from '@app/shared/models';
import { TekByteItem } from '@app/shared/models/tekbyte-item.model';

@Component({
  selector: 'app-tekbyte-details',
  templateUrl: './tekbyte-details.component.html',
  styleUrls: ['./tekbyte-details.component.scss'],
})
export class TekbyteDetailsComponent implements OnInit, OnDestroy {
  tekbyteData: TekByteItem;

  constructor(
    private spinner: AppSpinnerService,
    private route: ActivatedRoute, 
    private activatedRoute: ActivatedRoute,
    private tekbyteApi: TekByteApiService
  ) {}

  ngOnInit(): void {
    this.spinner.show();
    this.route.params.subscribe(params => {
      this.getTekbyteDetaills(params['code']);
    });
  }

  getTekbyteDetaills(tekbyteCode: string) {
    this.tekbyteApi.getTekByte(tekbyteCode).subscribe(data => {
      console.log('tekbyteApi', data);
      this.tekbyteData = data;
      this.spinner.hide();
    }, err => {
      console.log(err);
      this.spinner.hide();
    });
  }

  ngOnDestroy(): void {
  }
}
