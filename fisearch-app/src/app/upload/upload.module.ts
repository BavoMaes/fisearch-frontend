import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SingleUploadComponent } from './single-upload/single-upload.component';
import { TokenService } from '../token.service';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [SingleUploadComponent],
  entryComponents: [SingleUploadComponent],
  providers: [TokenService]
})
export class UploadModule { }
