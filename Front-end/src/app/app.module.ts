import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';

import { LayoutComponent } from '@app/_components/layout/layout.component';

import { AppComponent } from './app.component';
import { ComponentModule } from '@app/_components/component.module';
import { ToastsContainer } from '@app/_services/toasts-container.component';
import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { MatTableModule } from '@angular/material/table';
import { ValidationColorDirective } from './_directives/validation-color.directive';
import { ThunghiemComponent } from './thunghiem/thunghiem.component';
import { TrangchuComponent } from './trangchu/trangchu.component';
import { Thunghiem1Component } from './thunghiem1/thunghiem1.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HethongComponent } from './hethong/hethong.component';
import { FooterviewComponent } from './footerview/footerview.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    ToastsContainer,
    ValidationColorDirective,
    ThunghiemComponent,
    TrangchuComponent,
    Thunghiem1Component,
    DashboardComponent,
    HethongComponent,
    FooterviewComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentModule,
    CommonModule,
    NgbModule,
    AppRoutingModule,
    MatTableModule,
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
