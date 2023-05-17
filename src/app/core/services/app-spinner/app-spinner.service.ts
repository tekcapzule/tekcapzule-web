import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AppSpinnerService {
  constructor() {}

  show(): void {
    //document.getElementById('app_spinner').style.display = 'block';
  }

  hide(): void {
    //document.getElementById('app_spinner').style.display = 'none';
  }
}
