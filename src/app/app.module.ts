import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './user/register/register.component';
import { ReactiveFormsModule,FormsModule } from '@angular/forms'
import { UserService } from './shared/user.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
import { LoginComponent } from './user/login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { FooterComponent } from './home/footer/footer.component';
import { HeaderComponent } from './home/header/header.component';
import { MenuSidebarComponent } from './home/menu-sidebar/menu-sidebar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppButtonComponent } from './Component/app-button/app-button.component';
import { UserDropdownMenuComponent } from './home/header/user-dropdown-menu/user-dropdown-menu.component';
import { AdminLoginComponent } from './user/admin-login/admin-login.component';
import { DataTablesModule } from 'angular-datatables';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AdminService } from './shared/admin.service';
import { ProfileComponent } from './Views/Common/profile/profile.component';
import { SelectDropDownModule } from 'ngx-select-dropdown'
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
//import { AssignCoordinatorComponent } from './Modules/Admin/assign-coordinator/assign-coordinator.component';


@NgModule({
  declarations: [
    AppComponent,

    RegisterComponent,
    LoginComponent,
    HomeComponent,
    ForbiddenComponent,
    FooterComponent,
    HeaderComponent,
    MenuSidebarComponent,
    AppButtonComponent,
    UserDropdownMenuComponent,
    AdminLoginComponent,
    ProfileComponent,
    //AssignCoordinatorComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot({progressBar:true}), // ToastrModule added
    FormsModule,
    NgbModule,
    DataTablesModule,
    SelectDropDownModule,
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),
  ],
  providers: [UserService,{
    provide:HTTP_INTERCEPTORS,
    useClass:AuthInterceptor,
    multi:true
  },
  AdminService
],
  bootstrap: [AppComponent]
})
export class AppModule { }
