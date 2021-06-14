import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { StudentComponent } from './student.component';
import { ViewProjectActivityComponent } from './view-project-activity/view-project-activity.component';
import { ViewNewsfeedComponent } from './view-newsfeed/view-newsfeed.component';
import { SubmitDocsComponent } from './submit-docs/submit-docs.component';
import { GotoGitComponent } from './goto-git/goto-git.component';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { NgxSpinnerModule } from "ngx-spinner";

@NgModule({
  declarations: [StudentComponent, ViewProjectActivityComponent, ViewNewsfeedComponent, SubmitDocsComponent, GotoGitComponent],
  imports: [
    CommonModule,
    StudentRoutingModule,
    AccordionModule,
    NgxSpinnerModule,
  ]
})
export class StudentModule { }
