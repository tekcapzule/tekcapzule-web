import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { DataTableComponent } from './components/data-table/data-table.component';
import { LoginComponent } from './components/login-component/login.component';
import { AmplifyUIAngularModule } from '@aws-amplify/ui-angular';
import { AmplifyService } from 'aws-amplify-angular';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    DataTableComponent,
    LoginComponent
  ],
  imports: [
    AmplifyUIAngularModule,
    CommonModule,
    RouterModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    DataTableComponent
  ],
  providers: [
    AmplifyService
  ]
})
export class SharedModule { }
