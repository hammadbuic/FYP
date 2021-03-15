import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CoordinatorComponent } from './coordinator.component';
import { MaintainNewsfeedComponent } from './maintain-newsfeed/maintain-newsfeed.component';
import { ManageActivityComponent } from './manage-activity/manage-activity.component';
import { ManageGroupsComponent } from './manage-groups/manage-groups.component';
import { ViewProgressComponent } from './view-progress/view-progress.component';

const routes: Routes = [
  { path: '', component: CoordinatorComponent },
  { path: 'maintain-newsfeed', component: MaintainNewsfeedComponent },
  { path: 'manage-activity', component: ManageActivityComponent },
  { path: 'manage-groups', component: ManageGroupsComponent },
  { path: 'view-progress', component: ViewProgressComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoordinatorRoutingModule { }
