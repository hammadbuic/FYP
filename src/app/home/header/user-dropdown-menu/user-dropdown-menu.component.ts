import { Component, OnInit, ViewChild,HostListener,ElementRef,Renderer2,} from '@angular/core';
import { Toast, ToastrService } from 'ngx-toastr';
import {UserService} from "src/app/shared/user.service"

@Component({
  selector: 'app-user-dropdown-menu',
  templateUrl: './user-dropdown-menu.component.html',
  styleUrls: ['./user-dropdown-menu.component.css']
})
export class UserDropdownMenuComponent implements OnInit {
  @ViewChild('dropdownMenu', { static: false }) dropdownMenu;
  @HostListener('document:click', ['$event'])
  image='assets/img/user2-160x160.jpg'
  userDetails;
  clickout(event) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.hideDropdownMenu();
    }
  }
  constructor(private elementRef: ElementRef, private renderer: Renderer2,private services:UserService,private toast:ToastrService) { }

  ngOnInit(): void {
    this.services.getUserProfile().subscribe(
      res =>{this.userDetails=res;
      console.log(this.userDetails)},
      err =>{console.log(err);
        this.toast.error('Unable to retrieve user information','Error')
      }
    )
  }
  toggleDropdownMenu() {
    if (this.dropdownMenu.nativeElement.classList.contains('show')) {
      this.hideDropdownMenu();
    } else {
      this.showDropdownMenu();
    }
  }

  showDropdownMenu() {
    this.renderer.addClass(this.dropdownMenu.nativeElement, 'show');
  }

  hideDropdownMenu() {
    this.renderer.removeClass(this.dropdownMenu.nativeElement, 'show');
  }
  logout(){this.services.onLogout();}
}
