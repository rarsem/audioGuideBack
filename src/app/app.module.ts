import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CircuitListComponent } from './circuit-list/circuit-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CircuitDialogComponent } from './circuit-dialog/circuit-dialog.component';
import { AngularMaterialModule } from './material-modules';
import { FormsModule } from '@angular/forms';
import { CircuitCreateComponent } from './circuit-create/circuit-create.component';
import { ArretCreateComponent } from './arret-create/arret-create.component';
import { ArretListComponent } from './arret-list/arret-list.component';
import { MapPopoverComponent } from './map-popover/map-popover.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HeaderComponent } from './header/header.component';
import { ListAutorizedComponent } from './list-autorized/list-autorized.component';
import { AuthorizationDialogComponent } from './authorization-dialog/authorization-dialog.component';
import { ApiVersionComponent } from './api-version/api-version.component';


@NgModule({
  declarations: [
    AppComponent,
    CircuitListComponent,
    CircuitDialogComponent,
    CircuitCreateComponent,
    ArretCreateComponent,
    ArretListComponent,
    MapPopoverComponent,
    LoginComponent,
    SignupComponent,
    HeaderComponent,
    ListAutorizedComponent,
    AuthorizationDialogComponent,
    ApiVersionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
