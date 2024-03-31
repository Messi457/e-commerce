import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DemoMaterialModule } from '../share/material-module';
import { AdminRoutingModule } from './admin-routing.module';
import { ProductsComponent } from './products/products/products.component';
import { ProductAdeditComponent } from './products/product-adedit/product-adedit.component';
import { BannersComponent } from './banners/banners/banners.component';
import { BannerAdeditComponent } from './banners/banner-adedit/banner-adedit.component';
import { AdminsComponent } from './admins/admins/admins.component';
import { AdminAdeditComponent } from './admins/admin-adedit/admin-adedit.component';
import { UsersComponent } from './users/users/users.component';
import { UserAdeditComponent } from './users/user-adedit/user-adedit.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound/pagenotfound.component';
import { LoginComponent } from './login/login/login.component';
import { TopLeftComponent } from './top-left/top-left.component';
import { UploadsComponent } from './uploads/uploads.component';


@NgModule({
  declarations: [
    ProductsComponent,
    ProductAdeditComponent,
    BannersComponent,
    BannerAdeditComponent,
    AdminsComponent,
    AdminAdeditComponent,
    UsersComponent,
    UserAdeditComponent,
    DashboardComponent,
    PagenotfoundComponent,
    LoginComponent,
    TopLeftComponent,
    UploadsComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    DemoMaterialModule,
  ]
})
export class AdminModule { }
