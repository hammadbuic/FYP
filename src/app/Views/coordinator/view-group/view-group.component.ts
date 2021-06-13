import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Group } from 'src/app/interfaces/group';
import { SupervisorService } from 'src/app/shared/supervisor.service';

@Component({
  selector: 'app-view-group',
  templateUrl: './view-group.component.html',
  styleUrls: ['./view-group.component.scss']
})
export class ViewGroupComponent implements OnInit {
  groups$:Observable<Group[]>;
  constructor(private supervisorService:SupervisorService) { }

  ngOnInit(): void {
    this.supervisorService.getGroupsOfSupervisor().subscribe(result=>{
      console.log(result)
    },
    error=>{console.log("CAN'T GET GROUPS")})
  }

}
