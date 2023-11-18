import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AppSpinnerService, EventChannelService, TekByteApiService } from '@app/core';
import { TopicItem } from '@app/shared/models';
import { TekByteItem } from '@app/shared/models/tekbyte-item.model';
import { ITile } from '@app/skill-studio/models/tile.model';
import { Subject, Subscription } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { HelperService } from './../../../core/services/common/helper.service';
import { ChannelEvent } from '@app/shared/models/channel-item.model';

@Component({
  selector: 'app-explore-tekbyte',
  templateUrl: './explore-tekbyte.component.html',
  styleUrls: ['./explore-tekbyte.component.scss'],
})
export class ExploreTekbyteComponent implements OnInit {
  popularTekbyteList: TekByteItem[] = [];
  filteredTekbyteList: TekByteItem[] = [];
  tileDetail: ITile;
  searchText: string;
  topics: TopicItem[] = [];
  selectedTopics: string[] = ['AI', 'WEB3', 'META'];
  tekbyteList: TekByteItem[] = [];
  isMobileResolution: boolean;
  isFilterVisible = true;
  destroy$ = new Subject<boolean>();
  subscription: Subscription[] = [];

  constructor(
    private tekbyteApi: TekByteApiService,
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
    this.tekbyteApi.getAllTekByte().subscribe(
      data => {
        if (data) {
          this.tekbyteList = data;
          this.filteredTekbyteList = data;
          if (data.length > 7) {
            this.randaomTekbyte(data);
          }
          this.spinner.hide();
        }
      },
      err => {
        this.spinner.hide();
      }
    );
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

  openTekbyte(tl) {
    this.router.navigateByUrl('/ai-hub/tekbyte/' + tl.tekByteId + '/details');
  }

  @HostListener('window:resize', ['$event'])
  onResize(event = null) {
    this.isMobileResolution = window.innerWidth < 992 ? true : false;
    this.helperService.setMobileResolution(this.isMobileResolution);
    if (this.isMobileResolution) {
      this.isFilterVisible = false;
    }
  }

  onSearch() {
    let tempList = [...this.tekbyteList];
    if (this.selectedTopics.length > 0) {
      tempList = this.tekbyteList.filter(tekbyte => this.selectedTopics.includes(tekbyte.topicCode));
    }
    if (this.searchText && this.searchText.trim().length > 0) {
      this.filteredTekbyteList = tempList.filter(
        tekbyte =>
          this.helperService.getIncludesStr(tekbyte.title, this.searchText) ||
          this.helperService.getIncludesStr(tekbyte.topicCode, this.searchText) ||
          this.helperService.getIncludesStr(tekbyte.summary, this.searchText) ||
          this.helperService.getIncludesStr(tekbyte.description, this.searchText)
      );
    } else {
      this.filteredTekbyteList = tempList;
    }
  }

  onChange(eve) {
    this.selectedTopics = [];
    if (eve.value.length > 0) {
      eve.value.forEach(topic => this.selectedTopics.push(topic.code));
    }
    this.onSearch();
  }

  filterUpdate(topics) {
    this.selectedTopics = topics;
    this.onSearch();
  }
}
