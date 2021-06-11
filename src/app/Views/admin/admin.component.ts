import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  role=false;
  constructor(private service:UserService) { }

  ngOnInit(): void {
    if(this.service.roleMatch(['Admin'])){
      this.role=true;
    }
  }

}
