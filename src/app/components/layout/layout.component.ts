import { AuthService } from './../../services/auth.service';
import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarComponent } from '@syncfusion/ej2-angular-navigations';
import { MenuModel } from 'src/app/models/menu-model/menu';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LayoutComponent {

  constructor(private router: Router,
    private authService: AuthService) {

  }

  @ViewChild('dockBar') dockBar?: SidebarComponent;
  public enableDock: boolean = true;
  public width: string = '190px';
  public dockSize: string = '72px';
  public sidebarShow: boolean = true;

  toggleClick() {
    this.dockBar?.toggle();
    this.sidebarShow = !this.sidebarShow;
  }

  menuList: MenuModel[] = [
    { matIcon: 'home', nameMenu: 'Home', Url: '' },
    { matIcon: 'person', nameMenu: 'Clientes', Url: 'clientes' },
    { matIcon: 'work', nameMenu: 'Técnicos', Url: 'tecnicos' },
    { matIcon: 'assignment', nameMenu: 'Chamados', Url: 'chamados' },
    { matIcon: 'logout', nameMenu: 'Sair' , Url: 'login'}
  ]

  redirect(item: MenuModel): void {
    if(item.nameMenu == 'Sair'){
      this.authService.logout();
      this.router.navigate([item.Url]);
      return;
    }
    this.router.navigate([item.Url]);

  }


}
