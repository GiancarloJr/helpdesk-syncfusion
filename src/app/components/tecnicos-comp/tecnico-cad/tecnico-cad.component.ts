import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FormFieldModel } from 'src/app/models/formField-model/formField-model';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-tecnico-cad',
  templateUrl: './tecnico-cad.component.html',
  styleUrls: ['./tecnico-cad.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TecnicoCadComponent implements OnInit {

  formData!: FormGroup;
  tipoServico: string = 'Cadastrar';

  constructor(
    private service: TecnicoService,
    private _formBuilder: FormBuilder,
    private router: Router,
    public dialogRef: MatDialogRef<TecnicoCadComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.verificandoDataDialog();
    this.dialogRef.disableClose = true;
  }

  private verificandoDataDialog(): void {

    if (this.data.object !== null) {
      this.formData.patchValue(this.data.object);
      this.formData.get('perfis')?.setValue((this.data.object.perfis as Array<string>).map(this.retornaStatus));
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
        this.formData.disable();
        break;
    }
  }

  public sendDataToApi(): void {
    switch (this.data.tipo) {
      case 'add':
        this.service.create(this.formData.getRawValue()).subscribe(() => {
          this.dialogRef.close(true);
          this.router.navigate(['tecnicos'])
        })
        break;
      case 'edit':
        this.service.update(this.formData.getRawValue()).subscribe(() => {
          this.dialogRef.close(true);
          this.router.navigate(['tecnicos'])
        });
        break;

      case 'delete':
        this.service.delete(this.data.object.id).subscribe(() => {
          this.router.navigate(['tecnicos'])
        });
        break;
    }
  }

  public returnPerfilNumber(n: number): boolean {
    return this.formData.get('perfis')?.value.includes(n);
  }

  private retornaStatus(perfil: string): number {
    if (perfil === 'ADMIN') {
      return 0
    } else if (perfil === 'CLIENTE') {
      return 1
    } else {
      return 2
    }
  }

  private createForm(): FormGroup {
    return this.formData = this._formBuilder.group({
      id: [''],
      nome: ['', Validators.minLength(3)],
      cpf: ['', Validators.required],
      email: ['', Validators.required],
      senha: ['', Validators.minLength(3)],
      perfis: [[]]
    })
  }

  public addPerfil(perfil: any): void {

    if (this.returnPerfis.includes(perfil)) {
      this.returnPerfis.splice(this.formData.get('perfis')?.value.indexOf(perfil), 1);
    } else {
      this.returnPerfis.push(perfil);
    }
  }

  private get returnPerfis(): string[] {
    return this.formData.get('perfis')?.value;
  }

  public formFields: FormFieldModel[] = [
    { label: 'Nome', formControlName: 'nome', placeHolder: "Ex.. fulano de tal", matIcon: 'sentiment_very_satisfied', typeField: 'text' },
    { label: 'CPF', formControlName: 'cpf', placeHolder: 'CPF', matIcon: 'pin', typeField: 'text' },
    { label: 'Email', formControlName: 'email', placeHolder: 'Email', matIcon: 'email', typeField: 'text' },
    { label: 'Senha', formControlName: 'senha', placeHolder: 'Senha', matIcon: 'password', typeField: 'password' },
  ]
}

