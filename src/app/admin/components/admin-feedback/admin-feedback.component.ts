import { Component, OnInit } from '@angular/core';
import { ColumnDef } from '@app/shared';
import { AdminFeedbackDataItem } from '@app/admin/models';

@Component({
  selector: 'app-admin-feedback',
  templateUrl: './admin-feedback.component.html',
  styleUrls: ['./admin-feedback.component.scss'],
})
export class AdminFeedbackComponent implements OnInit {
  adminFeedbackColumns: ColumnDef[] = [
    {
      columnId: 'firstName',
      columnName: 'First Name',
      clazz: ['title-column'],
    },
    {
      columnId: 'lastName',
      columnName: 'Last Name',
      clazz: ['title-column'],
    },
    {
      columnId: 'email',
      columnName: 'Email',
    },
    {
      columnId: 'subject',
      columnName: 'Subject',
    },
    {
      columnId: 'action',
      columnName: 'Action',
      clazz: ['action-column'],
      actionItems: [
        {
          actionId: 'email',
          iconUrl: '/assets/images/mail.svg',
          actionCallback: this.actionCallback,
        },
      ],
    },
  ];

  adminFeebbackData: AdminFeedbackDataItem[] = [
    {
      firstName: 'Akhil',
      lastName: 'PB',
      email: 'akhilpb@apache.org',
      subject: 'Tekcapsule Team',
    },
    {
      firstName: 'Linjith',
      lastName: 'Kunnon',
      email: 'linjithkunnon@gmail.com',
      subject: 'Tekcapsule Team',
    },
  ];

  constructor() {}

  ngOnInit(): void {}

  actionCallback(row: AdminFeedbackDataItem): void {
    console.log('actionCallback: ', row);
  }
}
