import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';

import { CapsuleItem, CapsuleStatus, ColumnDef } from '@app/shared/models';
import { AdminCapsuleDataItem, AdminCapsuleDataItemImpl } from '@app/admin/models';
import { AppSpinnerService, CapsuleApiService } from '@app/core';

@Component({
  selector: 'app-admin-capsules',
  templateUrl: './admin-capsules.component.html',
  styleUrls: ['./admin-capsules.component.scss'],
})
export class AdminCapsulesComponent implements OnInit {
  adminCapsuleColumns: ColumnDef[] = [
    {
      columnId: 'capsuleTitle',
      columnName: 'Capsule Title',
      clazz: ['title-column', 'custom-title-col'],
    },
    {
      columnId: 'author',
      columnName: 'Author',
    },
    {
      columnId: 'publishedDate',
      columnName: 'Published Date',
    },
    {
      columnId: 'tags',
      columnName: 'Tags',
      disableSort: true,
      columnFormatter: (tags: string[]) => {
        return tags
          .map(
            tag => `
              <span class="badge badge-pill badge-light border border-secondary rounded-pill mr-1 px-2">
                ${tag}
              </span>`
          )
          .join('');
      },
    },
    {
      columnId: 'duration',
      columnName: 'Duration (min)',
    },
    {
      columnId: 'category',
      columnName: 'Category',
    },
    {
      columnId: 'description',
      columnName: 'Description',
      clazz: ['custom-description-col'],
    },
    {
      columnId: 'questions',
      columnName: 'Questions',
    },
    {
      columnId: 'status',
      columnName: 'Status',
      disableSort: true,
      columnFormatter: (value: CapsuleStatus) => {
        if (value === CapsuleStatus.ACTIVE) {
          return `<span class='text-success'>${value}</span>`;
        } else if (value === CapsuleStatus.SUBMITTED) {
          return `<span class='text-warning'>${value}</span>`;
        } else if (value === CapsuleStatus.EXPIRED) {
          return `<span class='text-danger'>${value}</span>`;
        } else {
          return `<span class='text-muted'>${value}</span>`;
        }
      },
    },
    {
      columnId: 'action',
      columnName: 'Action',
      clazz: ['action-column'],
      actionItems: [
        {
          actionId: 'edit',
          iconUrl: '/assets/images/action.svg',
          actionCallback: this.editActionCallback.bind(this),
        },
        {
          actionId: 'delete',
          iconUrl: '/assets/images/delete.svg',
          actionCallback: this.deleteActionCallback.bind(this),
        },
        {
          actionId: 'approve',
          iconUrl: '/assets/images/check.svg',
          actionCallback: this.approveActionCallback.bind(this),
        },
      ],
    },
  ];

  capsulePendingApproval: CapsuleItem[] = [];

  adminCapsulesData: AdminCapsuleDataItem[] = [];

  constructor(private capsuleApi: CapsuleApiService, private spinner: AppSpinnerService) {}

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
        this.adminCapsulesData = this.capsulePendingApproval.map(
          capsule =>
            new AdminCapsuleDataItemImpl(
              capsule.title,
              capsule.author,
              capsule.publishedDate,
              capsule.tags,
              capsule.duration,
              capsule.type,
              capsule.description,
              capsule.quizzes ? capsule.quizzes.length : 0,
              capsule.status,
              capsule.capsuleId
            )
        );
      });
  }

  editActionCallback(row: AdminCapsuleDataItem): void {
    // console.log('editActionCallback: ', row);
  }

  deleteActionCallback(row: AdminCapsuleDataItem): void {
    this.capsuleApi.disableCapsule(row.capsuleId).subscribe(capsule => {
      // console.log('capsule disabled : ', capsule)
    });
  }

  approveActionCallback(row: AdminCapsuleDataItem): void {
    this.spinner.show();

    this.capsuleApi
      .approveCapsule(row.capsuleId)
      .pipe(
        finalize(() => {
          this.spinner.hide();
        })
      )
      .subscribe(() => {
        this.fetchPendingApprovalCapsules(true);
      });
  }
}
