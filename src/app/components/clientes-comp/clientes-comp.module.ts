import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { ListBaseModule } from 'src/app/shared/components-base/list-base/list-base.module';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { ClienteCadComponent } from './cliente-cad/cliente-cad.component';
import { ClientesCompComponent } from './clientes-comp.component';

const routes: Routes = [
  {
    path: '',
    component: ClientesCompComponent
  }
];

@NgModule({
  declarations: [
    ClientesCompComponent,
    ClienteCadComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(routes),
    ListBaseModule
  ]
})
export class ClientesCompModule { }
