import { Component, OnInit } from '@angular/core';
import { ColumnDef } from '@app/shared';

export enum AdminCapsuleStatus {
  Approved = 'Approved',
  Rejected = 'Rejected',
  Pending = 'Pending',
  Processing = 'Processing',
  Active = 'Active',
  Disabled = 'Disabled',
}

export interface AdminCapsuleDataItem {
  capsuleTitle: string;
  author: string;
  publishedDate: string;
  tags: string[];
  duration: string;
  category: string;
  description: string;
  keyHighlights: number;
  questions: string;
  status: AdminCapsuleStatus;
}

export interface PeriodicElement {
  capsuleTitle: string;
  auther: string;
  publishDate: string;
  tags: string;
  duration: number;
  category: string;
  description: string;
  keyHighlights: number;
  questions: string;
  status: string;
  action: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    capsuleTitle: 'AWS Services',
    auther: 'Linjith Kunnon',
    publishDate: '2021-06-24',
    tags: 'HTML',
    duration: 20.0,
    category: 'Article',
    description: 'Sed ut perspiciatis unde..',
    keyHighlights: 5,
    questions: 'yes',
    status: 'Approved',
    action: 'Edit',
  },
];

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
      htmlFormatter: (tags: string[]) => {
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
      htmlFormatter: (value: number) => {
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
      htmlFormatter: (value: AdminCapsuleStatus) => {
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
          iconUrl: './assets/images/action.svg',
          actionCallback: this.editActionCallback,
        },
        {
          actionId: 'delete',
          iconUrl: './assets/images/delete.svg',
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
