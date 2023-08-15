import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { ListBaseModule } from 'src/app/shared/components-base/list-base/list-base.module';
import { RouterModule, Routes } from '@angular/router';
import { ChamadosCompComponent } from './chamados-comp.component';
import { ChamadoCadComponent } from './chamado-cad/chamado-cad.component';

const routes: Routes = [
  {
    path: '',
    component: ChamadosCompComponent
  }
];

@NgModule({
  declarations: [
    ChamadosCompComponent,
    ChamadoCadComponent
  ],
  imports: [
    CommonModule,

    MaterialModule,
    RouterModule.forChild(routes),
    ListBaseModule
  ]
})
export class ChamadosCompModule { }
