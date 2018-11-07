import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverviewComponent } from './overview/overview.component';
import { DetailComponent } from './detail/detail.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [OverviewComponent, DetailComponent]
})
export class SearchModule { }
