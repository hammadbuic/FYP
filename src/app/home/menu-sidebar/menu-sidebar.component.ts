import { Component, OnInit,AfterViewInit,ViewChild,Output,EventEmitter, } from '@angular/core';

@Component({
  selector: 'app-menu-sidebar',
  templateUrl: './menu-sidebar.component.html',
  styleUrls: ['./menu-sidebar.component.scss']
})
export class MenuSidebarComponent implements OnInit , AfterViewInit{
  @ViewChild('mainSidebar', { static: false }) mainSidebar;
  @Output() mainSidebarHeight: EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }
  ngAfterViewInit() {
    this.mainSidebarHeight.emit(this.mainSidebar.nativeElement.offsetHeight);
  }
}
