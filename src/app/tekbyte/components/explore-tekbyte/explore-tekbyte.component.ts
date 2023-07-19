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
  filteredTekbyteList: TekByteItem[] = [];
  tileDetail: ITile;
  searchText: string;

  constructor(private tekbyteApi: TekByteApiService,
    private spinner: AppSpinnerService, private router: Router,
    private helperService: HelperService) {}

  ngOnInit(): void {
    this.spinner.show();
    this.tekbyteApi.getAllTekByte().subscribe(data => {
      if(data) {
        this.tekbyteList = data;
        this.filteredTekbyteList = data;
        this.spinner.hide();
      }
    }, err => {
      this.spinner.hide();
    });
  }

  openTekbyte(tl) {
    this.router.navigateByUrl('/tekbyte/' + tl.code + '/details');
  }

  onSearch() {
    if(this.searchText && this.searchText.trim().length > 0) {
      this.filteredTekbyteList = this.tekbyteList.filter(tekbyte => 
      this.helperService.getIncludesStr(tekbyte.title, this.searchText) 
      || this.helperService.getIncludesStr(tekbyte.topicCode, this.searchText)
      || this.helperService.getIncludesStr(tekbyte.summary, this.searchText)
      || this.helperService.getIncludesStr(tekbyte.description, this.searchText));
    } else {
      this.filteredTekbyteList = [...this.tekbyteList];
    }
  }
}
