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
    {key:'WEB3', text:'Web 3.0'},
    {key:'META', text:'Metaverse'}
  ];
  selectedFilters = ['AI', 'WEB3', 'META'];
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
