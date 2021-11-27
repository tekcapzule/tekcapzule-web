import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';

import { ColumnDef } from '@app/shared/models';
import { TopicApiService } from '@app/core';
import { AdminTopicDataItem, AdminTopicDataItemImpl, AdminTopicStatus } from '@app/admin/models';
import { Router } from '@angular/router';

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
      clazz: ['title-column', 'custom-title-col'],
    },
    {
      columnId: 'description',
      columnName: 'Description',
      clazz: ['custom-description-col'],
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
      columnId: 'keyHighlights',
      columnName: 'Key Highlights',
      disableSort: true,
      columnFormatter: (value: number) => {
        return `
          <span class="badge badge-pill badge-light border border-secondary rounded-pill px-2">
            ${value}
          </span>`;
      },
    },
    {
      columnId: 'status',
      columnName: 'Status',
      disableSort: true,
      columnFormatter: (value: AdminTopicStatus) => {
        if (value === AdminTopicStatus.Failure) {
          return '<img class="status-icon" src="/assets/images/cross.svg" />';
        } else {
          return '<img class="status-icon" src="/assets/images/check.svg" />';
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
      ],
    },
  ];

  adminTopicsData: AdminTopicDataItem[] = [];

  constructor(private topicApi: TopicApiService, private router: Router) {}

  ngOnInit(): void {
    this.topicApi
      .getAllTopics()
      .pipe(
        map(topics =>
          topics.map(
            topic =>
              new AdminTopicDataItemImpl(
                topic.name,
                topic.description,
                topic.aliases,
                topic.keyHighlights,
                topic.status,
                topic.code
              )
          )
        )
      )
      .subscribe(topic => {
        this.adminTopicsData = topic;
      });
  }

  editActionCallback(row: AdminTopicDataItem): void {
    this.router.navigate(['/admin/edittopic', row.code]);
  }

  deleteActionCallback(row: AdminTopicDataItem): void {
    if (row.status !== AdminTopicStatus.Failure) {
      this.topicApi.disableTopic(row.code).subscribe();
      row.status = AdminTopicStatus.Failure;
    }
  }
}
