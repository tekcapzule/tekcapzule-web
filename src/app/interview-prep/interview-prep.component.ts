import { Component, OnInit } from '@angular/core';

import { AppSpinnerService } from '@app/core';
import { HelperService } from '@app/core/services/common/helper.service';
import { InterviewApiService } from '@app/core/services/interview-api/interview-api.service';
import { TopicItem } from '@app/shared/models';
import { IInterviewDetail } from '@app/shared/models/interview-item.model';

@Component({
  selector: 'app-interview-prep',
  templateUrl: './interview-prep.component.html',
  styleUrls: ['./interview-prep.component.scss'],
})
export class InterviewPrepComponent implements OnInit {
  interviewList: IInterviewDetail[] = [];
  filteredInterviewList: IInterviewDetail[] = [];
  searchText: string;
  topics: TopicItem[] = [];
  selectedTopics: string[] = [];

  constructor(
    public spinner: AppSpinnerService,
    private interviewApi: InterviewApiService,
    private helperService: HelperService
  ) {}

  ngOnInit(): void {
    this.spinner.show();
    this.topics = this.helperService.getTopicData();
    this.interviewApi.getAllInterview().subscribe(data => {
      this.spinner.hide();
      this.interviewList = data;
      this.filteredInterviewList = data;
    });
  }

  onSearch() {
    let tempList = [...this.interviewList];
    if (this.selectedTopics.length > 0) {
      tempList = tempList.filter(tekbyte => this.selectedTopics.includes(tekbyte.topicCode));
    }
    if (this.searchText && this.searchText.trim().length > 0) {
      this.filteredInterviewList = tempList.filter(
        intreview =>
          this.helperService.getIncludesStr(intreview.title, this.searchText) ||
          this.helperService.getIncludesStr(intreview.topicCode, this.searchText) ||
          this.helperService.getIncludesStr(intreview.summary, this.searchText) ||
          this.helperService.getIncludesStr(intreview.description, this.searchText)
      );
    } else {
      this.filteredInterviewList = tempList;
    }
  }

  onChange(eve) {
    this.selectedTopics = [];
    if (eve.value.length > 0) {
      eve.value.forEach(topic => this.selectedTopics.push(topic.code));
    }
    this.onSearch();
  }
}
