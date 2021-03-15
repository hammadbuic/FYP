import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { AssignCoordinatorComponent } from './assign-coordinator/assign-coordinator.component';


@NgModule({
  declarations: [
    AdminComponent,
    DashboardComponent,
    ManageUsersComponent,
    AssignCoordinatorComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
