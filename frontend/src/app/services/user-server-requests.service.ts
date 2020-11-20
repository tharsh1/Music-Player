import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

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

  get(route: string, data?: any) {
    const header = this.loggedIn
      ? { Authorization: `Bearer ${this.token}` }
      : undefined;

    let params = new HttpParams();
    if (data !== undefined) {
      Object.getOwnPropertyNames(data).forEach((key) => {
        params = params.set(key, data[key]);
      });
    }

    return this.http.get(baseUrl + route, {
      responseType: 'json',
      headers: header,
      params,
    });
  }
}
