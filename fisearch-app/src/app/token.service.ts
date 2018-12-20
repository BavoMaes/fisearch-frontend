import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  token;
  login = false;

  constructor(private router: Router, private http: HttpClient) { }

  storeToken(token) {
    this.token = token;
  }

  loggedIn() {
    return this.login;
  }

  getToken() {
    return this.token;
  }

  checkToken() {
    if (this.token == null) {
      this.router.navigate(['/login']);
    } else {
      let currentDate = Math.round((new Date()).getTime() / 1000);
      let expires = Math.round(new Date(this.token['expires_at']).getTime() / 1000);
      if (expires < currentDate) {
        this.router.navigate(['/login']);
      } else {
        this.login = true;
      }
    }
  }

  logOut() {
    let headerDict = {
      'Content-Type': 'application/json',
      'Authorization': this.token['token_type'] + " " + this.token['access_token'],
    }
    let requestOptions = {
      headers: new HttpHeaders(headerDict),
    };
    this.http.get('http://localhost:8888/fisearch/public/api/auth/logout', requestOptions).subscribe(
      data => {
        console.log(data['message']);
      }, error => {
        console.log(error);
      }
    )
    this.token = null;
    this.login = false;
    this.router.navigate(['/login']);
  }
}
