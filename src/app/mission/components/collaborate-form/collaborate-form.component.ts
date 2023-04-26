import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppSpinnerService } from '@app/core';

import { FeedbackApiService } from '@app/core/services/feedback-api/feedback-api.service';
import { CollaborateForm } from '@app/mission/models/collaborate-form.model';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-collaborate-form',
  templateUrl: './collaborate-form.component.html',
  styleUrls: ['./collaborate-form.component.scss'],
})
export class CollaborateFormComponent implements OnInit {
  feedbackFormGroup: FormGroup;

  constructor(
    private feedbackApi: FeedbackApiService,
    private appSpinnerService: AppSpinnerService,
    private messageService: MessageService,
    private fb: FormBuilder
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
      this.appSpinnerService.show();
      this.feedbackApi.createFeedback(this.feedbackFormGroup.value).subscribe(_ => {
        this.feedbackFormGroup.reset();
        this.appSpinnerService.hide();        
        this.messageService.add({ key: 'tc', severity: 'success', summary: 'Success', detail: 'We’re so happy to hear from you! Thank you for your valuable feedback.' });
      }, err => {
        this.messageService.add({ key: 'tc', severity: 'error', summary: 'Error', detail: 'Something Went wrong! Please try after sometime.' });
      });
    } else {
      this.messageService.add({ key: 'tc', severity: 'error', summary: 'Error', detail: 'Complete the form before submit' });
    }
  }
}
