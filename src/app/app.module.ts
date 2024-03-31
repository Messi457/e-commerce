import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FrontRoutingModule } from './front/front-routing.module';
import { DemoMaterialModule } from './share/material-module';
import { FormsModule } from '@angular/forms';
import { AdminModule } from './admin/admin.module';
import { DialogComponent } from './share/dialog/dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    DialogComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FrontRoutingModule,
    AdminModule,
    BrowserAnimationsModule,
    DemoMaterialModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
