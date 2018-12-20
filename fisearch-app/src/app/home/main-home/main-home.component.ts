import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/token.service';

@Component({
  selector: 'app-main-home',
  templateUrl: './main-home.component.html',
  styleUrls: ['./main-home.component.css']
})
export class MainHomeComponent implements OnInit {

  departmentsUrl = 'http://localhost:8888/fisearch/public/api/departments';
  departments;
  searchterms = "";
  department = "";
  author;

  constructor(private http: HttpClient, private router: Router, private tokenService: TokenService) { }

  ngOnInit() {
    this.tokenService.checkToken();
    this.getDepartments();
  }

  getDepartments() {
    this.http.get(this.departmentsUrl).subscribe((data) =>{
      this.departments = data['departments'];
    }, error => {
      console.log(error);
    });
  }

  onSubmit() {
    this.router.navigateByUrl(this.createUrl());
  }

  createUrl() {
    let searchQuery = '/search?q=' + encodeURIComponent(this.searchterms);
    if (this.department != null && this.department != "") {
      searchQuery = searchQuery + "&department=" + encodeURIComponent(this.department);
    }
    if (this.author != null && this.author != "") {
      searchQuery = searchQuery + "&author=" + encodeURIComponent(this.author);
    }
    return searchQuery;
  }
}