import { Component, OnInit } from '@angular/core';
import { CapsuleItem } from '@app/shared/models';

@Component({
  selector: 'app-tekbyte-page',
  templateUrl: './topic-details.component.html',
  styleUrls: ['./topic-details.component.scss']
})
export class TopicDetailsPageComponent implements OnInit {
  firstThreeCapsules: CapsuleItem[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
