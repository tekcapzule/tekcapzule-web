import { Component, OnInit } from '@angular/core';

import { AppSpinnerService } from '@app/core';
import { InterviewApiService } from '@app/core/services/interview-api/interview-api.service';
import { IInterviewDetail } from '@app/shared/models/interview-item.model';

@Component({
  selector: 'app-interview-prep',
  templateUrl: './interview-prep.component.html',
  styleUrls: ['./interview-prep.component.scss'],
})
export class InterviewPrepComponent implements OnInit {
  interviewList: IInterviewDetail[] = [];
  filteredInterviewList: IInterviewDetail[] = [];

  constructor(private spinner: AppSpinnerService,
    private interviewApi: InterviewApiService) {}

  ngOnInit(): void {
    this.interviewApi.getAllInterview().subscribe(data => {
      this.spinner.hide();
      this.interviewList = data;
      this.filteredInterviewList = data;
    });
  }
}
