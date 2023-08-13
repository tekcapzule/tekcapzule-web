import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppSpinnerService } from '@app/core';
import { HelperService } from '@app/core/services/common/helper.service';

@Component({
  selector: 'app-llm-hub',
  templateUrl: './llm-hub.component.html',
  styleUrls: ['./llm-hub.component.scss'],
})
export class LlmHubComponent implements OnInit {
  constructor(
    public spinner: AppSpinnerService,
    private helperService: HelperService,
    private router: Router
  ) {}

  ngOnInit(): void {
    
  }
}
