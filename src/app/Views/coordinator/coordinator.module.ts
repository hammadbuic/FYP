import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ToastrModule } from 'ngx-toastr';
import { CoordinatorRoutingModule } from './coordinator-routing.module';
import { CoordinatorComponent } from './coordinator.component';
import { ManageGroupsComponent } from './manage-groups/manage-groups.component';
import { ManageActivityComponent } from './manage-activity/manage-activity.component';
import { MaintainNewsfeedComponent } from './maintain-newsfeed/maintain-newsfeed.component';
import { ViewProgressComponent } from './view-progress/view-progress.component';
import { ViewGroupComponent } from './view-group/view-group.component';
import { SeeDocsComponent } from './see-docs/see-docs.component';
import { GotoGitlabComponent } from './goto-gitlab/goto-gitlab.component';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import { AccordionModule } from 'ngx-bootstrap/accordion';
@NgModule({
  declarations: [CoordinatorComponent, ManageGroupsComponent, ManageActivityComponent, MaintainNewsfeedComponent, ViewProgressComponent, ViewGroupComponent, SeeDocsComponent, GotoGitlabComponent],
  imports: [
    CommonModule,
    CoordinatorRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
    SelectDropDownModule,
    AccordionModule,
    BsDatepickerModule.forRoot(),
    ModalModule,ToastrModule.forRoot()
  ]
})
export class CoordinatorModule { }
