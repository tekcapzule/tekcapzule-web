import { Component, OnInit } from '@angular/core';

import { ColumnDef } from '@app/shared';

export interface AdminTopicDataItem {
  topicName: string;
  description: string;
  tags: string[];
  keyHighlights: number;
  status: AdminTopicStatus;
}

export enum AdminTopicStatus {
  Success = 'SUCCESS',
  Failure = 'FAILURE',
}

@Component({
  selector: 'app-admin-topics',
  templateUrl: './admin-topics.component.html',
  styleUrls: ['./admin-topics.component.scss'],
})
export class AdminTopicsComponent implements OnInit {
  adminTopicColumns: ColumnDef[] = [
    {
      columnId: 'topicName',
      columnName: 'Topic Name',
      clazz: ['title-column'],
    },
    {
      columnId: 'description',
      columnName: 'Description',
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
      columnId: 'status',
      columnName: 'Status',
      htmlFormatter: (value: AdminTopicStatus) => {
        if (value === AdminTopicStatus.Failure) {
          return '<img class="status-icon" src="./assets/images/cross.svg" />';
        } else {
          return '<img class="status-icon" src="./assets/images/check.svg" />';
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

  adminTopicsData: AdminTopicDataItem[] = [
    {
      topicName: 'AWS Services',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      tags: ['Cloud', 'AI/ML'],
      keyHighlights: 5,
      status: AdminTopicStatus.Success,
    },
    {
      topicName: 'AWS Services',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      tags: ['Cloud', 'AI/ML'],
      keyHighlights: 5,
      status: AdminTopicStatus.Failure,
    },
  ];

  constructor() {}

  ngOnInit(): void {}

  editActionCallback(row: AdminTopicDataItem): void {
    console.log('editActionCallback: ', row);
  }

  deleteActionCallback(row: AdminTopicDataItem): void {
    console.log('deleteActionCallback: ', row);
  }
}
