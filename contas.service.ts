import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Response } from "../shared/models/Response"
import { Environment } from "environments/environment";
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ContasService {

    private URL: string;

    constructor(private http: HttpClient) {
        this.URL = Environment.URL + "Contas";
    }

    public post(request: any): Observable<Response> {
        return this.http.post<Response>(this.URL, request);
    }

    public get(): Observable<Response> {
        return this.http.get<Response>(this.URL);
    }
    /*
    public put(conta: Conta): Observable<Conta> {
        return this.http
          .put<Conta>(`${this.baseURL}/${conta.id}`, conta)
          .pipe(take(1));
      }
    
      public deleteConta(id: number): Observable<any> {
        return this.http
          .delete(`${this.baseURL}/${id}`)
          .pipe(take(1));
      }
      */
}
