import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainLoginComponent } from './main-login/main-login.component';
import { FormsModule } from '@angular/forms';
import { TokenService } from '../token.service';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [MainLoginComponent],
  entryComponents: [MainLoginComponent],
  providers: [TokenService]
})
export class LoginModule { }
