import { Component } from '@angular/core';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss'],
})
export class AdminPageComponent {
  destroy$ = new Subject<boolean>();
}
