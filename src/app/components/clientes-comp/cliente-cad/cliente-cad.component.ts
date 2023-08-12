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

  // formData!: FormGroup;
  // tipoServico: string = 'Cadastrar';

  constructor(
    public override service: ClienteService,
    public override _formBuilder: FormBuilder,
    public override router: Router,
    public override dialogRef: MatDialogRef<ClienteCadComponent> ,
    @Inject(MAT_DIALOG_DATA) public override data: any ) {
    super(service,_formBuilder,router,dialogRef, data )
  }

  override ngOnInit(): void {
   super.ngOnInit();
  }

  formFields: FormFieldModel[] = [
    { label: 'Nome', formControlName: 'nome', placeHolder: "Ex.. fulano de tal", matIcon: 'sentiment_very_satisfied', typeField: 'text' },
    { label: 'CPF', formControlName: 'cpf', placeHolder: 'CPF', matIcon: 'pin', typeField: 'text' },
    { label: 'Email', formControlName: 'email', placeHolder: 'Email', matIcon: 'email', typeField: 'text' },
    { label: 'Senha', formControlName: 'senha', placeHolder: 'Senha', matIcon: 'password', typeField: 'password' },
  ]

  // verificandoDataDialog(): void {
  //   if (this.data.object !== null) {
  //     this.formData.patchValue(this.data.object);
  //     this.formData.get('perfis')?.setValue((this.data.object.perfis as Array<string>).map(this.retornaStatus));
  //   }

  //   switch (this.data.tipo) {
  //     case 'add':
  //       this.tipoServico = 'Adicionar';
  //       break;
  //     case 'edit':
  //       this.tipoServico = 'Alterar';
  //       break;
  //     case 'delete':
  //       this.tipoServico = 'Deletar';
  //       this.formData.disable();
  //       break;
  //   }
  // }

  // createForm(): FormGroup {
  //   return this.formData = this._formBuilder.group({
  //     id: [''],
  //     nome: ['', Validators.minLength(3)],
  //     cpf: ['', Validators.required],
  //     email: ['', Validators.required],
  //     senha: ['', Validators.minLength(3)],
  //     perfis: [[]],
  //     dataCriacao: ['']
  //   })
  // }

  // sendDataToApi(): void {
  //   switch (this.data.tipo) {
  //     case 'add':
  //       this.service.create(this.formData.getRawValue()).subscribe(() => {
  //         this.dialogRef.close(true);
  //         this.router.navigate(['clientes'])
  //       })
  //       break;
  //     case 'edit':
  //       this.service.update(this.formData.getRawValue()).subscribe(() => {
  //         this.dialogRef.close(true);
  //         this.router.navigate(['clientes'])
  //       });
  //       break;

  //     case 'delete':
  //       this.service.delete(this.data.object.id).subscribe(() => {
  //         this.router.navigate(['clientes'])
  //       });
  //       break;
  //   }
  // }
  // returnPerfilNumber(n: number): boolean {
  //   return this.formData.get('perfis')?.value.includes(n);
  // }

  // retornaStatus(perfil: string): number {
  //   if (perfil === 'ADMIN') {
  //     return 0
  //   } else if (perfil === 'CLIENTE') {
  //     return 1
  //   } else {
  //     return 2
  //   }
  // }

  // addPerfil(perfil: any): void {

  //   if (this.returnPerfis.includes(perfil)) {
  //     this.returnPerfis.splice(this.formData.get('perfis')?.value.indexOf(perfil), 1);
  //   } else {
  //     this.returnPerfis.push(perfil);
  //   }
  // }

  // private get returnPerfis(): string[] {
  //   return this.formData.get('perfis')?.value;
  // }

}
