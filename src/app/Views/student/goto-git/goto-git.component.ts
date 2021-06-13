import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Student } from 'src/app/interfaces/student';
import { StudentService } from 'src/app/shared/student.service';

@Component({
  selector: 'app-goto-git',
  templateUrl: './goto-git.component.html',
  styleUrls: ['./goto-git.component.scss']
})
export class GotoGitComponent implements OnInit {
  studentDetails$:Promise<Student>;
  constructor(private studentService:StudentService,private route:Router) { }

  ngOnInit(): void {
    this.studentDetails$=this.studentService.studentSpec;
    this.studentDetails$.then(result=>{
      window.location.href = result.webURL;
      this.route.navigateByUrl('/home/student/root');
    })
  }

}
