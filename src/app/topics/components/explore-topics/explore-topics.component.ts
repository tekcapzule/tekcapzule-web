import { AfterViewInit, Component, OnInit } from '@angular/core';
import { TopicApiService } from '@app/core/services/topic-api.service';
import { take } from 'rxjs/operators';
declare var twttr: any;
@Component({
  selector: 'app-explore-topics',
  templateUrl: './explore-topics.component.html',
  styleUrls: ['./explore-topics.component.scss'],
})
export class ExploreTopicsComponent implements OnInit, AfterViewInit {

  topics : any[]  = [];

  constructor(private topicApiService: TopicApiService) {}

  ngOnInit(): void {
    this.topicApiService.getAllTopics().pipe(take(1)).subscribe( topics =>{
      console.log(topics);
      this.topics = topics;
      
    })
  }

  ngAfterViewInit(): void {
    twttr.widgets.load();
  }
}
