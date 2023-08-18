import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable, distinctUntilChanged, debounceTime, map } from 'rxjs';
import { FormFieldModel } from 'src/app/models/formField-model/formField-model';
import { Tecnico } from 'src/app/models/tecnico';
import { TecnicoService } from 'src/app/services/tecnico.service';
import { DialogViewBase } from 'src/app/shared/base/dialogviewbase';

@Component({
  selector: 'app-tecnico-cad',
  templateUrl: './tecnico-cad.component.html',
  styleUrls: ['./tecnico-cad.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TecnicoCadComponent extends DialogViewBase {

  constructor(
    public override service: TecnicoService,
    public override _formBuilder: FormBuilder,
    public override router: Router,
    public override dialogRef: MatDialogRef<TecnicoCadComponent>,
    @Inject(MAT_DIALOG_DATA) public override data: Tecnico
  ) {
    super(service, _formBuilder, router, dialogRef, data)
  }

  override ngOnInit(): void {
    this.createForm();
    super.ngOnInit();
  }

  private createForm(): FormGroup {
    return this.formData = this._formBuilder.group({
      id: [''],
      nome: ['', Validators.minLength(3)],
      cpf: ['', Validators.required],
      email: ['', [Validators.required], [this.createValidator(this.service)]],
      senha: ['', Validators.minLength(3)],
      perfis: [[]]
    })
  }

  public formFields: FormFieldModel[] = [
    { label: 'Nome', formControlName: 'nome', placeHolder: "Ex.. fulano de tal", matIcon: 'sentiment_very_satisfied', typeField: 'text' },
    { label: 'CPF', formControlName: 'cpf', placeHolder: 'CPF', matIcon: 'pin', typeField: 'text' },
    { label: 'Email', formControlName: 'email', placeHolder: 'Email', matIcon: 'email', typeField: 'text' },
    { label: 'Senha', formControlName: 'senha', placeHolder: 'Senha', matIcon: 'password', typeField: 'password' },
  ]


}

