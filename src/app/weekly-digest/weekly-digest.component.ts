import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AppSpinnerService } from '@app/core';
import { HelperService } from '@app/core/services/common/helper.service';
import { SkillStudioApiService } from '@app/core/services/skill-studio-api/skill-studio-api.service';
import { ILearningMaterial } from '@app/shared/models/skill-studio-item.model';

@Component({
  selector: 'app-weekly-digest',
  templateUrl: './weekly-digest.component.html',
  styleUrls: ['./weekly-digest.component.scss'],
})
export class WeeklyDigestComponent implements OnInit {
  digest: any = {};
  categories: string[] = [];
  subscriberFormGroup: FormGroup;

  learningList: ILearningMaterial[] = [];
  filteredList: ILearningMaterial[] = [];
  selectedTopic: string[] = [];
  selectedPayments: any[] = [];
  searchText: string;  
  isFilterVisible = true;
  isMobileResolution: boolean;

  constructor(
    public spinner: AppSpinnerService,
    private skillApi: SkillStudioApiService,
    private fb: FormBuilder,
    private helperService: HelperService
  ) {}

  ngOnInit(): void {
    this.spinner.show();
    this.subscriberFormGroup = this.fb.group({
      emailId: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
    });
    this.getWeeklyDigest();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event = null) {
    this.isMobileResolution = window.innerWidth < 992 ? true : false;
    this.helperService.setMobileResolution(this.isMobileResolution);
    if (this.isMobileResolution) {
      this.isFilterVisible = false;
    }
  }


  getWeeklyDigest() {
    this.skillApi.getAllLearning().subscribe(data => {
      const newsletter = this.helperService.getLearningMtsByType(data, 'Newsletter');
      this.learningList = [...newsletter.currentList];
      this.filteredList = [...newsletter.currentList];
      const podcast = this.helperService.getLearningMtsByType(data, 'Podcast');
      this.learningList.push(...podcast.currentList);
      this.filteredList.push(...podcast.currentList);
      this.seperateCategories()
      this.spinner.hide();
    });
  }

  seperateCategories() {
    this.digest = [];
    this.filteredList.forEach(item => {
      if (!this.digest[item.learningMaterialType]) {
        this.digest[item.learningMaterialType] = [];
      }
      this.digest[item.learningMaterialType].push(item);
    });
    this.categories = Object.keys(this.digest).sort();
  }

  onFilterUpdate(event) {
    this.selectedTopic = event.topic;
    this.selectedPayments = event.payments;
    this.productFilter();
  }
  
  productFilter(isSearchCall = false) {
    this.filteredList = this.helperService.productFilter(this.learningList, this.selectedTopic,
      this.selectedPayments, []);
    if (!isSearchCall) {
      this.onSearch(true);
      this.seperateCategories();
    }
  }

  onSearch(isFiltered = false): void {
    if (!isFiltered) {
      this.productFilter(true);
    }
    this.helperService.searchByText(this.filteredList, this.searchText);
    this.seperateCategories();
  }
}
