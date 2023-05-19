import { Component, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';
import { AppSpinnerService } from '@app/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SpinnerComponent implements OnInit, OnDestroy {
  showSpinner: boolean;
  subscriptions: Subscription[] = [];

  constructor(private spinner: AppSpinnerService) {
  }

  ngOnInit(): void {
    const sub = this.spinner.onSpinnerChange$().subscribe(showSpinner => {
      this.showSpinner = showSpinner;
    });
    this.subscriptions.push(sub);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
