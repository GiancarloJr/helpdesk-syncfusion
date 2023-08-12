import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient, HttpHeaderResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from '../config/api.config';
import { Credenciais } from '../models/credenciais';
import { BehaviorSubject, Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  jwtService: JwtHelperService = new JwtHelperService();

  private subjectUser: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private subjectLogin: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) { }



  login(creds: Credenciais): Observable<any> {
    return this.http.post<HttpResponse<any>>(`${API_CONFIG.baseUrl}/login`, creds,
    { observe: 'response' });
  }
  sair() {

  }

  estaLogado() {

  }

  obterUsuario() {

  }


  authenticate(creds: Credenciais) {
    return this.http.post(`${API_CONFIG.baseUrl}/login`, creds, {
      observe: 'response',
      responseType: 'text'
    })
  }

  successfulLogin(authToken: string) {
    localStorage.setItem('token', authToken);
  }

  isAuthenticated() {
    let token = localStorage.getItem('token')
    if (token != null) {
      return !this.jwtService.isTokenExpired(token)
    }
    return false
  }

  logout() {
    localStorage.clear();
  }
}
