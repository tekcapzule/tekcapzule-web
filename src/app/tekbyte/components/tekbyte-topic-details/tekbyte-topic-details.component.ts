import { Component, OnInit } from '@angular/core';
import { CapsuleItem } from '@app/shared/models';

@Component({
  selector: 'app-tekbyte-topic-detail',
  templateUrl: './tekbyte-topic-details.component.html',
  styleUrls: ['./tekbyte-topic-details.component.scss']
})
export class TekByteTopicDetailsPageComponent implements OnInit {
  firstThreeCapsules: CapsuleItem[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
