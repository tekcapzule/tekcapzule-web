import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CapsuleApiService, ChannelEvent, EventChannelService, AppSpinnerService } from '@app/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { CapsuleItem } from '@app/shared/models';

@Component({
  selector: 'app-admin-create-capsule',
  templateUrl: './admin-create-capsule.component.html',
  styleUrls: ['./admin-create-capsule.component.scss'],
})
export class AdminCreateCapsuleComponent implements OnInit, AfterViewInit {

  capsuleFormGroup: FormGroup;
  isCreateCapsuleSubmitted: boolean;
  isEditMode: boolean;
  editCapsule: CapsuleItem;
  items = ['cloud'];
  /*responseBodySample = {
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
  };*/

  constructor(
    private eventChannel: EventChannelService,
    private capsuleApi: CapsuleApiService,
    private spinner: AppSpinnerService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.createCapsuleForm();
    this.getMetadata();
    if (this.router.url.includes('editcapsule')) {
      this.isEditMode = true;
      this.editCapsule = JSON.parse(sessionStorage.getItem('capsuleItem'));
      this.capsuleFormGroup.patchValue(this.editCapsule);
    }
  }

  getMetadata() {
    this.capsuleApi.getMetadata().subscribe(data => {
      console.log(' mettatadda --- ',data);
    });
  }

  createCapsuleForm() {
    this.capsuleFormGroup = this.fb.group({
      capsuleId: [''],
      topicCode: ['', Validators.required],
      category: [''],
      publishedDate: [moment().format('DD/MM/YYYY'), Validators.required],
      title: ['', Validators.required],
      imageUrl: ['', Validators.required],
      duration: [, Validators.required],
      author: [, Validators.required],
      description: ['', Validators.required],
      publisher: ['', Validators.required],
      resourceURL: ['', Validators.required],
      type: ['', Validators.required],
      audience: [''],
      level: ['', Validators.required],
      expiryDate: [moment().format('DD/MM/YYYY'), Validators.required],
      expiryDateDisp: [7, Validators.required],
      editorsPick: [true],
      tags: ['']
    })
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.hideAdminNavTabs();
    });
  }

  onCreateCapsule(): void {
    // Testing Purpose
    Object.keys(this.capsuleFormGroup.controls).forEach(key => {
      if(!this.capsuleFormGroup.get(key).valid) {
        console.log(key, this.capsuleFormGroup.get(key).valid, this.capsuleFormGroup.get(key).value);
      }
    });
    this.capsuleFormGroup.markAllAsTouched();
    if (this.capsuleFormGroup.valid) {
      this.spinner.show();
      let requestBody = this.capsuleFormGroup.value;
      requestBody.expiryDate = moment().add(requestBody.expiryDateDisp, 'days').format("DD/MM/YYYY");
      requestBody.editorsPick = requestBody.editorsPick ? 1 : 0;
      this.isCreateCapsuleSubmitted = false;
      if(this.editCapsule) {
        this.updateCapsule(requestBody);
      } else {
        this.createCapsule(requestBody);
      }
    }
  }

  updateCapsule(requestBody) {
    this.capsuleApi.updateCapsule(requestBody).subscribe(data => {
      this.isCreateCapsuleSubmitted = true;
      this.spinner.hide();
    }, error => {
      console.log('ERR --- ',error);
      this.spinner.hide();
    });
  }

  createCapsule(requestBody) {
    this.capsuleApi.createCapsule(requestBody).subscribe(data => {
      this.capsuleFormGroup.reset();
      this.isCreateCapsuleSubmitted = true;
      this.spinner.hide();
    }, error => {
      console.log('ERR --- ',error);
      this.spinner.hide();
    });
  }

  showAdminCapsulesTab(): void {
    this.eventChannel.publish({ event: ChannelEvent.SetAdminCapsulesNavTab });
  }

  hideAdminNavTabs(): void {
    this.eventChannel.publish({ event: ChannelEvent.HideAdminNavTabs });
  }
  
  public onTagEdited(item) {
    console.log('tag edited: current value is ' + item);
  }

}
