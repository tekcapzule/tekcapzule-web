import { Component, OnInit } from '@angular/core';

import { AppSpinnerService } from '@app/core';

@Component({
  selector: 'app-interview-prep',
  templateUrl: './interview-prep.component.html',
  styleUrls: ['./interview-prep.component.scss'],
})
export class InterviewPrepComponent implements OnInit {
  constructor(private spinner: AppSpinnerService) {}

  ngOnInit(): void {
  }
}
