import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@app/shared';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [ProductsComponent],
  imports: [CommonModule, SharedModule, ProductsRoutingModule, ToastModule],
})
export class ProductsModule { }
