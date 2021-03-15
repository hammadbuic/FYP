import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoordinatorRoutingModule } from './coordinator-routing.module';
import { CoordinatorComponent } from './coordinator.component';
import { ManageGroupsComponent } from './manage-groups/manage-groups.component';
import { ManageActivityComponent } from './manage-activity/manage-activity.component';
import { MaintainNewsfeedComponent } from './maintain-newsfeed/maintain-newsfeed.component';
import { ViewProgressComponent } from './view-progress/view-progress.component';


@NgModule({
  declarations: [CoordinatorComponent, ManageGroupsComponent, ManageActivityComponent, MaintainNewsfeedComponent, ViewProgressComponent],
  imports: [
    CommonModule,
    CoordinatorRoutingModule
  ]
})
export class CoordinatorModule { }
