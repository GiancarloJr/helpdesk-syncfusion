import { ChangeDetectorRef, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ColumnModel } from '@syncfusion/ej2-angular-grids';
import { ChamadoService } from 'src/app/services/chamado.service';
import { ListViewBase } from 'src/app/shared/base/listviewbase';
import { ChamadoCadComponent } from './chamado-cad/chamado-cad.component';

@Component({
  selector: 'app-chamados-comp',
  templateUrl: './chamados-comp.component.html',
  styleUrls: ['./chamados-comp.component.scss']
})
export class ChamadosCompComponent extends ListViewBase {

  constructor(protected override service: ChamadoService,
    protected override dialog: MatDialog,
    protected override _cdr: ChangeDetectorRef,
  ) {
    super(dialog, service, _cdr, ChamadoCadComponent);
  }

  override ngOnInit(): void {
    super.ngOnInit();
  }

  public columns: ColumnModel[] = [
    { field: 'id', headerText: 'ID', textAlign: 'Center', width: '2%', allowFiltering: true, isPrimaryKey: true },
    { field: 'titulo', headerText: 'Título', textAlign: 'Center', width: '8%', allowFiltering: true },
    { field: 'nomeCliente', headerText: 'Cliente', textAlign: 'Center', width: '8%' },
    { field: 'nomeTecnico', headerText: 'Técnico', textAlign: 'Center', width: '8%' },
    { field: 'dataAbertura', headerText: 'Data de Abertura', textAlign: 'Center', width: '6%' },
    { field: 'prioridade', headerText: 'Prioridade', textAlign: 'Center', width: '6%' },
    { field: 'status', headerText: 'Status', textAlign: 'Center', width: '7%' }
  ];

}
