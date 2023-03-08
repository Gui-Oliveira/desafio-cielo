import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LancamentoContaService {
  constructor(
    private http: HttpClient
  ) {}

  baseUrl: string = 'http://localhost:3001/lancamento';
  response: any;

  read(): Observable<any> {
    this.response = this.http.get(this.baseUrl);
    return this.response;
  }

  modal(param: any) {
    if (param) {
      this.response = param;
    }
    return this.response;
  }
}