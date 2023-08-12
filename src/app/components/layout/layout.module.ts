
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SyncfusionModule } from 'src/app/shared/syncfusion/syncfusion.module';
import { LayoutComponent } from './layout.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { LayoutRoutingModule } from './layout-routing.module';



@NgModule({
  declarations: [
    LayoutComponent
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,

    // SyncFusion
    SyncfusionModule,

    // Material
    MaterialModule
  ],
  exports: [
    LayoutComponent
  ]
})
export class LayoutModule { }
