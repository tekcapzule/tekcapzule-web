import { Component, OnDestroy, OnInit } from '@angular/core';
import { forkJoin, Observable, Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';

import { AppSpinnerService, CapsuleApiService, TekByteApiService, TopicApiService } from '@app/core';
import { CapsuleItem, TopicItem } from '@app/shared/models';
import { TekByteItem } from '@app/shared/models/tekbyte-item.model';
import { HelperService } from '@app/core/services/common/helper.service';
import { ITile } from '@app/skill-studio/models/tile.model';

@Component({
  selector: 'app-tekbyte-details',
  templateUrl: './tekbyte-details.component.html',
  styleUrls: ['./tekbyte-details.component.scss'],
})
export class TekbyteDetailsComponent implements OnInit, OnDestroy {
  tekbyteData: TekByteItem;
  titleUrl: string[];

  constructor(
    private spinner: AppSpinnerService,
    private route: ActivatedRoute,
    private tekbyteApi: TekByteApiService,
    private helperService: HelperService
  ) {}

  ngOnInit(): void {
    this.titleUrl = [this.helperService.getTileDetails('tekbytes').navUrl];
    this.spinner.show();
    this.route.params.subscribe(params => {
      this.getTekbyteDetaills(params['code']);
    });
  }

  getTekbyteDetaills(tekbyteCode: string) {
    this.tekbyteApi.getTekByte(tekbyteCode).subscribe(data => {
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
