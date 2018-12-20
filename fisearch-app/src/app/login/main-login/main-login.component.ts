import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { TokenService } from 'src/app/token.service';

@Component({
  selector: 'app-main-login',
  templateUrl: './main-login.component.html',
  styleUrls: ['./main-login.component.css'],
})
export class MainLoginComponent implements OnInit {

  username = "";
  password = "";
  remember = true;
  errorMessage = "";


  constructor(private router: Router, private http: HttpClient, private tokenService : TokenService) { }

  ngOnInit() {
    
  }

  onSubmit() {
    let loginUrl = "http://localhost:8888/fisearch/public/api/auth/login";
    let credentials = {"email": this.username, "password": this.password, "remember_me": this.remember}
    if (this.checkEhbEmail()) {
      this.errorMessage = "";
      if(this.checkPassword()) {
        this.errorMessage = "";
        this.http.post(loginUrl, credentials).subscribe(
          data => {
            console.log(data);
            this.tokenService.storeToken(data);
            this.router.navigate(['/']);
          }, error => {
            console.log(error.message);
            this.errorMessage = "Inloggen is niet geslaagd. Gelieve het correcte wachtwoord in te voeren of later nog eens te proberen"
          });
      } else {
        this.errorMessage = "Gelieve het correcte wachtwoord in te voeren";
      }
    } else {
      this.errorMessage = "Gelieve in te loggen met uw EhB-account"
    }
  }

  checkEhbEmail() {
    return (this.username.includes("@student.ehb.be") || this.username.includes("@ehb.be"))
  }

  checkPassword() {
    return (this.password == "fisearch")
  }
}
