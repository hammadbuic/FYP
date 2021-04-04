import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/auth/auth.guard';

import { AdminComponent } from './admin.component';
import { AssignCoordinatorComponent } from './assign-coordinator/assign-coordinator.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';

const routes: Routes = [
  //{ path: '', component: DashboardComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'assign-coordinator', component: AssignCoordinatorComponent },
  { path: 'manage-users', component: ManageUsersComponent,canActivate:[AuthGuard],data:{permittedRoles:['Admin']} },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
