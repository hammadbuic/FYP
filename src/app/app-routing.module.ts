import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { HomeComponent } from './home/home.component';
import { AdminLoginComponent } from './user/admin-login/admin-login.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { ProfileComponent } from './Views/Common/profile/profile.component';
const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  {path:':id',component:ProfileComponent},
  {
    path: 'home', component: HomeComponent, canActivate: [AuthGuard],
    children: [
    { path: 'admin', loadChildren: () => import('./Views/admin/admin.module').then(m => m.AdminModule) },
    { path: 'coordinator', loadChildren: () => import('./Views/coordinator/coordinator.module').then(m => m.CoordinatorModule) },
    { path: 'student', loadChildren: () => import('./Views/student/student.module').then(m => m.StudentModule) },
    { path: 'supervisor', loadChildren: () => import('./Views/supervisor/supervisor.module').then(m => m.SupervisorModule) },
    //{ path: '', component: DashboardComponent },
    //{path: 'blank', component: BlankComponent},
]
  },
  {path:'admin',component:AdminLoginComponent},
  { path: '**', component: ForbiddenComponent },
]


@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
