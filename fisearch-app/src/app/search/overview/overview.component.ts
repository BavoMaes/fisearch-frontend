import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/token.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {

  searchterms = "";
  searched = "";
  author = "";
  department = "";
  departments;
  currentYear;
  minYear = "";
  maxYear = "";
  field = "";
  promotor = "";
  results = null;
  loaded = false;
  error = false;

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router, private tokenService: TokenService) { }

  ngOnInit() {
    this.tokenService.checkToken();
    this.currentYear = new Date().getFullYear();
    this.getDepartments();
    this.route.queryParams.subscribe(params => {
      this.searchterms = params['q'] != undefined ? params['q'] : "";
      this.searched = params['q'] != undefined ? params['q'] : "";
      this.author = params['author'] != undefined ? params['author'] : "";
      this.department = params['department'] != undefined ? params['department'] : "";
      this.minYear = params['minYear'] != undefined ? params['minYear'] : "";
      this.maxYear = params['maxYear'] != undefined ? params['maxYear'] : "";
      this.field = params['field'] != undefined ? params['field'] : "";
      this.promotor = params['promotor'] != undefined ? params['promotor'] : "";
      this.getFinalWorks(this.searchterms, this.author, this.department);
    });
  }

  ngOnChanges() {
    this.route.queryParams.subscribe(params => {
      this.searchterms = params['q'] != undefined ? params['q'] : "";
      this.searched = params['q'] != undefined ? params['q'] : "";
      this.author = params['author'] != undefined ? params['author'] : "";
      this.department = params['department'] != undefined ? params['department'] : "";
      this.minYear = params['minYear'] != undefined ? params['minYear'] : "";
      this.maxYear = params['maxYear'] != undefined ? params['maxYear'] : "";
      this.field = params['field'] != undefined ? params['field'] : "";
      this.promotor = params['promotor'] != undefined ? params['promotor'] : "";
      this.getFinalWorks(this.searchterms, this.author, this.department);
    });
  }

  getFinalWorks(searchterms, author, department) {
    this.loaded = false;
    this.http.get(this.createApiUrl()).subscribe(
      data => {
        this.results = data;
        this.loaded = true;
    }, error => {
      this.error = true;
    });
  }

  createApiUrl() {
    let finalWorksUrl = "http://localhost:8888/fisearch/public/api/search?";
    if (this.searchterms != null && this.searchterms != "" && this.searchterms != undefined) {
      finalWorksUrl += "q=" + encodeURIComponent(this.searchterms);
    }
    if (this.author != null && this.author != "" && this.author != undefined) {
      finalWorksUrl += "&author=" + encodeURIComponent(this.author);
    }
    if (this.department != null && this.department != "" && this.department != undefined) {
      finalWorksUrl += "&department=" + encodeURIComponent(this.department);
    }
    if (this.minYear != null && this.minYear != "" && this.minYear != undefined) {
      finalWorksUrl += "&minYear=" + encodeURIComponent(this.minYear);
    }
    if (this.maxYear != null && this.maxYear != "" && this.maxYear != undefined) {
      finalWorksUrl += "&maxYear=" + encodeURIComponent(this.maxYear);
    }
    if (this.field != null && this.field != "" && this.field != undefined) {
      finalWorksUrl += "&field=" + encodeURIComponent(this.field);
    }
    if (this.promotor != null && this.promotor != "" && this.promotor != undefined) {
      finalWorksUrl += "&promotor=" + encodeURIComponent(this.promotor);
    }
    return finalWorksUrl;
  }

  createUrl() {
    let currentPage = '/search?q=';
    if (this.searchterms != null && this.searchterms != "" && this.searchterms != undefined) {
      currentPage += encodeURIComponent(this.searchterms);
    }
    if (this.author != null && this.author != "" && this.author != undefined) {
      currentPage += "&author=" + encodeURIComponent(this.author);
    }
    if (this.department != null && this.department != "" && this.department != undefined) {
      currentPage += "&department=" + encodeURIComponent(this.department);
    }
    if (this.minYear != null && this.minYear != "" && this.minYear != undefined) {
      currentPage += "&minYear=" + encodeURIComponent(this.minYear);
    }
    if (this.maxYear != null && this.maxYear != "" && this.maxYear != undefined) {
      currentPage += "&maxYear=" + encodeURIComponent(this.maxYear);
    }
    if (this.field != null && this.field != "" && this.field != undefined) {
      currentPage += "&field=" + encodeURIComponent(this.field);
    }
    if (this.promotor != null && this.promotor != "" && this.promotor != undefined) {
      currentPage += "&promotor=" + encodeURIComponent(this.promotor);
    }
    return currentPage;
  }

  onSubmit() {
    this.router.navigateByUrl(this.createUrl());
  }

  getDepartments() {
    let departmentsUrl = 'http://localhost:8888/fisearch/public/api/departments';
    this.http.get(departmentsUrl).subscribe((data) => {
      this.departments = data['departments'];
    }, error => {
      console.log(error);
    });
  }
}
