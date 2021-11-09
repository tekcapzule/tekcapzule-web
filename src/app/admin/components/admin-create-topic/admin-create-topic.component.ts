import { Component, OnInit } from '@angular/core';

import { ChannelEvent, EventChannelService, TopicApiService } from '@app/core';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-admin-create-topic',
  templateUrl: './admin-create-topic.component.html',
  styleUrls: ['./admin-create-topic.component.scss'],
})
export class AdminCreateTopicComponent implements OnInit {
  topicDetails = {
    "code": "",
    "category":"",
    "name": "",
    "description": "",
    "imageUrl": "",
    "aliases": [
      "", ""
    ],
    "keyHighlights": [
      "", ""
    ],
    "capsules": [
      "", ""
    ]
  }

  constructor(private eventChannel: EventChannelService,
    private topicApiService: TopicApiService) { }

  ngOnInit(): void { }

  activateFirstNavTab(): void {
    this.eventChannel.publish({ event: ChannelEvent.SetActiveTab });
  }

  onSubmit(): void {
    const clearEmptyElementsInArray = (array: string[]) => array.filter(e => e);
    this.topicDetails.aliases = clearEmptyElementsInArray(this.topicDetails.aliases);
    this.topicDetails.keyHighlights = clearEmptyElementsInArray(this.topicDetails.keyHighlights);
    this.topicDetails.capsules = clearEmptyElementsInArray(this.topicDetails.capsules);
    console.log(this.topicDetails);
    this.activateFirstNavTab();
    this.topicApiService.createTopic(this.topicDetails).pipe(take(1)).subscribe(res => console.log(this.topicDetails, res));
    
  }

  trackByIdx(index: number, obj: any): any {
    return index;
  }

  addRow(rowType): void {
    this.topicDetails[rowType].unshift("");
  }

  deleteRow(rowType, index): void {
    this.topicDetails[rowType].splice(index, 1);
  }

  isFormValid() {
    return this.topicDetails.category && this.topicDetails.code && this.topicDetails.description && this.topicDetails.name;
  }
}
