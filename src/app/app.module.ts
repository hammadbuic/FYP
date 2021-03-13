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
import { DashboardComponent } from './Views/dashboard/dashboard.component';
import { BlankComponent } from './Views/blank/blank.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppButtonComponent } from './Component/app-button/app-button.component';
import { UserDropdownMenuComponent } from './home/header/user-dropdown-menu/user-dropdown-menu.component';

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
    DashboardComponent,
    BlankComponent,
    AppButtonComponent,
    UserDropdownMenuComponent,
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
  ],
  providers: [UserService,{
    provide:HTTP_INTERCEPTORS,
    useClass:AuthInterceptor,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
