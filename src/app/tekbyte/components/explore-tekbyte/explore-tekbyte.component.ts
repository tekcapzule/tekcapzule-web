import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AppSpinnerService, TekByteApiService } from '@app/core';
import { TekByteItem } from '@app/shared/models/tekbyte-item.model';

@Component({
  selector: 'app-explore-tekbyte',
  templateUrl: './explore-tekbyte.component.html',
  styleUrls: ['./explore-tekbyte.component.scss'],
})
export class ExploreTekbyteComponent implements OnInit {
  tekbyteList: TekByteItem[] = [];

  constructor(private tekbyteApi: TekByteApiService,
    private spinner: AppSpinnerService, private router: Router) {}

  ngOnInit(): void {
    this.spinner.show();
    this.tekbyteApi.getAllTekByte().subscribe(data => {
      if(data) {
        this.tekbyteList = data;
        console.log(this.tekbyteList);
        this.spinner.hide();
      }
    }, err => {
      this.spinner.hide();
    });
  }

  openTekbyte(tl) {
    this.router.navigateByUrl('/tekbyte/' + tl.code + '/details');
  }
}
