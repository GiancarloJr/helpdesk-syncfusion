import { ChangeDetectorRef, Component, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ClienteService } from 'src/app/services/cliente.service';
import { ListViewBase } from 'src/app/shared/base/listviewbase';
import { ColumnModel } from '@syncfusion/ej2-angular-grids';
import { ClienteCadComponent } from './cliente-cad/cliente-cad.component';

@Component({
  selector: 'clientes-comp',
  templateUrl: './clientes-comp.component.html',
  styleUrls: ['./clientes-comp.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ClientesCompComponent extends ListViewBase {

  constructor(protected override service: ClienteService,
    protected override dialog: MatDialog,
    protected override _cdr: ChangeDetectorRef,
  ) {
    super(dialog, service,_cdr, ClienteCadComponent);
  }

  public columns: ColumnModel[] = [
    { field: 'id', headerText: 'ID', textAlign: 'Center', width: '5%', allowFiltering: true, isPrimaryKey: true },
    { field: 'nome', headerText: 'Título', textAlign: 'Center', width: '15%', allowFiltering: true },
    { field: 'cpf', headerText: 'Cliente', textAlign: 'Center', width: '15%' },
    { field: 'email', headerText: 'Email', textAlign: 'Center', width: '15%' },
    { field: 'dataCriacao', visible: false }
  ];
}
