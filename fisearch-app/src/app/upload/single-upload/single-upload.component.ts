import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/token.service';

@Component({
  selector: 'app-single-upload',
  templateUrl: './single-upload.component.html',
  styleUrls: ['./single-upload.component.css']
})
export class SingleUploadComponent implements OnInit {
  myFiles: string[] = [];
  sMsg: string = '';

  constructor(private http: HttpClient, private router: Router, private tokenService: TokenService) { }

  ngOnInit() {
    this.tokenService.checkToken();
  }

  getFiles(e) {
    for (var i = 0; i < e.target.files.length; i++) {
      this.myFiles.push(e.target.files[i]);
    }
  }

  uploadFiles() {
    const frmData = new FormData();

    for (var i = 0; i < this.myFiles.length; i++) {
      frmData.append("pdf", this.myFiles[i]);
    }

    this.http.post('http://localhost:8888/fisearch/public/api/upload', frmData).subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.log(error.message);
      }
    );
  }

}
