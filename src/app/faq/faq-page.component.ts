import { Component, Input, ViewChild } from '@angular/core';
import { Accordion } from 'primeng/accordion';

@Component({
  selector: 'app-faq-page',
  templateUrl: './faq-page.component.html',
  styleUrls: ['./faq-page.component.scss'],
})
export class FaqPageComponent {
  @Input() qaList: any[] = [];
  searchText: string;
  selectedQA: any;
  selectedQus: any;
  selectedAns: any;
  @ViewChild('accordion') accordion: Accordion;

  constructor() {

  }

  onSearch() {
    this.qaList.forEach((list, index) => {
      if (this.searchText && this.searchText.trim().length > 0) {
        if (list.title.toLowerCase().includes(this.searchText.toLowerCase())) {
          this.selectedQA = list;
          this.accordion.activeIndex = index;
        }
      } else {
        list.qa.forEach(qa => {
          if (qa.qus.includes(this.searchText.toLowerCase()) ) {
            this.selectedQus = list;
            this.selectedQA = list;
            this.accordion.activeIndex = index;
          } else if(qa.ans.includes(this.searchText.toLowerCase())) {
            this.selectedAns = list;
            this.selectedQA = list;
            this.accordion.activeIndex = index;
          }
        });
      }
    });
  }
}
