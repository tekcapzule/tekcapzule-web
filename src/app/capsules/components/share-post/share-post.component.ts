import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthStateService, CapsuleApiService } from '@app/core';
import { CapsuleItem } from '@app/shared/models';

@Component({
  selector: 'app-share-post',
  templateUrl: './share-post.component.html',
  styleUrls: ['./share-post.component.scss'],
})
export class SharePostComponent implements OnInit {
  @Input() isDialogVisible = false;
  @Output() dialogClosed = new EventEmitter();
  capsuleData: CapsuleItem;
  resourceUrl: string;
  desc: string;

  constructor(public authState: AuthStateService,
    private capsuleService: CapsuleApiService) {

  }

  ngOnInit(): void {
    this.capsuleData = {
      author: this.authState.getAwsUserInfo().username,
      description: '',
      resourceUrl: '',
      title: '',
      topicCode: '',
      type: '',

    }  
  }

  filterUpdate(topicCode) {
    console.log('topicCode -- ',topicCode);
  }

  onDialogClosed() {
    this.dialogClosed.emit();
  }

  onTypeChanged(type: string) {
    this.capsuleData.type = type;
  }

  createCapsule() {
    this.capsuleData.description = this.desc;
    this.capsuleData.resourceUrl = this.resourceUrl;
    this.capsuleService.createCapsule(this.capsuleData).subscribe(data => {
      console.log('data', data);
    }, err => {
      console.log('err', err);
    })
  }
}
