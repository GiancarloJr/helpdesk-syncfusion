import { Directive, OnInit } from "@angular/core";
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormGroup, ValidationErrors } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable, Subject, debounceTime, distinctUntilChanged, map, of } from "rxjs";
import { UtilsHelp } from "./utils/utils";
import { Tecnico } from "src/app/models/tecnico";
import { Cliente } from "src/app/models/cliente";

@Directive()
export abstract class DialogViewBase implements OnInit {

  formData!: FormGroup;
  tipoServico: string = 'Cadastrar';
  userTest!: Cliente | Tecnico;

  constructor(
    protected service: any,
    protected _formBuilder: FormBuilder,
    protected router: Router,
    public dialogRef: any,
    public data: any
  ) { }


  ngOnInit(): void {
    this.verificandoDataDialog();
    this.dialogRef.disableClose = true;
  }

  protected verificandoDataDialog(): void {
    if (this.data.object !== null) {
      this.formData.patchValue(this.data.object);

      if (this.data.object.perfis) {
        this.formData.get('perfis')?.setValue((this.data.object.perfis as Array<string>).map(UtilsHelp.retornaPerfil));
      }
    }

    switch (this.data.tipo) {
      case 'add':
        this.tipoServico = 'Adicionar';
        break;
      case 'edit':
        this.tipoServico = 'Alterar';
        break;
      case 'delete':
        this.formData.disable();
        this.tipoServico = 'Deletar';
        break;
    }
  }

  public sendDataToApi(): void {
    switch (this.data.tipo) {
      case 'add':

        if (this.data.object.perfis) {
          this.convertPerfisToNumber(this.formData.get('perfis')?.value);
        }

        this.service.create(this.formData.getRawValue()).subscribe(() => {
          this.dialogRef.close(true);
        })
        break;
      case 'edit':

        if (this.data.object.perfis) {
          this.convertPerfisToNumber(this.formData.get('perfis')?.value);
        }

        this.service.update(this.formData.getRawValue()).subscribe((result: any) => {
          this.dialogRef.close(true);
        });
        break;

      case 'delete':
        this.service.delete(this.data.object.id).subscribe(() => {
          this.dialogRef.close(true);
        });
        break;
    }
  }

  protected createValidator(userService: any): AsyncValidatorFn {
    return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
      return userService
        .findByEmail(control.value)
        .pipe(
          distinctUntilChanged(),
          debounceTime(400),
          map((result: any) => {
            if (this.data.tipo === 'edit' || this.data.tipo === 'delete') {
              console.log('entrou aqui');

              console.log(result.id != this.data.object.id ? { usernameAlreadyExists: true } : null );
              console.log(this.formData.valid);


              return result.id != this.data.object.id ? { usernameAlreadyExists: true } : null ;
            }

            console.log('aqui');

            return result ? { usernameAlreadyExists: true } : null ;
          }
          )
        )
    };
  }

  returnPerfilNumber(n: number): boolean {
    return this.formData.get('perfis')?.value.includes(n);
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

  private convertPerfisToNumber(perfis: string[]): any[] {
    return perfis.map(UtilsHelp.retornaPerfil);
  }
}

