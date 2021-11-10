import { Component, OnInit } from '@angular/core';
import { FeedbackApiService } from '@app/core/services/feedback-api/feedback-api.service';
import { CollaborateForm } from '@app/mission/models/collaborate-form.model';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-collaborate-form',
  templateUrl: './collaborate-form.component.html',
  styleUrls: ['./collaborate-form.component.scss'],
})
export class CollaborateFormComponent implements OnInit {
  constructor(private feedbackApiService: FeedbackApiService) { }

  collaborateForm = new CollaborateForm()

  ngOnInit(): void { }

  isFormValid(): boolean {
    return !Object.values(this.collaborateForm).some(x => x == '');
  }

  onCollabFormSubmit(): void {
    this.feedbackApiService.createFeedback(this.collaborateForm).pipe(take(1)).subscribe(_ => {
      this.collaborateForm = new CollaborateForm();
    });

  }
}
