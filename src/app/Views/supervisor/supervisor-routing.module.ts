import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GotoGitlabComponent } from './goto-gitlab/goto-gitlab.component';
import { SeeDocsComponent } from './see-docs/see-docs.component';

import { SupervisorComponent } from './supervisor.component';
import { ViewGroupComponent } from './view-group/view-group.component';

const routes: Routes = [
  { path: 'root', component: SupervisorComponent },
  { path: 'goto-gitlab', component: GotoGitlabComponent },
  { path: 'see-docs', component: SeeDocsComponent },
  { path: 'view-group', component: ViewGroupComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupervisorRoutingModule { }
