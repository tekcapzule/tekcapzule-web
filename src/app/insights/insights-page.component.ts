import { Component, OnInit } from '@angular/core';
import { InsightsApiService } from '@app/core';
import { HelperService } from '@app/core/services/common/helper.service';
import { InsightsItem } from '@app/shared/models/insights-item.model';
import * as moment from 'moment';

@Component({
  selector: 'app-insights-page',
  templateUrl: './insights-page.component.html',
  styleUrls: ['./insights-page.component.scss'],
})
export class InsightsPageComponent implements OnInit{

  insightsList: InsightsItem[] = [];
  selectedTopics = [];
  searchText: string;
  filteredInterviewList: InsightsItem[] = [];
  
  
  constructor(private insightsApi: InsightsApiService,
    private helperService: HelperService) {

  }

  ngOnInit(): void {
    this.insightsApi.getAllInsights().subscribe(data => {
      data.forEach(insight => {
        insight.topicName = this.helperService.getTopicName(insight.topic);
        insight.publishedOn = insight.publishedOn ? moment(insight.publishedOn, 'YYYY-MM-DD').fromNow() : 'NA';
      });
      this.insightsList = data;
    });
  }

  onSearch() {
    let tempList = [...this.insightsList];
    if (this.selectedTopics.length > 0) {
      tempList = tempList.filter(insight => this.selectedTopics.includes(insight.topic));
    }
    if (this.searchText && this.searchText.trim().length > 0) {
      this.filteredInterviewList = tempList.filter(
        insight =>
          this.helperService.getIncludesStr(insight.title, this.searchText) ||
          this.helperService.getIncludesStr(insight.topic, this.searchText) ||
          this.helperService.getIncludesStr(insight.description, this.searchText)
      );
    } else {
      this.filteredInterviewList = tempList;
    }
  }

  filterUpdate(topics) {
    this.selectedTopics = topics;
    this.onSearch();    
  }

}
