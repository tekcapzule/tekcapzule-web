import { Component, OnInit } from '@angular/core';

export interface PeriodicElement {
  capsuleTitle: string, 
  auther: string,
  publishDate: string,
  tags: string, 
  duration: number,
  category: string,
  description: string,
  keyHighlights: number,
  questions: string,
  status: string, 
  action: string,
}

const ELEMENT_DATA: PeriodicElement[] = [
  { 
  capsuleTitle: 'AWS Services', 
  auther: 'Linjith Kunnon', 
  publishDate: '2021-06-24', 
  tags: 'HTML', duration: 20.00, 
  category: 'Article', 
  description: 'Sed ut perspiciatis unde..', 
  keyHighlights: 5, 
  questions: 'yes', 
  status: 'Approved', 
  action: 'Edit' 
},

];

@Component({
  selector: 'app-admin-capsules',
  templateUrl: './admin-capsules.component.html',
  styleUrls: ['./admin-capsules.component.scss']
})
export class AdminCapsulesComponent implements OnInit {
  displayedColumns: string[] = ['capsuleTitle', 'auther', 'publishDate', 'tags', 'duration', 'category', 'description', 'keyHighlights', 'questions', 'status', 'action'];
  dataSource = ELEMENT_DATA;

  constructor() { }

  ngOnInit(): void {
  }

}
