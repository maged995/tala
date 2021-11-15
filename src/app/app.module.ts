/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CoreModule } from './@core/core.module';
import { ThemeModule } from './@theme/theme.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {
  NbChatModule,
  NbDatepickerModule,
  NbDialogModule,
  NbMenuModule,
  NbSidebarModule,
  NbToastrModule,
  NbWindowModule,
} from '@nebular/theme';
import { UsersComponent } from './users/users.component';
import { LoginComponent } from './users/login/login.component';
import { RegisterComponent } from './users/register/register.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import{AgmCoreModule}from'@agm/core'

import { MaterialModule } from './material/material.module';
import { LogoutComponent } from './users/logout/logout.component';
import { MatConfirmDialogComponent } from './pages/mat-confirm-dialog/mat-confirm-dialog.component';
import { Auth } from './auth/auth.interceptor';
import { RolesService } from './shared/roles.service';
import {NgxPrintModule} from 'ngx-print';
import { ChartsModule } from 'ng2-charts';
import { MatContentDialogComponent } from './pages/mat-content-dialog/mat-content-dialog.component';
import { TestComponent } from './test/test.component';





@NgModule({
  declarations: [AppComponent, UsersComponent, LoginComponent
  ,MatConfirmDialogComponent, RegisterComponent,MatContentDialogComponent, LogoutComponent, TestComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    NgxPrintModule,
    ChartsModule,
FormsModule,
AgmCoreModule.forRoot({
  apiKey:'AIzaSyAzzd8__4jGhbCM_csy-I2-pt82_jP9uRg'
}),
ReactiveFormsModule,
NgSelectModule,
MaterialModule,
    ThemeModule.forRoot(),

    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbDialogModule.forRoot(),
    NbWindowModule.forRoot(),
    NbToastrModule.forRoot(),
    NbChatModule.forRoot({
      messageGoogleMapKey: 'AIzaSyA_wNuCzia92MAmdLRzmqitRGvCF7wCZPY',
    }),
    CoreModule.forRoot(),


  ],
  providers:[{provide:HTTP_INTERCEPTORS,useClass:Auth,multi:true},RolesService],
  bootstrap: [AppComponent],
  entryComponents:[MatConfirmDialogComponent,MatContentDialogComponent]
})
export class AppModule {
}
