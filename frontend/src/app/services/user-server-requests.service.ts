import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { base } from '../interfaces/transferInterfaces/base';

const baseUrl = 'http://localhost:3000';

@Injectable({
  providedIn: 'root',
})
export class UserServerRequestsService {
  private loggedIn = false;
  private token: string;

  constructor(private http: HttpClient) {}

  setLoggedIn(loggedIn: boolean, token?: string) {
    this.loggedIn = loggedIn;
    this.token = token;
  }

  request(method: string, route: string, data?: any) {
    console.log(data);
    const header = this.loggedIn
      ? { Authorization: `${this.token}` }
      : undefined;
    if (method === 'GET') {
      return this.get(route, data);
    }

    return this.http.request(method, baseUrl + route, {
      body: data,
      responseType: 'json',
      observe: 'body',
      headers: header,
    });
  }

  get<T>(route: string, data?: any): Observable<base<T>> {
    console.log('----', this.loggedIn);
    const header = this.loggedIn
      ? { Authorization: ` ${this.token}` }
      : undefined;
    console.log(header);
    let params = new HttpParams();
    if (data !== undefined) {
      Object.getOwnPropertyNames(data).forEach((key) => {
        params = params.set(key, data[key]);
      });
    }

    return this.http.get<base<T>>(baseUrl + route, {
      responseType: 'json',
      headers: header,
      params,
    });
  }
}
