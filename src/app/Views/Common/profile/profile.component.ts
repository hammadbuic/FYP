import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Supervisor } from 'src/app/interfaces/supervisor';
import { AdminService } from 'src/app/shared/admin.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  @Input() supervisor:Supervisor
  constructor(
    private route:ActivatedRoute,
    private router:Router,
    private service:AdminService
  ) { }

  ngOnInit(): void {
    let id=this.route.snapshot.params['id'];
    this.service.getSupervisorById(id).subscribe(
      result=>{
        this.supervisor=result;
      }
    )
  }

}
