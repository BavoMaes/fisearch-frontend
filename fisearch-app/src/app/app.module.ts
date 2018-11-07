import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { NavigationModule } from './navigation/navigation.module';
import { LoginModule } from './login/login.module';
import { UploadModule } from './upload/upload.module';
import { HomeModule } from './home/home.module';
import { SearchModule } from './search/search.module';

import { AppComponent } from './app.component';
import { MainLoginComponent } from './login/main-login/main-login.component';
import { SingleUploadComponent } from './upload/single-upload/single-upload.component';
import { MainHomeComponent } from './home/main-home/main-home.component';
import { OverviewComponent } from './search/overview/overview.component';

const appRoutes: Routes = [
  { path: 'home', redirectTo: '', pathMatch: 'full' },
  { path: 'login', component: MainLoginComponent },
  { path: 'upload', component: SingleUploadComponent },
  { path: '', component: MainHomeComponent },
  { path: 'search', component: OverviewComponent },
];

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    LoginModule,
    NavigationModule,
    UploadModule,
    HomeModule,
    SearchModule,
    RouterModule.forRoot(
      appRoutes
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
