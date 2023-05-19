import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AppSpinnerService {
  showSpinner = false;
  private spinnerChange$ = new BehaviorSubject<boolean>(this.showSpinner);

  constructor() {}

  show(): void {
    this.setSpinner(true);
  }

  hide(): void {
    this.setSpinner(false);
  }

  private setSpinner(showSpinner): void {
    this.showSpinner = showSpinner;
    this.spinnerChange$.next(this.showSpinner);
  }

  public onSpinnerChange$(): Observable<boolean> {
    return this.spinnerChange$.asObservable();
  }
}
