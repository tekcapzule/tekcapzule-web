import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { TekByteApiService } from '@app/core';

import { TekByteItem } from '@app/shared/models/tekbyte-item.model';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-tekbyte-card',
  templateUrl: './tekbyte-card.component.html',
  styleUrls: ['./tekbyte-card.component.scss'],
})
export class TekbyteCardComponent {
  @Input() tekbyte: TekByteItem;

  constructor(private router: Router, private tekybyteService: TekByteApiService,
    private messageService: MessageService) {}
  
  openTekbyte() {
    this.router.navigateByUrl('/ai-hub/tekbyte/' + this.tekbyte.tekByteId + '/details');
  }
 

  onRecommendClick(eve) {
    eve.stopPropagation();
    if(!this.tekbyte.isRecommended) {
      this.tekybyteService.updateRecommendCount(this.tekbyte.tekByteId).subscribe(data => {
        this.tekbyte.isRecommended = true;
        this.messageService.add({
          key: 'tc',
          severity: 'success',
          detail: 'Thank you for the recommendation!',
        });
      }, err => {
        this.messageService.add({
          key: 'tc',
          severity: 'error',
          detail: 'Please try again later!',
        });
      });
    }
    return false;
  }
}
