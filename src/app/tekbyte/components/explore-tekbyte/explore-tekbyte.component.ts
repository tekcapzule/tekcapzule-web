import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AppSpinnerService, TekByteApiService } from '@app/core';
import { TekByteItem } from '@app/shared/models/tekbyte-item.model';
import { ITile } from '@app/skill-studio/models/tile.model';
import { HelperService } from './../../../core/services/common/helper.service';
import { TopicItem } from '@app/shared/models';

@Component({
  selector: 'app-explore-tekbyte',
  templateUrl: './explore-tekbyte.component.html',
  styleUrls: ['./explore-tekbyte.component.scss'],
})
export class ExploreTekbyteComponent implements OnInit {
  tekbyteList: TekByteItem[] = [];
  popularTekbyteList: TekByteItem[] = [];
  filteredTekbyteList: TekByteItem[] = [];
  tileDetail: ITile;
  searchText: string;
  topics: TopicItem[] = [];
  selectedTopics: string[] = [];

  constructor(private tekbyteApi: TekByteApiService,
    private spinner: AppSpinnerService, private router: Router,
    private helperService: HelperService) {}

  ngOnInit(): void {
    this.spinner.show();
    this.topics = this.helperService.getTopicData();
    this.getTekbytes();
  }

  getTekbytes() {
    this.tekbyteApi.getAllTekByte().subscribe(data => {
      if(data) {
        this.tekbyteList = data;
        this.filteredTekbyteList = data;
        if(data.length > 7) {
          this.randaomTekbyte(data)
        }
        this.spinner.hide();
      }
    }, err => {
      this.spinner.hide();
    });
  }

  randaomTekbyte(data){
    const arr = []
    while(this.popularTekbyteList.length < 5){
      let randomInt = Math.floor(Math.random() * data.length - 1);
      if(arr.indexOf(randomInt) === -1) {
        this.popularTekbyteList.push(data[randomInt])
      }
    }
  }

  openTekbyte(tl) {
    this.router.navigateByUrl('/ai-hub/tekbyte/' + tl.tekByteId + '/details');
  }

  onSearch() {
    let tempList = [...this.tekbyteList];
    if(this.selectedTopics.length > 0) {
      tempList = tempList.filter(tekbyte => this.selectedTopics.includes(tekbyte.topicCode));
    }
    if(this.searchText && this.searchText.trim().length > 0) {
      this.filteredTekbyteList = tempList.filter(tekbyte => 
      this.helperService.getIncludesStr(tekbyte.title, this.searchText) 
      || this.helperService.getIncludesStr(tekbyte.topicCode, this.searchText)
      || this.helperService.getIncludesStr(tekbyte.summary, this.searchText)
      || this.helperService.getIncludesStr(tekbyte.description, this.searchText));
    } else {
      this.filteredTekbyteList = tempList;
    }
  }

  onChange(eve) {
    this.selectedTopics = [];
    if(eve.value.length > 0) {
      eve.value.forEach(topic => this.selectedTopics.push(topic.code));
    }
    this.onSearch();
  }
}
