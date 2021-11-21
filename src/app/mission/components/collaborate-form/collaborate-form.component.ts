import { Component, OnInit } from '@angular/core';

import { FeedbackApiService } from '@app/core/services/feedback-api/feedback-api.service';
import { CollaborateForm } from '@app/mission/models/collaborate-form.model';

@Component({
  selector: 'app-collaborate-form',
  templateUrl: './collaborate-form.component.html',
  styleUrls: ['./collaborate-form.component.scss'],
})
export class CollaborateFormComponent implements OnInit {
  constructor(private feedbackApi: FeedbackApiService) {}

  collaborateForm = new CollaborateForm();

  ngOnInit(): void {}

  isFormValid(): boolean {
    return !Object.values(this.collaborateForm).some(x => x === '');
  }

  onCollabFormSubmit(): void {
    this.feedbackApi.createFeedback(this.collaborateForm).subscribe(_ => {
      this.collaborateForm = new CollaborateForm();
    });
  }
}
