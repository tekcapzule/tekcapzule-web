import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { TekByteItem } from '@app/shared/models/tekbyte-item.model';

@Component({
  selector: 'app-tekbyte-card',
  templateUrl: './tekbyte-card.component.html',
  styleUrls: ['./tekbyte-card.component.scss'],
})
export class TekbyteCardComponent {
  @Input() tekbyte: TekByteItem;

  constructor(private router: Router) {}
  
  openTekbyte() {
    this.router.navigateByUrl('/ai-hub/tekbyte/' + this.tekbyte.tekByteId + '/details');
  }
}
