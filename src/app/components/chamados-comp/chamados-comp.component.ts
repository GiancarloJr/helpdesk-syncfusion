import { ChangeDetectorRef, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ColumnModel } from '@syncfusion/ej2-angular-grids';
import { ChamadoService } from 'src/app/services/chamado.service';
import { ListViewBase } from 'src/app/shared/base/listviewbase';
import { ChamadoCadComponent } from './chamado-cad/chamado-cad.component';
import { Chamado } from 'src/app/models/chamado';

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

  override initializeData(): void {
    this.service.findAll().subscribe((resposta: any) => {
      console.log(resposta);

      this.dataSource = resposta;
      this.dataSource.map((x: any) => x.prioridade = this.retornaPrioridade(x.prioridade))
      this.dataSource.map((x: any) => x.status = this.retornaStatus(x.status))
    });
  }



  public columns: ColumnModel[] = [
    { field: 'id', headerText: 'ID', textAlign: 'Center', width: '5%', allowFiltering: false, isPrimaryKey: true },
    { field: 'titulo', headerText: 'Título', textAlign: 'Center', width: '8%', allowFiltering: true },
    { field: 'nomeCliente', headerText: 'Cliente', textAlign: 'Center', width: '8%' },
    { field: 'nomeTecnico', headerText: 'Técnico', textAlign: 'Center', width: '8%' },
    { field: 'dataAbertura', headerText: 'Data de Abertura', textAlign: 'Center', width: '6%' },
    { field: 'prioridade', headerText: 'Prioridade', textAlign: 'Center', width: '6%' },
    { field: 'status', headerText: 'Status', textAlign: 'Center', width: '7%' }
  ];

  private retornaPrioridade(prioridade: string | number): string | number {

    let prioridadeStatus: { [key: string | number]: string | number } = {
      'BAIXO': 0,
      'MÉDIA': 1,
      'ALTA': 2,
      0: 'BAIXO',
      1: 'MÉDIA',
      2: 'ALTA'
    }

    return prioridadeStatus[prioridade];
  }

  private retornaStatus(perfil: string | number): string | number {

    let status: { [key: string | number]: string | number } = {
      'ABERTO': 0,
      'EM ANDAMENTO': 1,
      'ENCERRADO': 2,
      0: 'ABERTO',
      1: 'EM ANDAMENTO',
      2: 'ENCERRADO'
    }

    return status[perfil];
  }

}
