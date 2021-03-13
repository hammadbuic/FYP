import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { BlankComponent } from './Views/blank/blank.component';
import { DashboardComponent } from './Views/dashboard/dashboard.component';
const routes: Routes = [
  { path: '', redirectTo: '/login' ,pathMatch:'full'},
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  {path: 'home',component:HomeComponent,canActivate:[AuthGuard],
    children:[{path:'',component:DashboardComponent},{
    path: 'blank',component: BlankComponent,
  }]},
  { path: 'forbidden',component:ForbiddenComponent},
  //{path:'assignCoordinator',loadChildren:()=>import('./Modules/Admin/assign-coordinator/assign-coordinator.module').then(m=>m.AssignCoordinatorModule)}
//{path:'home',component:HomeComponent,children:[{path:'blank',component:BlankComponent},{path:'',component:DashboardComponent}]}
]


@NgModule({
  imports: [RouterModule.forRoot(routes,{relativeLinkResolution:'legacy'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
