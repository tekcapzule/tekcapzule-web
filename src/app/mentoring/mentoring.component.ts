import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AppSpinnerService } from '@app/core';

@Component({
  selector: 'app-mentoring',
  templateUrl: './mentoring.component.html',
  styleUrls: ['./mentoring.component.scss'],
})
export class MentoringComponent implements OnInit {
  constructor(private spinner: AppSpinnerService,
    private router: Router) {}

  ngOnInit(): void {
  }

  navigateToSkilStudio(): void {
    this.router.navigateByUrl('/skill-dashboard');
  }
}
