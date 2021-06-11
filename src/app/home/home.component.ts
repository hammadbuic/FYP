import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public sidebarMenuOpened = false;
  @ViewChild('contentWrapper', { static: false }) contentWrapper;

  constructor(private renderer: Renderer2,private router:Router,private service:UserService) { }
  ngOnInit(): void {
    this.renderer.removeClass(document.querySelector('app-root'), 'login-page');
    this.renderer.removeClass(
      document.querySelector('app-root'),
      'register-page'
    );
    if(this.service.roleMatch(['Admin'])){
      this.router.navigateByUrl('home/admin/root');
    }
    if(this.service.roleMatch(['Coordinator'])){
      this.router.navigateByUrl('home/coordinator/root');
    }
    if(this.service.roleMatch(['Supervisor'])){
      this.router.navigateByUrl('home/supervisor/root')
    }
    if(this.service.roleMatch(['Student'])){
      this.router.navigateByUrl('home/student/root');
    }
  }
  mainSidebarHeight(height) {
     this.renderer.setStyle(
       this.contentWrapper.nativeElement,
       'min-height',
       height -20 + 'px'
     );
  }
  toggleMenuSidebar() {
    if (this.sidebarMenuOpened) {
      this.renderer.removeClass(
        document.querySelector('app-root'),
        'sidebar-open'
      );
      this.renderer.addClass(
        document.querySelector('app-root'),
        'sidebar-collapse'
      );
      this.sidebarMenuOpened = false;
    } else {
      this.renderer.removeClass(
        document.querySelector('app-root'),
        'sidebar-collapse'
      );
      this.renderer.addClass(
        document.querySelector('app-root'),
        'sidebar-open'
      );
      this.sidebarMenuOpened = true;
    }
  }
}
