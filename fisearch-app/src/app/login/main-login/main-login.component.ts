import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-login',
  templateUrl: './main-login.component.html',
  styleUrls: ['./main-login.component.css']
})
export class MainLoginComponent implements OnInit {

  username = "";
  password = "";
  errorMessage = "";

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onSubmit() {
    if (this.checkEhbEmail()) {
      this.errorMessage = "";
      if(this.checkPassword()) {
        this.errorMessage = "";
        this.router.navigate(['/'])
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
