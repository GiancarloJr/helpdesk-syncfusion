import { ViewEncapsulation } from '@angular/core';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/models/cliente';
import { Tecnico } from 'src/app/models/tecnico';
import { ChamadoService } from 'src/app/services/chamado.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { TecnicoService } from 'src/app/services/tecnico.service';
import { DialogViewBase } from 'src/app/shared/base/dialogviewbase';

@Component({
  selector: 'chamado-cad',
  templateUrl: './chamado-cad.component.html',
  styleUrls: ['./chamado-cad.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ChamadoCadComponent extends DialogViewBase {

  clientes: Cliente[] = [];
  tecnicos: Tecnico[] = [];

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
    this.findAllClientes();
    this.findAllTecnicos();
    this.verificandoDataDialog();
  }

  override verificandoDataDialog(): void {
    if (this.data.object !== null) {
      this.formData.patchValue(this.data.object);
      this.formData.get('status')?.setValue(this.retornaStatusNumber(this.data.object.status));
      this.formData.get('prioridade')?.setValue(this.retornaStatusNumber(this.data.object.prioridade));
    }

    switch (this.data.tipo) {
      case 'add':
        this.tipoServico = 'Adicionar';
        break;
      case 'edit':
        this.tipoServico = 'Alterar';
        break;
      case 'delete':
        this.tipoServico = 'Deletar';
        break;
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

  create(): void {
    switch (this.data.tipo) {
      case 'add':
        this.chamadoService.create(this.formData.getRawValue()).subscribe(() => {
          this.dialogRef.close(true);
          this.router.navigate(['chamados'])
        });
        break;

      case 'edit':
        this.chamadoService.update(this.formData.getRawValue()).subscribe(() => {
          this.dialogRef.close(true);
          this.router.navigate(['chamados'])

        });
        break;
    }
  }

  findAllClientes(): void {
    this.clienteService.findAll().subscribe(resposta => {
      this.clientes = resposta;
    })
  }

  findAllTecnicos(): void {
    this.tecnicoService.findAll().subscribe(resposta => {
      this.tecnicos = resposta;
    })
  }

  retornaStatusNumber(status: string): number {
    if (status === 'ABERTO') {
      return 0
    } else if (status === 'EM ANDAMENTO') {
      return 1
    } else {
      return 2
    }
  }

  retornaPrioridadeNumber(prioridade: string): number {
    if (prioridade === 'BAIXO') {
      return 0
    } else if (prioridade === 'MEDIO') {
      return 1
    } else {
      return 2
    }
  }

}


