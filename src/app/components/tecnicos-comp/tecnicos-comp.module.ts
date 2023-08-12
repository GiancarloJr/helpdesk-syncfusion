import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TecnicosCompComponent } from './tecnicos-comp.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { ListBaseModule } from 'src/app/shared/components-base/list-base/list-base.module';
import { RouterModule, Routes } from '@angular/router';
import { TecnicoCadComponent } from './tecnico-cad/tecnico-cad.component';

const routes: Routes = [
  {
    path: '',
    component: TecnicosCompComponent
  }
];


@NgModule({
  declarations: [
    TecnicosCompComponent,
    TecnicoCadComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ListBaseModule,
    RouterModule.forChild(routes)
  ]
})
export class TecnicosCompModule { }
