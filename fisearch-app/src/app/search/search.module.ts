import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverviewComponent } from './overview/overview.component';
import { DetailComponent } from './detail/detail.component';
import { FormsModule } from '@angular/forms';
import { TokenService } from '../token.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
  ],
  declarations: [OverviewComponent, DetailComponent],
  providers: [TokenService]
})
export class SearchModule { }
