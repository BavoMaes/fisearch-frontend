import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-home',
  templateUrl: './main-home.component.html',
  styleUrls: ['./main-home.component.css']
})
export class MainHomeComponent implements OnInit {

  departmentsUrl = 'http://localhost:8888/fisearch/public/api/departments';
  departments;

  constructor(private http: HttpClient, private router: Router) { }

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

}