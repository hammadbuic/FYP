import { Component, OnInit, Renderer2 } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [ './login.component.scss'
  ]
})
export class LoginComponent implements OnInit {
  formModel = {
    Username: '',
    Password: ''
  }
  constructor(private renderer: Renderer2,private service: UserService, private router: Router, private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.renderer.addClass(document.querySelector('app-root'), 'login-page');
    if(localStorage.getItem('token')!=null){
      this.router.navigateByUrl('/home')
    }
  }
  onSubmit(form: NgForm) {
    this.service.login(form.value).subscribe(
      (res: any) => {
        localStorage.setItem('token', res.token);
        this.router.navigateByUrl('/home');
        this.toastr.success('Logged In Successfully', 'Login Success');
      },
      err => {
        if (err.status == 400) {
          this.toastr.error('Incorrect Username or Password', 'Authentication failed');
        } else {
          console.log(err);
        }
      })
  }
  ngOnDestroy() {
    this.renderer.removeClass(document.querySelector('app-root'), 'login-page');
  }
}
