import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AppSpinnerService } from '@app/core';
import { HelperService } from '@app/core/services/common/helper.service';
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
    private researchApi: ResearchApiService,
    private helperService: HelperService,
    private router: Router) {}

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
    if (this.helperService.isLocalPublisher(research.publisher)) {
      this.spinner.show();
      sessionStorage.setItem('com.tekcapsule.pageURL', this.router.url);
      sessionStorage.setItem('com.tekcapsule.resourceURL', research.resourceUrl);
      sessionStorage.setItem('com.tekcapsule.title', research.title);
      this.router.navigateByUrl('/ai-hub/' + research.researchPaperId +'/detail?pageId=Research_Papers');
    } else {
      window.open(research.resourceUrl, '_blank');
    }
  }
}
