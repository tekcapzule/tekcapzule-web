import { Component, OnInit } from '@angular/core';
import { ITile } from './../models/tile.model';
import { Router } from '@angular/router';
import { Constants } from '@app/shared/utils';

@Component({
  selector: 'app-ai-dashboard',
  templateUrl: './ai-dashboard.component.html',
  styleUrls: ['./ai-dashboard.component.scss'],
})
export class AIDashboardComponent implements OnInit {

  tileList: ITile[] = Constants.SkillTiles;
  
  constructor(private router: Router) {}

  ngOnInit(): void {}

  navigatePage(navUrl: string) {
    this.router.navigateByUrl(navUrl);
  }
}
