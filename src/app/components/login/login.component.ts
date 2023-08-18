import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  formLogin!: FormGroup

  constructor(
    private service: AuthService,
    private router: Router,
    private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.createForm();
   }

  private createForm(): FormGroup {
    return this.formLogin = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  logar() {
    this.service.login(this.formLogin.value).subscribe((resposta) => {

      // this.service.successfulLogin(resposta.headers.get('Authorization')!.substring(7));
      this.router.navigate(['clientes'])
    })
  }

  validaCampos(): boolean {
    return this.formLogin.valid
  }

}
