import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AppSpinnerService, TekByteApiService } from '@app/core';

@Component({
  selector: 'app-explore-tekbyte',
  templateUrl: './explore-tekbyte.component.html',
  styleUrls: ['./explore-tekbyte.component.scss'],
})
export class ExploreTekbyteComponent implements OnInit {
  constructor(private tekbyteApi: TekByteApiService,
    private spinner: AppSpinnerService) {}

  ngOnInit(): void {
    
  }
}
