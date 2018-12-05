import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {

  searchterms = "";
  finalWorksUrl = "http://localhost:8888/fisearch/public/api/works/by_title/";
  results = null;
  loaded = false;

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['q'] == null || params['q'] == "") {
        console.log("Nothing searched...");
      } else {
        this.searchterms = params['q'];
        this.getFinalWorks(params['q']);
      }
    });
  }

  getFinalWorks(searchterms) {
    this.http.get(this.finalWorksUrl + searchterms).subscribe(data => {
      this.results = data;
      this.loaded = true;
      //console.log(this.results);
    })
  }

}
