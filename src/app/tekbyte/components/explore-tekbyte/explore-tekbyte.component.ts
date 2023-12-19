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
  learningList: ILearningMaterial[] = [];
  filteredList: ILearningMaterial[] = [];
  selectedTopic: string[] = [];
  selectedPayments: any[] = [];

  tileDetail: ITile;
  searchText: string;
  topics: TopicItem[] = [];
  selectedTopics: string[] = ['AI', 'WEB3', 'META'];
  tekbyteList: ILearningMaterial[] = [];
  isMobileResolution: boolean;
  isFilterVisible = true;
  destroy$ = new Subject<boolean>();
  subscription: Subscription[] = [];
  
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
      this.filteredList = items.filteredList;
      this.spinner.hide();
    });
  }

  randaomTekbyte(data) {
    const arr = [];
    while (this.learningList.length < 5) {
      let randomInt = Math.floor(Math.random() * data.length - 1);
      if (arr.indexOf(randomInt) === -1) {
        this.learningList.push(data[randomInt]);
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
    this.selectedPayments = event.payments;
    this.productFilter();
  }  
  
  productFilter(isSearchCall = false) {
    this.filteredList = this.helperService.productFilter(this.learningList, this.selectedTopic,
      this.selectedPayments, []);
    if (!isSearchCall) {
      this.onSearch(true);
    }
  }

  onSearch(isFiltered = false): void {
    if (!isFiltered) {
      this.productFilter(true);
    }
    this.helperService.searchByText(this.filteredList, this.searchText);
  }
}
