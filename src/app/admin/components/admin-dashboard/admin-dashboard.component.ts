import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AppSpinnerService, CapsuleApiService } from '@app/core';
import { CapsuleItem, NavTab } from '@app/shared/models';

@Component({
  selector: 'app-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
})
export class AdminDashboardComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<boolean>();
  capsulePendingApproval: CapsuleItem[] = [];
  isNavTabsHidden = false;
  activeTab = '';
  action = '';

  navTabs: NavTab[] = [
    { uniqueId: 'adminUser', navUrl: 'users', displayName: 'Users', icon: 'user-icon' },
    { uniqueId: 'adminSubscriptions', navUrl: 'subscriptions', displayName: 'Subscriptions', icon: 'subscribe-icon' },
    { uniqueId: 'adminFeedback', navUrl: 'feedback', displayName: 'Feedback', icon: 'feedback-icon' },
    { uniqueId: 'adminCapsules', navUrl: 'capsules', displayName: 'Capsules', icon: 'capsule-icon' },
    { uniqueId: 'adminCourses', navUrl: 'topics', displayName: 'Courses', icon: 'courses-icon' },
    { uniqueId: 'adminTekbytes', navUrl: 'feedback', displayName: 'Tekbytes', icon: 'tekbytes-icon' },
    { uniqueId: 'adminProduct', navUrl: 'capsules', displayName: 'Product (Mkt place)', icon: 'product-icon' },
    { uniqueId: 'adminDigests', navUrl: 'topics', displayName: 'Digests', icon: 'digest-icon' }
  ];

  constructor(
    private router: Router,
    private capsuleApi: CapsuleApiService,
    private spinner: AppSpinnerService,
    ) {}

  ngOnInit(): void {
    this.fetchPendingApprovalCapsules();
  }

  fetchPendingApprovalCapsules(refreshCache?: boolean): void {
    this.spinner.show();

    this.capsuleApi
      .getPendingApproval(refreshCache)
      .pipe(
        finalize(() => {
          this.spinner.hide();
        })
      )
      .subscribe(pendingCapsules => {
        this.capsulePendingApproval = pendingCapsules;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  gotoNav(url): void {
    this.router.navigateByUrl('admin/' + url);
  }
 
}
