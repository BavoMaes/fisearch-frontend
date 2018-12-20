import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/token.service';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {
  login = false;

  constructor(private tokenService: TokenService) { }

  ngOnInit() {
    this.login = this.tokenService.loggedIn();
  }

  logOut() {
    this.tokenService.logOut();
  }

}
