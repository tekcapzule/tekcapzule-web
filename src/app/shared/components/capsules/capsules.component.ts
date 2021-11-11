import { Component, Input, OnInit } from '@angular/core';
import { UserApiService } from '@app/core';
import { CapsuleItem } from '@app/shared';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-capsules',
  templateUrl: './capsules.component.html',
  styleUrls: ['./capsules.component.css']
})
export class CapsulesComponent implements OnInit {
  @Input() capsules: CapsuleItem[];
  constructor(private userApiService : UserApiService) { }
  userInfo: any ;

  ngOnInit(): void {
    this.userApiService.getUser().pipe(take(1)).subscribe(userInfo => this.userInfo = userInfo);
  }

  isBookmarked(capsule: CapsuleItem):boolean{
    if(!this.userInfo){
      return false;
    }
    return !!this.userInfo.bookmarks.find(capsuleId => capsuleId == capsule.capsuleId);
  }

}
