import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainLoginComponent } from './main-login/main-login.component';

@NgModule({
  imports: [CommonModule],
  declarations: [MainLoginComponent],
  entryComponents: [MainLoginComponent]
})
export class LoginModule { }
