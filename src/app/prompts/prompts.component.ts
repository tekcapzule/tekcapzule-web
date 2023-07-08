import { Component } from '@angular/core';
import { AppSpinnerService } from '@app/core';

@Component({
  selector: 'app-prompts',
  templateUrl: './prompts.component.html',
  styleUrls: ['./prompts.component.scss']
})
export class PromptsComponent {

  constructor(private spinner: AppSpinnerService) {}


}
