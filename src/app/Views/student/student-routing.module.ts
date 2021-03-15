import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GotoGitComponent } from './goto-git/goto-git.component';

import { StudentComponent } from './student.component';
import { SubmitDocsComponent } from './submit-docs/submit-docs.component';
import { ViewNewsfeedComponent } from './view-newsfeed/view-newsfeed.component';
import { ViewProjectActivityComponent } from './view-project-activity/view-project-activity.component';

const routes: Routes = [
  { path: '', component: StudentComponent },
  { path: 'goto-git', component: GotoGitComponent },
  { path: 'submit-docs', component: SubmitDocsComponent },
  { path: 'view-newsfeed', component: ViewNewsfeedComponent },
  { path: 'view-project-activity', component: ViewProjectActivityComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
