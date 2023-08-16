import { Directive, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
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

  protected verificandoDataDialog(): void {
    if (this.data.object !== null) {
      this.formData.patchValue(this.data.object);

      if (this.data.object.prioridade && this.data.object.status) {
        this.formData.get('prioridade')?.setValue(this.retornaPrioridade(this.data.object.prioridade));
        this.formData.get('status')?.setValue(this.retornaStatus(this.data.object.status));
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
        this.tipoServico = 'Deletar';
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

  protected retornaPrioridade(prioridade: string | number): string | number {

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

  protected retornaStatus(perfil: string | number): string | number {

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
