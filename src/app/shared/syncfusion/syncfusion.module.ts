import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppBarModule, SidebarModule } from '@syncfusion/ej2-angular-navigations';

import { ContextMenuService, FilterService, GridModule, PageService, PdfExportService } from '@syncfusion/ej2-angular-grids';

@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    AppBarModule,
    SidebarModule,
    GridModule
  ],
  exports: [
    AppBarModule,
    SidebarModule,
    GridModule
  ],
  providers: [
    PageService, PdfExportService,FilterService,ContextMenuService
  ]
})
export class SyncfusionModule { }
