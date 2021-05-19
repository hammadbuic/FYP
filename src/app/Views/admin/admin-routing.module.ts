import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/auth/auth.guard';
import { ProfileComponent } from '../Common/profile/profile.component';

import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManageStudentsComponent } from './manage-students/manage-students.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';

const routes: Routes = [
  //{ path: '', component: DashboardComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'manage-students', component: ManageStudentsComponent },
  { path: 'manage-users', component: ManageUsersComponent,canActivate:[AuthGuard],data:{permittedRoles:['Admin']} },
  {path:":id",component:ProfileComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
