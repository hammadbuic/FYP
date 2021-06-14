import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Group } from 'src/app/interfaces/group';
import { SupervisorService } from 'src/app/shared/supervisor.service';

@Component({
  selector: 'app-view-group',
  templateUrl: './view-group.component.html',
  styleUrls: ['./view-group.component.scss']
})
export class ViewGroupComponent implements OnInit {
  Groups$:Observable<Group[]>;
  Groups:Group[]=[]
  constructor(private supervisorService:SupervisorService,private router:Router) { }

  ngOnInit(): void {
    this.Groups$=this.supervisorService.getGroupsOfSupervisor();
    this.Groups$.subscribe(result=>{
      this.Groups=result;
      console.log(result);
    })
  }
  onClick(){
    this.router.navigateByUrl('home/supervisor/root');
  }
  redirectToGit(link:string){
    window.location.href =  link;
    this.router.navigateByUrl('home/supervisor/root');
  }
}
