import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { LoginComponent } from './login.component';

const routes: Routes = [{
  path: '',
  component: LoginComponent
}];

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [

    CommonModule,
    MaterialModule,
    RouterModule.forChild(routes)

  ]
})
export class LoginModule { }
