import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GroupService } from 'src/app/shared/group.service';

@Component({
  selector: 'app-view-progress',
  templateUrl: './view-progress.component.html',
  styleUrls: ['./view-progress.component.scss']
})
export class ViewProgressComponent implements OnInit {
  coordinatorDetails: any = {}; //For saving coordinator details
  constructor(private groupService:GroupService,private route:Router) { }

  ngOnInit(): void {
    this.groupService.getCoordinator().subscribe(result => {
      this.coordinatorDetails = result;
      console.log("Redirecting.......");
      window.location.href =  this.coordinatorDetails.reposUrl;
      this.route.navigateByUrl('/home/supervisor/root');
     });

  }

}
