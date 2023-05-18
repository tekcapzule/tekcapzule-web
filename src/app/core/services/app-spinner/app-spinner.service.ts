import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AppSpinnerService {
  constructor() {}

  show(): void {
    const spinner = this.getSpinner();
    if(spinner) {
      spinner.style.display = 'block';
    }
  }

  hide(): void {
    const spinner = this.getSpinner();
    if(spinner) {
      spinner.style.display = 'none';
    }
  }

  getSpinner() {
    return document.getElementById('app_spinner');
  }
}
