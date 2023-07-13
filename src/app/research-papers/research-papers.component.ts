import { Component, OnInit } from '@angular/core';

import { AppSpinnerService } from '@app/core';
import { ResearchApiService } from '@app/core/services/research-api/research-api.service';
import { IResearchPaperDetail } from '@app/shared/models/research-item.model';
import * as moment from 'moment';


@Component({
  selector: 'app-research-papers',
  templateUrl: './research-papers.component.html',
  styleUrls: ['./research-papers.component.scss'],
})
export class ResearchPapersComponent implements OnInit {
  researchList: IResearchPaperDetail[] = [];
  filteredResearchList: IResearchPaperDetail[] = [];

  constructor(private spinner: AppSpinnerService,
    private researchApi: ResearchApiService) {}

  ngOnInit(): void {
    this.researchApi.getAllResearchPaper().subscribe(data => {
      this.spinner.hide();
      this.researchList = data;
      this.researchList.forEach(rl => {
        rl.publishedOn = moment(rl.publishedOn, 'DD/MM/YYYY').fromNow()
      });
      this.filteredResearchList = this.researchList.slice();
    });
  }

  onOpen(research: IResearchPaperDetail) {
    window.open(research.researchPaperUrl, '_blank');
  }
}
