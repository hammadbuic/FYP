import { Component, OnInit,AfterViewInit,ViewChild,Output,EventEmitter, } from '@angular/core';
import {adminList, MenuItem,} from "./menu-component";
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-menu-sidebar',
  templateUrl: './menu-sidebar.component.html',
  styleUrls: ['./menu-sidebar.component.scss']
})
export class MenuSidebarComponent implements OnInit , AfterViewInit{
  sideItems;
  @ViewChild('mainSidebar', { static: false }) mainSidebar;
  @Output() mainSidebarHeight: EventEmitter<any> = new EventEmitter<any>();
  constructor(private service:UserService) { }

  ngOnInit(): void {
    if(this.service.roleMatch(['Admin'])){
      this.sideItems=adminList;
    }
    /*if(this.service.roleMatch(['Coordinator'])){
      this.sideItems=coordinatorList;
    }
    if(this.service.roleMatch(['Student'])){
      this.sideItems=studentList;
    }
    if(this.service.roleMatch(['Supervisor'])){
      this.sideItems=supervisorList;
    }*/
  }
  ngAfterViewInit() {
    this.mainSidebarHeight.emit(this.mainSidebar.nativeElement.offsetHeight);
  }
}
