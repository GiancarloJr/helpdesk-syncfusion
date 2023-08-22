import { ViewEncapsulation } from '@angular/core';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { Cliente } from 'src/app/models/cliente';
import { Tecnico } from 'src/app/models/tecnico';
import { ChamadoService } from 'src/app/services/chamado.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { TecnicoService } from 'src/app/services/tecnico.service';
import { DialogViewBase } from 'src/app/shared/base/dialogviewbase';
import { UtilsHelp } from 'src/app/shared/base/utils/utils';

@Component({
  selector: 'chamado-cad',
  templateUrl: './chamado-cad.component.html',
  styleUrls: ['./chamado-cad.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ChamadoCadComponent extends DialogViewBase {

  clientes: Cliente[] = [];
  tecnicos: Tecnico[] = [];

  request1 = this.clienteService.findAll();
  request2 = this.tecnicoService.findAll();

  constructor(
    private chamadoService: ChamadoService,
    private clienteService: ClienteService,
    private tecnicoService: TecnicoService,
    public override _formBuilder: FormBuilder,
    public override router: Router,
    public override dialogRef: MatDialogRef<ChamadoCadComponent>,
    @Inject(MAT_DIALOG_DATA) public override data: any) {
    super(chamadoService, _formBuilder, router, dialogRef, data)
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  override ngOnInit(): void {
    this.createForm();
    this.findAll();
    super.ngOnInit();
  }

  protected override verificandoDataDialog(): void {
    super.verificandoDataDialog();
    if (this.data.object.prioridade && this.data.object.status) {
      this.formData.get('prioridade')?.setValue(UtilsHelp.retornaPrioridade(this.data.object.prioridade));
      this.formData.get('status')?.setValue(UtilsHelp.retornaStatus(this.data.object.status));
    }
  }

  createForm(): FormGroup {
    return this.formData = this._formBuilder.group({
      id: [''],
      prioridade: [''],
      status: [''],
      titulo: ['', Validators.required],
      observacoes: ['', Validators.required],
      tecnico: ['', Validators.minLength(3)],
      cliente: [[]],
      nomeCliente: [''],
      nomeTecnico: ['']
    })
  }

  findAll(): void {
    const clientes$ = this.clienteService.findAll();
    const tecnicos$ = this.tecnicoService.findAll();

    forkJoin([clientes$, tecnicos$]).subscribe(resposta => {
      console.log(resposta);

      this.clientes = resposta[0];
      this.tecnicos = resposta[1];
    });
  }

}


