import { Component, OnDestroy, OnInit } from '@angular/core';
import { forkJoin, Observable, Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';

import { AppSpinnerService, CapsuleApiService, SubscriptionApiService, TekByteApiService, TopicApiService } from '@app/core';
import { CapsuleItem, TopicItem } from '@app/shared/models';
import { TekByteItem } from '@app/shared/models/tekbyte-item.model';
import { HelperService } from '@app/core/services/common/helper.service';
import { ITile } from '@app/skill-studio/models/tile.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-tekbyte-details',
  templateUrl: './tekbyte-details.component.html',
  styleUrls: ['./tekbyte-details.component.scss'],
})
export class TekbyteDetailsComponent implements OnInit, OnDestroy {
  tekbyteData: TekByteItem;
  titleUrl: string[];
  subscriberFormGroup: FormGroup;
  
  constructor(
    private spinner: AppSpinnerService,
    private route: ActivatedRoute,
    private tekbyteApi: TekByteApiService,
    private helperService: HelperService,
    private fb: FormBuilder,
    private subscriptionApi: SubscriptionApiService,
    private messageService: MessageService,
  ) {}

  ngOnInit(): void {
    this.subscriberFormGroup = this.fb.group({
      emailId: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]]
    })
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

  onSubscribe(): void {
    this.subscriberFormGroup.markAsTouched();
    if(this.subscriberFormGroup.valid) {
      this.spinner.show();
      this.subscriptionApi.subscribeEmail(this.subscriberFormGroup.value.emailId).subscribe(data => {
        this.messageService.add({ key: 'tc', severity: 'success', detail: 'Thank you for subscribing!' });
        this.subscriberFormGroup.reset();
        this.spinner.hide();
      }, error => {
        this.messageService.add(this.helperService.getInternalErrorMessage());
        this.spinner.hide();
      });
    } else {
      this.messageService.add({ key: 'tc', severity: 'error', detail: 'Enter valid email' });
    }
  }

}
