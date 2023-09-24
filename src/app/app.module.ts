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



@NgModule({
  declarations: [
    AppComponent,
    CircuitListComponent,
    CircuitDialogComponent,
    CircuitCreateComponent,
    ArretCreateComponent,
    ArretListComponent,
    MapPopoverComponent,
    LoginComponent
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
