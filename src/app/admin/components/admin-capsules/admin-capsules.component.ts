import { Component, OnInit } from '@angular/core';

import { ColumnDef } from '@app/shared';
import { AdminCapsuleStatus, AdminCapsuleDataItem } from '@app/admin/models';

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
      clazz: ['title-column'],
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
    },
    {
      columnId: 'keyHighlights',
      columnName: 'Key Highlights',
      columnFormatter: (value: number) => {
        return `
          <span class="badge badge-pill badge-light border border-secondary rounded-pill px-2">
            ${value}
          </span>`;
      },
    },
    {
      columnId: 'questions',
      columnName: 'Questions',
    },
    {
      columnId: 'status',
      columnName: 'Status',
      columnFormatter: (value: AdminCapsuleStatus) => {
        if (value === AdminCapsuleStatus.Approved || value === AdminCapsuleStatus.Active) {
          return `<span class='text-success'>${value}</span>`;
        } else if (
          value === AdminCapsuleStatus.Pending ||
          value === AdminCapsuleStatus.Processing
        ) {
          return `<span class='text-warning'>${value}</span>`;
        } else if (value === AdminCapsuleStatus.Rejected) {
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
          actionCallback: this.editActionCallback,
        },
        {
          actionId: 'delete',
          iconUrl: '/assets/images/delete.svg',
          actionCallback: this.deleteActionCallback,
        },
      ],
    },
  ];

  adminCapsulesData: AdminCapsuleDataItem[] = [
    {
      capsuleTitle: 'Frontend Master',
      author: 'Akhil',
      publishedDate: '2021-06-30',
      tags: ['JavaScript', 'Angular'],
      duration: '35:00',
      category: 'Article',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      keyHighlights: 10,
      questions: 'N/A',
      status: AdminCapsuleStatus.Approved,
    },
    {
      capsuleTitle: 'Software Architecture Patterns',
      author: 'Linjith',
      publishedDate: '2021-06-30',
      tags: ['Microservices', 'K8s'],
      duration: '25:00',
      category: 'Article',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      keyHighlights: 6,
      questions: 'N/A',
      status: AdminCapsuleStatus.Active,
    },
    {
      capsuleTitle: 'Frontend Master',
      author: 'Akhil',
      publishedDate: '2021-06-30',
      tags: ['JavaScript', 'Angular'],
      duration: '35:00',
      category: 'Article',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      keyHighlights: 10,
      questions: 'N/A',
      status: AdminCapsuleStatus.Processing,
    },
    {
      capsuleTitle: 'Software Architecture Patterns',
      author: 'Linjith',
      publishedDate: '2021-06-30',
      tags: ['Microservices', 'K8s'],
      duration: '25:00',
      category: 'Article',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      keyHighlights: 6,
      questions: 'N/A',
      status: AdminCapsuleStatus.Pending,
    },
    {
      capsuleTitle: 'Software Architecture Patterns',
      author: 'Linjith',
      publishedDate: '2021-06-30',
      tags: ['Microservices', 'K8s'],
      duration: '25:00',
      category: 'Article',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      keyHighlights: 6,
      questions: 'N/A',
      status: AdminCapsuleStatus.Rejected,
    },
  ];

  constructor() {}

  ngOnInit(): void {}

  editActionCallback(row: AdminCapsuleDataItem): void {
    console.log('editActionCallback: ', row);
  }

  deleteActionCallback(row: AdminCapsuleDataItem): void {
    console.log('deleteActionCallback: ', row);
  }
}
