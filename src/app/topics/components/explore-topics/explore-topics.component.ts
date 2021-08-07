import { AfterViewInit, Component, OnInit } from '@angular/core';
declare var twttr: any;
@Component({
  selector: 'app-explore-topics',
  templateUrl: './explore-topics.component.html',
  styleUrls: ['./explore-topics.component.scss']
})
export class ExploreTopicsComponent implements OnInit, AfterViewInit {

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    twttr.widgets.load();
}
}
