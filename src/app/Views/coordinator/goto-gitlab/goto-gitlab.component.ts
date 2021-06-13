import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Coordinator } from 'src/app/interfaces/coordinator';
import { Supervisor } from 'src/app/interfaces/supervisor';
import { CoordinatorService } from 'src/app/shared/coordinator.service';
import { SupervisorService } from 'src/app/shared/supervisor.service';

@Component({
  selector: 'app-goto-gitlab',
  templateUrl: './goto-gitlab.component.html',
  styleUrls: ['./goto-gitlab.component.scss']
})
export class GotoGitlabComponent implements OnInit {
  supervisorDetails$:Promise<Supervisor>;
  constructor(private supervisorService:SupervisorService,private route:Router) { }

  ngOnInit(): void {
    this.supervisorDetails$=this.supervisorService.supervisorSpec;
    this.supervisorDetails$.then(result=>{
      console.log("Redirecting.......");
      window.location.href =  result.webURL;
      this.route.navigateByUrl('/home/supervisor/root');
    })
  }

}
