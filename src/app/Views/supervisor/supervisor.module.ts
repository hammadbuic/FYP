import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SupervisorRoutingModule } from './supervisor-routing.module';
import { SupervisorComponent } from './supervisor.component';
import { ViewGroupComponent } from './view-group/view-group.component';
import { SeeDocsComponent } from './see-docs/see-docs.component';
import { GotoGitlabComponent } from './goto-gitlab/goto-gitlab.component';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { NgxSpinnerModule } from "ngx-spinner";

@NgModule({
  declarations: [SupervisorComponent, ViewGroupComponent, SeeDocsComponent, GotoGitlabComponent],
  imports: [
    CommonModule,
    SupervisorRoutingModule,
    AccordionModule,
    NgxSpinnerModule
  ]
})
export class SupervisorModule { }
