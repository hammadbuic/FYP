import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';


import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { AssignCoordinatorComponent } from './assign-coordinator/assign-coordinator.component';
import { SupervisorDetailsComponent } from './supervisor-details/supervisor-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AdminComponent,
    DashboardComponent,
    ManageUsersComponent,
    AssignCoordinatorComponent,
    SupervisorDetailsComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
    ModalModule,ToastrModule.forRoot()
  ]
})
export class AdminModule { }
