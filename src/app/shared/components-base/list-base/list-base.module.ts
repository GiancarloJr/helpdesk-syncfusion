import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListBaseComponent } from './list-base.component';
import { SyncfusionModule } from '../../syncfusion/syncfusion.module';
import { MaterialModule } from '../../material/material.module';
import { AuthInterceptorProvider } from 'src/app/interceptors/auth.interceptor';



@NgModule({
  declarations: [
    ListBaseComponent
  ],
  imports: [
    CommonModule,
    SyncfusionModule,
    MaterialModule
  ],
  exports: [
    ListBaseComponent
  ]
})
export class ListBaseModule { }
