import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AppSpinnerService, TekByteApiService } from '@app/core';
import { TekByteItem } from '@app/shared/models/tekbyte-item.model';
import { Constants } from '@app/shared/utils';
import { ITile } from '@app/skill-studio/models/tile.model';
import { HelperService } from './../../../core/services/common/helper.service';

@Component({
  selector: 'app-explore-tekbyte',
  templateUrl: './explore-tekbyte.component.html',
  styleUrls: ['./explore-tekbyte.component.scss'],
})
export class ExploreTekbyteComponent implements OnInit {
  tekbyteList: TekByteItem[] = [];
  tileDetail: ITile;

  constructor(private tekbyteApi: TekByteApiService,
    private spinner: AppSpinnerService, private router: Router) {}

  ngOnInit(): void {
    this.spinner.show();
    this.tekbyteApi.getAllTekByte().subscribe(data => {
      if(data) {
        this.tekbyteList = data;
        this.spinner.hide();
      }
    }, err => {
      this.spinner.hide();
    });
  }

  openTekbyte(tl) {
    this.router.navigateByUrl('ai-hub/tekbyte/' + tl.code + '/details');
  }
}
