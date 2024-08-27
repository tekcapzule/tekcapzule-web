import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { TopicItem } from '@app/shared/models';

@Component({
  selector: 'app-data-filter',
  templateUrl: './data-filter.component.html',
  styleUrls: ['./data-filter.component.scss'],
})

export class DataFilterComponent {
  selectedTopic: string[] = [];
  selectedPayments: any[] = [];
  selectedDeliveryMode: any[] = [];
  topics: TopicItem[] = [];
  paymentCategories: any[] = [
    { name: 'Free', key: 'Free' },
    { name: 'Freemium', key: 'Freemium' },
    { name: 'Premium', key: 'Premium' },
    { name: 'Paid', key: 'Standard' },
  ];
  deliveryMode: any[] = [
    { name: 'Online', key: 'ONLINE' },
    { name: 'Hybrid', key: 'HYBRID' },
    { name: 'In Classroom', key: 'IN_CLASSROOM' },
  ];

  @Output() filterUpdate = new EventEmitter<any>();
  @Input() pageId:string;

  constructor(){}

  onFilterChange(event, key: string) {
    this.filterUpdate.emit({
      'topic': this.selectedTopic, 'payments': this.selectedPayments, 'deliveryMode': this.selectedDeliveryMode
    })
  }
}
