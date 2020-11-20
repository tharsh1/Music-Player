import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { base } from '../interfaces/transferInterfaces/base';
import { LoginData } from '../interfaces/transferInterfaces/LoginData';
import { Profile } from '../interfaces/transferInterfaces/Profile';
import { UserServerRequestsService } from './user-server-requests.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  private token: string;

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  constructor(
    private router: Router,
    private server: UserServerRequestsService
  ) {
    console.log('Auth Service');
    const userData = localStorage.getItem('user');
    if (userData) {
      console.log('Logged in from memory');
      const user = JSON.parse(userData);
      this.token = user.token;
      this.server.setLoggedIn(true, this.token);
      this.loggedIn.next(true);
    }
  }

  login(user) {
    if (user.username !== '' && user.password !== '') {
      return this.server
        .request('POST', '/auth/signIn', {
          username: user.username,
          password: user.password,
        })
        .subscribe((response: any) => {
          console.log(response);
          if (response.code == 1) {
            if (
              response.data.auth === true &&
              response.data.token !== undefined
            ) {
              this.token = response.data.token;
              this.server.setLoggedIn(true, this.token);
              this.loggedIn.next(true);
              const userData = {
                token: this.token,
                profile: response.data.profile,
              };
              localStorage.setItem('user', JSON.stringify(userData));
              // this.router.navigateByUrl('/');
            }
          } else {
            this.loggedIn.next(false);
          }
        });
    }
  }

  logout() {
    this.server.setLoggedIn(false);
    delete this.token;

    this.loggedIn.next(false);
    localStorage.clear();
    this.router.navigate(['/']);
  }
}
