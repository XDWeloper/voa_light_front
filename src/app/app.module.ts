import { BrowserModule } from '@angular/platform-browser';
import {NgModule, Provider} from '@angular/core';

import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {RouterModule} from "@angular/router";
import { LoginPageComponent } from './login-page/login-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { EcounterComponent } from './ecounter/ecounter.component';
import { EditPageComponent } from './edit-page/edit-page.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AuthGuard} from "./auth.guard";
import {AuthInterceptor} from "./auth.interceptor";
import {AuthService} from "./Services/auth.service";


const INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  multi: true,
  useClass: AuthInterceptor
}

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    HomePageComponent,
    MainLayoutComponent,
    EcounterComponent,
    EditPageComponent
  ],
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    RouterModule,
    HttpClientModule,
    RouterModule.forRoot(
      [
        {
          path: '', component: MainLayoutComponent, children: [
             {path: '', redirectTo: '/login', pathMatch: 'full'},
            {path: 'login', component: LoginPageComponent, pathMatch: 'full'},
            {path: 'home', component: HomePageComponent,canActivate: [AuthGuard]},
            {path: 'edit', component: EditPageComponent,canActivate: [AuthGuard]},
          ]
        }
      ]),
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [RouterModule],
  providers: [AuthGuard,INTERCEPTOR_PROVIDER,AuthService],
  bootstrap: [AppComponent],
})
export class AppModule { }
