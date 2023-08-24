import { Component, OnInit } from '@angular/core';
import { InsightsApiService } from '@app/core';
import { InsightsItem } from '@app/shared/models/insights-item.model';

@Component({
  selector: 'app-insights-page',
  templateUrl: './insights-page.component.html',
  styleUrls: ['./insights-page.component.scss'],
})
export class InsightsPageComponent implements OnInit{

  insightsList: InsightsItem[] = [];

  constructor(private insightsApi: InsightsApiService) {

  }

  ngOnInit(): void {
    this.insightsApi.getAllInsights().subscribe(data => {
      console.log('data', data);
      this.insightsList = data;
    });
  }

}
