import { Component, OnDestroy, OnInit } from '@angular/core';
import { forkJoin, Observable, Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';

import { CapsuleApiService, TekByteApiService, TopicApiService } from '@app/core';
import { CapsuleItem, TopicItem } from '@app/shared/models';

@Component({
  selector: 'app-tekbyte-details',
  templateUrl: './tekbyte-details.component.html',
  styleUrls: ['./tekbyte-details.component.scss'],
})
export class TekbyteDetailsComponent implements OnInit, OnDestroy {
  // topic: TopicItem;
  // firstThreeCapsules: CapsuleItem[] = [];
  // destroy$ = new Subject<boolean>();

  constructor(
    private activatedRoute: ActivatedRoute,
    private capsuleApi: CapsuleApiService,
    private tekbyteApi: TekByteApiService
  ) {}

  ngOnInit(): void {
    const tekbyteCode = 'null-EMERGING_TECH-f82db6a6-0372-4346-ac2c-17b763e804a2';
    this.tekbyteApi.getTekByte(tekbyteCode).subscribe(data => {
      console.log('tekbyteApi', data);
    }, err => {
      console.log(err);
    });
  }

  ngOnDestroy(): void {
  }
}
