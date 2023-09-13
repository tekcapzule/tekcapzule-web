import {
  Component,
  EventEmitter,
  Output
} from '@angular/core';


@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent {
  filterOptions = [
    {key:'AI', text:'Artificial Intelligence'},
    {key:'Web3', text:'Web 3.0'},
    {key:'MTV', text:'Metaverse'}
  ];
  selectedFilters = ['AI', 'Web3', 'MTV'];
  @Output() onFilterUpdate = new EventEmitter<any>();

  constructor() {}


  onFilterChange(key) {
    if(this.selectedFilters.includes(key)) {
      this.selectedFilters = this.selectedFilters.filter(fi => fi !== key);
    } else {
      this.selectedFilters.push(key);
    }
    this.onFilterUpdate.emit(this.selectedFilters);
  }
}
