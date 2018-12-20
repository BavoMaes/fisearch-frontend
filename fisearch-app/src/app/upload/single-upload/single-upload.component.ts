import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/token.service';
import { TouchSequence } from 'selenium-webdriver';

@Component({
  selector: 'app-single-upload',
  templateUrl: './single-upload.component.html',
  styleUrls: ['./single-upload.component.css']
})
export class SingleUploadComponent implements OnInit {
  myFiles: string[] = [];
  sMsg: string = '';
  loading = false;
  loaded = false;
  analysed = false;
  image = "./assets/img/placeholder.jpg";
  details;
  departments;
  tags;
  title = "";
  description = "";
  author = "";
  field = "";
  department = "";
  promotor = "";
  year;

  constructor(private http: HttpClient, private router: Router, private tokenService: TokenService) { }

  ngOnInit() {
    this.tokenService.checkToken();
    this.year = new Date().getFullYear();
  }

  getFiles(e) {
    for (var i = 0; i < e.target.files.length; i++) {
      this.myFiles.push(e.target.files[i]);
    }
  }

  uploadFiles() {
    this.loading = true;
    this.getDepartments();
    const frmData = new FormData();
    for (var i = 0; i < this.myFiles.length; i++) {
      frmData.append("pdf", this.myFiles[i]);
    }
    this.http.post('http://localhost:8888/fisearch/public/api/upload', frmData).subscribe(
      data => {
        this.loading = false;
        this.loaded = true;
        this.details = data['details'];
        this.title = data['details']['title'];
        this.description = data['details']['description'];
        this.author = data['details']['name'];
        this.year = data['details']['year'];
        this.image = data['img'];
        this.promotor = data['details']['promoter'];
        this.tags = data['tags']['documents'][0]['keyPhrases'];
        this.analysed = true;
      },
      error => {
        this.loading = false;
        console.log(error.message);
      }
    );
  }

  getDepartments() {
    let departmentsUrl = 'http://localhost:8888/fisearch/public/api/departments';
    this.http.get(departmentsUrl).subscribe((data) => {
      this.departments = data['departments'];
    }, error => {
      console.log(error);
    });
  }

  submitWork() {
    let submitUrl = 'http://localhost:8888/fisearch/public/api/confirm';
    let submitData = new FormData();
    submitData.append('finalworkURL', this.image);
    submitData.append('finalworkTitle', this.title);
    submitData.append('finalworkDescription', this.description);
    submitData.append('finalworkAuthor', this.author);
    submitData.append('departement', this.department);
    submitData.append('finalworkField', this.field);
    submitData.append('finalworkYear', this.year);
    submitData.append('finalworkPromoter', this.promotor);
    submitData.append('tags', this.tags);

    this.http.post(submitUrl, submitData).subscribe(
      data => {
        console.log(data)
        this.router.navigateByUrl('/');
      },
      error => {
        console.log(error);
        this.router.navigateByUrl('/');
      });
  }

}
