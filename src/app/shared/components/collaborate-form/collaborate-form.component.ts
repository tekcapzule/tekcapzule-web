import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppSpinnerService } from '@app/core';
import { HelperService } from '@app/core/services/common/helper.service';

import { FeedbackApiService } from '@app/core/services/feedback-api/feedback-api.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-collaborate-form',
  templateUrl: './collaborate-form.component.html',
  styleUrls: ['./collaborate-form.component.scss'],
})
export class CollaborateFormComponent implements OnInit {
  feedbackFormGroup: FormGroup;
  @Input() pageType: string;
  
  constructor(
    private feedbackApi: FeedbackApiService,
    private spinner: AppSpinnerService,
    private messageService: MessageService,
    private fb: FormBuilder,
    private helperService: HelperService
  ) {}

  ngOnInit(): void {
    this.initFeedbackForm();
  }

  initFeedbackForm() {
    this.feedbackFormGroup = this.fb.group({
      emailId: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      subject: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  onCollabFormSubmit(): void {
    this.feedbackFormGroup.markAllAsTouched();
    if(this.feedbackFormGroup.valid) {
      this.spinner.show();
      this.feedbackApi.createFeedback(this.feedbackFormGroup.value).subscribe(_ => {
        this.spinner.hide();       
        this.messageService.add({ key: 'tc', severity: 'success', detail: 'Thank you for contacting us!' });
      }, err => {
        this.spinner.hide(); 
        this.feedbackFormGroup.reset();
        this.messageService.add(this.helperService.getInternalErrorMessage());
      });
    } else {
      this.messageService.add(this.helperService.getInternalErrorMessage());
    }
  }
}
