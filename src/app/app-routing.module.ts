import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { isAdminGuard } from './auth/auth.guard';
import { LayoutComponent } from './components/layout/layout.component';

const routes: Routes = [

  { path: 'login', loadChildren: () => import('../app/components/login/login.module').then(m => m.LoginModule)},
  {
    path: '', component: LayoutComponent, canActivate: [isAdminGuard],
    children: [
      {
        path: 'clientes',
        loadChildren: () => import('../app/components/clientes-comp/clientes-comp.module').then(m => m.ClientesCompModule)
      },
      {
        path: 'tecnicos',
        loadChildren: () => import('../app/components/tecnicos-comp/tecnicos-comp.module').then(m => m.TecnicosCompModule)
      },
      {
        path: 'chamados',
        loadChildren: () => import('../app/components/chamados-comp/chamados-comp.module').then(m => m.ChamadosCompModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
