import { Component, OnInit,AfterViewInit,ViewChild,Output,EventEmitter, } from '@angular/core';
import {adminList, MenuItem,coordinatorList,studentList,supervisorList} from "./menu-component";
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-menu-sidebar',
  templateUrl: './menu-sidebar.component.html',
  styleUrls: ['./menu-sidebar.component.scss']
})
export class MenuSidebarComponent implements OnInit , AfterViewInit{
  sideItems;
  role=null;
  @ViewChild('mainSidebar', { static: false }) mainSidebar;
  @Output() mainSidebarHeight: EventEmitter<any> = new EventEmitter<any>();
  constructor(private service:UserService) { }

  ngOnInit(): void {
    if(this.service.roleMatch(['Admin'])){
      this.sideItems=adminList;
      this.role="./admin/";
    }
    if(this.service.roleMatch(['Coordinator'])){
      this.sideItems=coordinatorList;
      this.role="./coordinator/";
    }
    if(this.service.roleMatch(['Student'])){
      this.sideItems=studentList;
      this.role="./student/";
    }
    if(this.service.roleMatch(['Supervisor'])){
      this.sideItems=supervisorList;
      this.role="./supervisor/"
    }
  }
  ngAfterViewInit() {
    this.mainSidebarHeight.emit(this.mainSidebar.nativeElement.offsetHeight);
  }
}
