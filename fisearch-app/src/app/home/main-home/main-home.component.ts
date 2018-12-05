import { Component, OnInit, SecurityContext } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-main-home',
  templateUrl: './main-home.component.html',
  styleUrls: ['./main-home.component.css']
})
export class MainHomeComponent implements OnInit {

  departmentsUrl = 'http://localhost:8888/fisearch/public/api/departments';
  departments;
  searchterms = "";

  constructor(private http: HttpClient, private router: Router, private sanitizer: DomSanitizer) { }

  ngOnInit() {
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
    let searchQuery = '/search?q=' + encodeURI(this.searchterms);
    this.router.navigateByUrl(searchQuery);
  }

}