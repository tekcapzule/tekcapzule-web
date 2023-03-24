import { Component, OnInit, ViewChild } from '@angular/core';
import { finalize } from 'rxjs/operators';

import { CapsuleItem, CapsuleStatus, ColumnDef } from '@app/shared/models';
import { AdminCapsuleDataItem, AdminCapsuleDataItemImpl } from '@app/admin/models';
import { AppSpinnerService, CapsuleApiService, ChannelEvent, EventChannelService } from '@app/core';
import { Router } from '@angular/router';
import { DataTableComponent } from '@app/shared/components/data-table/data-table.component';

@Component({
  selector: 'app-admin-capsules',
  templateUrl: './admin-capsules.component.html',
  styleUrls: ['./admin-capsules.component.scss'],
})
export class AdminCapsulesComponent implements OnInit {
  adminCapsuleColumns: ColumnDef[] = [
    {
      columnId: 'title',
      columnName: 'Capsule Title',
      clazz: ['title-column', 'custom-title-col'],
    },
    {
      columnId: 'author',
      columnName: 'Summary By',
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
        if (tags) {
          return tags
            .map(
              tag => `
              <span class="badge badge-pill badge-light border border-secondary rounded-pill mr-1 px-2">
                ${tag}
              </span>`
            )
            .join('');
        } else {
          return '';
        }
      },
    },
    {
      columnId: 'duration',
      columnName: 'Duration (min)',
    },
    {
      columnId: 'category',
      columnName: 'Category',
      columnFormatter: (category: string) => {
        return category ?? 'n/a';
      },
    },
    {
      columnId: 'description',
      columnName: 'Description',
      clazz: ['custom-description-col'],
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

  @ViewChild('capsuleTable') capsuleTable: DataTableComponent;

  capsulePendingApproval: CapsuleItem[] = [];
  adminCapsulesData: AdminCapsuleDataItem[] = [];

  constructor(
    private capsuleApi: CapsuleApiService,
    private spinner: AppSpinnerService,
    private router: Router,
    private eventChannel: EventChannelService
  ) {}

  ngOnInit(): void {
    sessionStorage.removeItem('capsuleItem');
    this.showAdminCapsulesTab();
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

  editActionCallback(row: CapsuleItem): void {
    //console.log('editActionCallback: ', row);
    sessionStorage.setItem('capsuleItem', JSON.stringify(row));
    this.router.navigate(['/admin/editcapsule']);
  }

  deleteActionCallback(row: CapsuleItem): void {
    this.capsuleApi.disableCapsule(row.capsuleId).subscribe(capsule => {
      // console.log('capsule disabled : ', capsule)
    });
  }

  approveActionCallback(row: CapsuleItem): void {
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
  
  showAdminCapsulesTab(): void {
    this.eventChannel.publish({ event: ChannelEvent.SetAdminCapsulesNavTab });
  }

  onSearch(event) {
    this.capsuleTable.onSearch(event.currentTarget.value);
  }
}
