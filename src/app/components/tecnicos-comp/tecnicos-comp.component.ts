import { ChangeDetectorRef, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TecnicoService } from 'src/app/services/tecnico.service';
import { ListViewBase } from 'src/app/shared/base/listviewbase';
import { TecnicoCadComponent } from './tecnico-cad/tecnico-cad.component';
import { ColumnModel } from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-tecnicos-comp',
  templateUrl: './tecnicos-comp.component.html',
  styleUrls: ['./tecnicos-comp.component.scss']
})
export class TecnicosCompComponent extends ListViewBase {

  constructor(protected override service: TecnicoService,
    protected override dialog: MatDialog,
    protected override _cdr: ChangeDetectorRef,
  ) {
    super(dialog, service, _cdr, TecnicoCadComponent);
  }

  public columns: ColumnModel[] = [
    { field: 'id', headerText: 'ID', textAlign: 'Center', width: '10%', allowFiltering: true, isPrimaryKey: true },
    { field: 'nome', headerText: 'Título', textAlign: 'Center', width: '30%', allowFiltering: true },
    { field: 'cpf', headerText: 'Cliente', textAlign: 'Center', width: '30%' },
    { field: 'email', headerText: 'Email', textAlign: 'Center', width: '30%' }
  ];
}
