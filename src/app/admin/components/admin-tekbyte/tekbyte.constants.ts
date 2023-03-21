import { ColumnDef } from '@app/shared/models';

export const   adminTekByteColumns: ColumnDef[] = [
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
    columnId: 'aliases',
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
    disableSort: true
  },
  {
    columnId: 'action',
    columnName: 'Action',
    clazz: ['action-column'],
    actionItems: [
      {
        actionId: 'edit',
        iconUrl: '/assets/images/action.svg',
        //actionCallback: this.editActionCallback.bind(this),
      },
      {
        actionId: 'delete',
        iconUrl: '/assets/images/delete.svg',
        //actionCallback: this.deleteActionCallback.bind(this),
      },
    ],
  },
];
