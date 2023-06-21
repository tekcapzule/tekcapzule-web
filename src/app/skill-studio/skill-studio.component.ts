import { Component, OnInit } from '@angular/core';
import { ITile } from './models/tile.model';
import { Router } from '@angular/router';
import { Constants } from '@app/shared/utils';

@Component({
  selector: 'app-skill-studio',
  templateUrl: './skill-studio.component.html',
  styleUrls: ['./skill-studio.component.scss'],
})
export class SkillStudioComponent implements OnInit {

  tileList: ITile[] = Constants.SkillTiles;
  
  constructor(private router: Router) {}

  ngOnInit(): void {}

  navigatePage(navUrl: string) {
    this.router.navigateByUrl(navUrl);
  }
}
