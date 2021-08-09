export interface ColumnDef {
  columnId: string;
  columnName: string;
  clazz?: string[];
  actionItems?: ActionItem[];
  columnFormatter?: (value: any) => string;
}

export interface ActionItem {
  actionId: string;
  iconUrl: string;
  actionCallback: (row: any) => void;
}
