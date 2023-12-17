import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';

import { AppSpinnerService, EventChannelService, TekByteApiService } from '@app/core';
import { TopicItem } from '@app/shared/models';
import { TekByteItem } from '@app/shared/models/tekbyte-item.model';
import { ITile } from '@app/skill-studio/models/tile.model';
import { Subject, Subscription } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { HelperService } from './../../../core/services/common/helper.service';
import { ChannelEvent } from '@app/shared/models/channel-item.model';
import { SkillStudioApiService } from '@app/core/services/skill-studio-api/skill-studio-api.service';
import { ILearningMaterial } from '@app/shared/models/skill-studio-item.model';

@Component({
  selector: 'app-explore-tekbyte',
  templateUrl: './explore-tekbyte.component.html',
  styleUrls: ['./explore-tekbyte.component.scss'],
})
export class ExploreTekbyteComponent implements OnInit {
  popularTekbyteList: ILearningMaterial[] = [];
  filteredTekbyteList: ILearningMaterial[] = [];
  tileDetail: ITile;
  searchText: string;
  topics: TopicItem[] = [];
  selectedTopics: string[] = ['AI', 'WEB3', 'META'];
  tekbyteList: ILearningMaterial[] = [];
  isMobileResolution: boolean;
  isFilterVisible = true;
  destroy$ = new Subject<boolean>();
  subscription: Subscription[] = [];
  selectedTopic: string[] = [];
  selectedPayments: any[] = [];
  selectedDeliveryMode: any[] = [];
  
  constructor(
    private skillApi: SkillStudioApiService,
    public spinner: AppSpinnerService,
    private router: Router,
    private helperService: HelperService,
    private eventChannel: EventChannelService
  ) {}

  ngOnInit(): void {
    this.spinner.show();
    this.topics = this.helperService.getTopicData();
    this.getTekbytes();
    this.onResize();
    this.subscribeFilter();
  }
  
  subscribeFilter(): void {
    const sub = this.eventChannel.getChannel().pipe(
        filter(out => out.event === ChannelEvent.ShowHideFilter), takeUntil(this.destroy$))
      .subscribe(() => {
        this.isFilterVisible = !this.isFilterVisible;
      });
    this.subscription.push(sub);
  }

  getTekbytes() {
    this.skillApi.getAllLearning().subscribe(data => {
      const items = this.helperService.getLearningMtsByType(data, 'Tekbyte');
      this.tekbyteList = items.currentList;
      this.filteredTekbyteList = items.filteredList;
      this.spinner.hide();
    });
  }

  randaomTekbyte(data) {
    const arr = [];
    while (this.popularTekbyteList.length < 5) {
      let randomInt = Math.floor(Math.random() * data.length - 1);
      if (arr.indexOf(randomInt) === -1) {
        this.popularTekbyteList.push(data[randomInt]);
      }
    }
  }

  openTekbyte(tl: ILearningMaterial) {
    this.router.navigateByUrl('/ai-hub/tekbyte/' + tl.learningMaterialId + '/details?pageId=' + 'Tekbyte');
  }

  @HostListener('window:resize', ['$event'])
  onResize(event = null) {
    this.isMobileResolution = window.innerWidth < 992 ? true : false;
    this.helperService.setMobileResolution(this.isMobileResolution);
    if (this.isMobileResolution) {
      this.isFilterVisible = false;
    }
  }
  
  onFilterUpdate(event) {
    this.selectedTopic = event.topic;
    this.selectedDeliveryMode = event.deliveryMode;
    this.selectedPayments = event.payments;
    this.tekbyteFilter();
  }

  tekbyteFilter(isSearchCall = false) {
    let tempList = [...this.tekbyteList];
    if ( this.selectedTopic.length > 0 || this.selectedPayments.length > 0 ||
      this.selectedDeliveryMode.length > 0) {
      if (this.selectedTopic.length) {
        tempList = tempList.filter(tekbyte => this.selectedTopic.includes(tekbyte.topicCode));
      }
      if (this.selectedPayments.length) {
        tempList = tempList.filter(tekbyte => this.selectedPayments.includes(tekbyte.prizingModel));
      }
      if (this.selectedDeliveryMode.length > 0) {
        tempList = tempList.filter(tekbyte =>
          this.selectedDeliveryMode.includes(tekbyte.deliveryMode)
        );
      }
    }
    this.filteredTekbyteList = tempList;
    if (!isSearchCall) {
      this.onSearch(true);
    }
  }

  onSearch(isFiltered = false): void {
    if (!isFiltered) {
      this.tekbyteFilter(true);
    }
    if (this.searchText && this.searchText.trim().length > 0) {
      this.filteredTekbyteList = this.filteredTekbyteList.filter(
        tekbyte =>
          this.helperService.getIncludesStr(tekbyte.title, this.searchText) ||
          this.helperService.getIncludesStr(tekbyte.topicName, this.searchText) ||
          this.helperService.getIncludesStr(tekbyte.summary, this.searchText) ||
          this.helperService.getIncludesStr(tekbyte.description, this.searchText)
      );
    }
  }

}
