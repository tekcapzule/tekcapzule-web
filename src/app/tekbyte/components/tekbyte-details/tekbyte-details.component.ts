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
import { Constants } from '@app/shared/utils';

@Component({
  selector: 'app-tekbyte-details',
  templateUrl: './tekbyte-details.component.html',
  styleUrls: ['./tekbyte-details.component.scss'],
})
export class TekbyteDetailsComponent implements OnInit, OnDestroy {
  tekbyteData: TekByteItem;
  titleUrl: string[];
  subscriberFormGroup: FormGroup;
  tekbyteList: TekByteItem[] = [];
  popularTekbyteList: TekByteItem[] = [];
  responsiveOptions: any[] = Constants.ResponsiveOptions;
  

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
    this.tekbyteApi.getAllTekByte().subscribe(data => {
      if(data) {
        this.tekbyteList = data;
        if(data.length > 5) {
          this.randaomTekbyte(); 
        }
        this.tekbyteData = this.tekbyteList.find(tek => tek.tekByteId === tekbyteCode);
        this.spinner.hide();
      }
    }, err => {
      console.log(err);
      this.spinner.hide();
    });
  }

  randaomTekbyte(){
    const arr = []
    while(this.popularTekbyteList.length < 3){
      let randomInt = Math.floor(Math.random() * this.tekbyteList.length - 1);
      if(arr.indexOf(randomInt) === -1) {
        this.popularTekbyteList.push(this.tekbyteList[randomInt])
      }
    }
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
