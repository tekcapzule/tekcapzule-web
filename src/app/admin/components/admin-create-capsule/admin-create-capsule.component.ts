import { AfterViewInit, Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { CapsuleApiService, ChannelEvent, EventChannelService, AppSpinnerService } from '@app/core';
import { CreateCapsuleForm } from '@app/admin/models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-create-capsule',
  templateUrl: './admin-create-capsule.component.html',
  styleUrls: ['./admin-create-capsule.component.scss'],
})
export class AdminCreateCapsuleComponent implements OnInit, AfterViewInit {

  capsuleForm: FormGroup;
  createCapsuleForm= new CreateCapsuleForm();
  isCreateCapsuleSubmitted = false;
  pipe = new DatePipe('en-US');
  now = Date.now();
  responseBodySample = {
    topicCode: 'Cloud Computing',
    publishedDate: '10/10/2022',
    title: 'Block chain',
    imageUrl:
      'http://tekcapsule-web-dev.s3-website.us-east-2.amazonaws.com/assets/images/card-3.png',
    duration: 120,
    author: 'Linjith Kunnon',
    description:
      'Sed ut perspiciatis unde omnis iste natus error sit qsiuss voluptatem accusantium doloremque laudantium, sdda sdftotam rem aperiam, eaque ipsa quae ab illo quae ainventore veritatis et quasi architecto beatae vitae quia dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia uuntur magni dolores eos qui ratione voluptatem sequi. sed quia uuntur magni dolores eos qui ratione voluptatem sequi.',
    publisher: 'Medium',
    resourceUrl: 'url',
    type: 'ARTICLE',
    audience: 'ALL',
    level: 'ADVANCED',
    expiryDate: '10/10/2022',
    editorsPick: 1,
    tags: ['cld', 'cloud', 'compute', 'storage'],
  };

  constructor(
    private eventChannel: EventChannelService,
    private capsuleApi: CapsuleApiService,
    private appSpinnerService: AppSpinnerService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.capsuleForm = this.fb.group({
      topicCode: ['Cloud Computing', Validators.required],
      category: [''],
      publishedDate: [this.pipe.transform(this.now, 'dd/MM/yyyy'), Validators.required],
      title:  ['Block chain', Validators.required],
      imageUrl:  ['http://tekcapsule-web-dev.s3-website.us-east-2.amazonaws.com/assets/images/card-3.png', Validators.required],
      duration:  ['120', Validators.required],
      author:  ['Linjith Kunnon', Validators.required],
      description:  ['Sed ut perspiciatis unde omnis iste natus error sit qsiuss voluptatem accusantium doloremque laudantium, sdda sdftotam rem aperiam, eaque ipsa quae ab illo quae ainventore veritatis et quasi architecto beatae vitae quia dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia uuntur magni dolores eos qui ratione voluptatem sequi. sed quia uuntur magni dolores eos qui ratione voluptatem sequi.', Validators.required],
      publisher:  ['Medium', Validators.required],
      resourceURL:  ['url', Validators.required],
      type:  ['ARTICLE', Validators.required],
      audience:  ['ALL'],
      level:  ['ADVANCED', Validators.required],
      expiryDate:  ['10/10/2022', Validators.required],
      editorsPick:  ['1'],
      tags:  [ ['cld', 'cloud', 'compute', 'storage']]
    })
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.hideAdminNavTabs();
    });
  }

  onCreateCapsule(): void {
    console.log(' --->>>> ', this.capsuleForm.valid);
    console.log(' --->>>> ', this.capsuleForm.value);
    Object.keys(this.capsuleForm.controls).forEach(key => {
      console.log(key, this.capsuleForm.get(key).valid, this.capsuleForm.get(key).value);
    });
    if (this.capsuleForm.valid) {
      let requestBody = this.capsuleForm.value;
      requestBody.expiryDate = this.pipe.transform(this.now, 'dd/MM/yyyy');
      this.isCreateCapsuleSubmitted = false;
      this.appSpinnerService.show();
      requestBody.editorsPick = this.createCapsuleForm.editorsPick ? 1 : 0;
      console.log('request  ', requestBody);
      this.capsuleApi.createCapsule(requestBody).subscribe(data => {
        this.capsuleForm.reset();
        this.isCreateCapsuleSubmitted = true;
        this.appSpinnerService.hide();
      });
    }
  }

  showAdminCapsulesTab(): void {
    this.eventChannel.publish({ event: ChannelEvent.SetAdminCapsulesNavTab });
  }

  hideAdminNavTabs(): void {
    this.eventChannel.publish({ event: ChannelEvent.HideAdminNavTabs });
  }
}
