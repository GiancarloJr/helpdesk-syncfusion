import { Directive, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Router } from "@angular/router";

@Directive()
export abstract class DialogViewBase implements OnInit {

  formData!: FormGroup;
  tipoServico: string = 'Cadastrar';

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

  verificandoDataDialog(): void {

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



  sendDataToApi(): void {
    switch (this.data.tipo) {
      case 'add':
        this.service.create(this.formData.getRawValue()).subscribe(() => {
          this.dialogRef.close(true);
          this.router.navigate(['clientes'])
        })
        break;
      case 'edit':
        this.service.update(this.formData.getRawValue()).subscribe(() => {
          this.dialogRef.close(true);
          this.router.navigate(['clientes'])
        });
        break;

      case 'delete':
        this.service.delete(this.data.object.id).subscribe(() => {
          this.dialogRef.close(true);
          this.router.navigate(['clientes'])
        });
        break;
    }
  }
  returnPerfilNumber(n: number): boolean {
    return this.formData.get('perfis')?.value.includes(n);
  }

  retornaStatus(perfil: string): number {
    if (perfil === 'ADMIN') {
      return 0
    } else if (perfil === 'CLIENTE') {
      return 1
    } else {
      return 2
    }
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

}
