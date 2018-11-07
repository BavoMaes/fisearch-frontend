import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SingleUploadComponent } from './single-upload/single-upload.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [SingleUploadComponent],
  entryComponents: [SingleUploadComponent],
})
export class UploadModule { }
