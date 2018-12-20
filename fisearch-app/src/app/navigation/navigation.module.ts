import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { RouterModule, Routes } from '@angular/router';
import { TokenService } from '../token.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
  ],
  declarations: [NavigationBarComponent],
  exports: [NavigationBarComponent],
  providers: [TokenService]
})
export class NavigationModule { }
