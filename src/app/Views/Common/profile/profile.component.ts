import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from 'src/app/interfaces/student';
import { Supervisor } from 'src/app/interfaces/supervisor';
import { AdminService } from 'src/app/shared/admin.service';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  @Input() supervisor:Supervisor;
  @Input() student:Student;
  constructor(
    private route:ActivatedRoute,
    private router:Router,
    private service:AdminService,
  ) { }

  ngOnInit(): void {
    let id=this.route.snapshot.params['id'];
    if(this.service.getSupervisorById(id) != null){
      this.service.getSupervisorById(id).subscribe(
        result=>{
          this.supervisor=result;
        }
      )
    }
    if(this.service.getStudentById(id) != null){
      this.service.getStudentById(id).subscribe(
        result=>{
          this.student=result;
        }
      )
    }
  }
  onClick(){
    this.router.navigateByUrl("/home/admin/root");
  }
}
