import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AppSpinnerService } from '@app/core';
import { HelperService } from '@app/core/services/common/helper.service';
import { ResearchApiService } from '@app/core/services/research-api/research-api.service';
import { IResearchPaperDetail } from '@app/shared/models/research-item.model';
import * as moment from 'moment';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-research-papers',
  templateUrl: './research-papers.component.html',
  styleUrls: ['./research-papers.component.scss'],
})
export class ResearchPapersComponent implements OnInit {
  researchList: IResearchPaperDetail[] = [];
  filteredResearchList: IResearchPaperDetail[] = [];
  searchText: string;
  
  constructor(private spinner: AppSpinnerService,
    private researchApi: ResearchApiService,
    private helperService: HelperService,
    private router: Router,
    private messageService: MessageService) {}

  ngOnInit(): void {
    this.researchApi.getAllResearchPaper().subscribe(data => {
      this.spinner.hide();
      this.researchList = data;
      this.researchList.forEach(rl => {
        rl.publishedOn = moment(rl.publishedOn, 'DD/MM/YYYY').fromNow()
      });
      this.filteredResearchList = data;
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

  onSearch() {
    if(this.searchText && this.searchText.trim().length > 0) {
      this.filteredResearchList = this.researchList.filter(research => this.getIncludesStr(research.title) 
      || this.getIncludesStr(research.topicCode)
      || this.getIncludesStr(research.summary)
      || this.getIncludesStr(research.description)
      || this.getIncludesStr(research.tags.toString()));
    }
  }

  getIncludesStr(value: string): boolean {
    if(value) {
      value = value.toLowerCase();
      return value.includes(this.searchText.toLowerCase())
    }
    return false;
  }

  onRecommendClick(event, research: IResearchPaperDetail) {
    event.stopPropagation();
    this.researchApi.updateResearchRecommendCount(research.researchPaperId).subscribe(data => {
      research.isRecommended = true;
      this.messageService.add({
        key: 'tc',
        severity: 'success',
        detail: 'Thank you for the recommendation!',
      });
    });
  }
}
