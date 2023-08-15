import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/models/cliente';
import { FormFieldModel } from 'src/app/models/formField-model/formField-model';
import { ClienteService } from 'src/app/services/cliente.service';
import { DialogViewBase } from 'src/app/shared/base/dialogviewbase';

@Component({
  selector: 'app-cliente-cad',
  templateUrl: './cliente-cad.component.html',
  styleUrls: ['./cliente-cad.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ClienteCadComponent extends DialogViewBase {

  constructor(
    public override service: ClienteService,
    public override _formBuilder: FormBuilder,
    public override router: Router,
    public override dialogRef: MatDialogRef<ClienteCadComponent>,
    @Inject(MAT_DIALOG_DATA) public override data: any) {
    super(service, _formBuilder, router, dialogRef, data)
  }

  override ngOnInit(): void {
    this.createForm();
    super.ngOnInit();
  }

  createForm(): FormGroup {
    return this.formData = this._formBuilder.group({
      id: [''],
      nome: ['', Validators.minLength(3)],
      cpf: ['', Validators.required],
      email: ['', Validators.required],
      senha: ['', Validators.minLength(3)],
      perfis: [[]],
      dataCriacao: ['']
    })
  }

  formFields: FormFieldModel[] = [
    { label: 'Nome', formControlName: 'nome', placeHolder: "Ex.. fulano de tal", matIcon: 'sentiment_very_satisfied', typeField: 'text' },
    { label: 'CPF', formControlName: 'cpf', placeHolder: 'CPF', matIcon: 'pin', typeField: 'text' },
    { label: 'Email', formControlName: 'email', placeHolder: 'Email', matIcon: 'email', typeField: 'text' },
    { label: 'Senha', formControlName: 'senha', placeHolder: 'Senha', matIcon: 'password', typeField: 'password' },
  ]

}
