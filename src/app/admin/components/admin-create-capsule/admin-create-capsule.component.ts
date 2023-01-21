import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { CapsuleApiService, ChannelEvent, EventChannelService } from '@app/core';
import { CreateCapsuleForm } from '../models/admin-form.model';
import { AppSpinnerService } from '@app/core';

@Component({
  selector: 'app-admin-create-capsule',
  templateUrl: './admin-create-capsule.component.html',
  styleUrls: ['./admin-create-capsule.component.scss'],
})
export class AdminCreateCapsuleComponent implements OnInit {
  constructor(
    private eventChannel: EventChannelService,
    private capsuleApi: CapsuleApiService,
    private appSpinnerService: AppSpinnerService,
    private router: Router) {}

    createCapsuleForm = new CreateCapsuleForm();
    isCreateCapsuleSubmitted = false;
    pipe = new DatePipe('en-US');
    now = Date.now();
    
   responseBodySample = {
      topicCode: "Cloud Computing",
      publishedDate: "10/10/2022",
      title: "Block chain",
      imageUrl: "http://tekcapsule-web-dev.s3-website.us-east-2.amazonaws.com/assets/images/card-3.png",
      duration: 120,
      author: "Linjith Kunnon",
      description: "Sed ut perspiciatis unde omnis iste natus error sit qsiuss voluptatem accusantium doloremque laudantium, sdda sdftotam rem aperiam, eaque ipsa quae ab illo quae ainventore veritatis et quasi architecto beatae vitae quia dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia uuntur magni dolores eos qui ratione voluptatem sequi. sed quia uuntur magni dolores eos qui ratione voluptatem sequi.",
      publisher: "Medium",
      resourceUrl: "url",
      type: "ARTICLE",
      audience: "ALL",
      level: "ADVANCED",
      expiryDate: "10/10/2022",
      editorsPick: 1,
      tags: [
          "cld","cloud", "compute","storage"
        ]
    
    }

  ngOnInit() {
    this.createCapsuleForm.topicCode = '';
    this.createCapsuleForm.editorsPick = 1;
    this.createCapsuleForm.duration = 0;
    this.createCapsuleForm.audience = '';
    this.createCapsuleForm.tags = ["cld","cloud", "compute","storage"];
    this.createCapsuleForm.publishedDate = this.pipe.transform(this.now, 'dd/MM/yyyy');
  }
  isFormValid() {
    return (
      this.createCapsuleForm.topicCode &&
      this.createCapsuleForm.title &&
      this.createCapsuleForm.imageUrl &&
      this.createCapsuleForm.duration&&
      this.createCapsuleForm.author&&
      this.createCapsuleForm.description&&
      this.createCapsuleForm.publisher &&
      this.createCapsuleForm.resourceURL&&
      this.createCapsuleForm.type&&
      this.createCapsuleForm.audience&&
      this.createCapsuleForm.level&&
      this.createCapsuleForm.expiryDate
    );
  }

  onCreateCapsule(): void {
    if(this.isFormValid){
      this.createCapsuleForm.expiryDate = this.pipe.transform(this.now, 'dd/MM/yyyy');
      this.isCreateCapsuleSubmitted = false;
      this.appSpinnerService.show();
      this.createCapsuleForm.editorsPick = this.createCapsuleForm.editorsPick ? 1 : 0;
      console.log(this.createCapsuleForm)
      this.capsuleApi.createCapsule(this.createCapsuleForm).subscribe(_ => {
        this.createCapsuleForm = new CreateCapsuleForm();
        this.isCreateCapsuleSubmitted = true;
        this.appSpinnerService.hide();
      });
    }
  }

  activateFirstNavTab(): void {
    this.eventChannel.publish({ event: ChannelEvent.SetActiveAdminTab });
  }
}
