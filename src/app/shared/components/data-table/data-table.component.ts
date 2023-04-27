import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { ColumnDef } from '@app/shared/models';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
})
export class DataTableComponent implements OnInit, AfterViewInit, OnChanges {
  @ViewChild(MatPaginator) matPaginator: MatPaginator;
  @ViewChild(MatSort) matSort: MatSort;

  @Input() columns: ColumnDef[] = [];
  @Input() data: any[] = [];

  columnIds: string[] = [];
  dataSource = new MatTableDataSource<any>([]);

  constructor() {}

  ngOnInit(): void {
    if (this.columns && this.columns.length > 0) {
      this.columnIds = this.columns.map(col => col.columnId);
    }
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.matPaginator;
    this.dataSource.sort = this.matSort;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes.data) {
      this.dataSource.data = this.data;
    }
  }

  isDataSourceEmpty(): boolean {
    return this.dataSource.data && this.dataSource.data.length === 0;
  }

  onSearch(value: string) {
    this.dataSource.filter = value.trim().toLowerCase();
  }
}
