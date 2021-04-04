import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/shared/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {

  constructor(private renderer: Renderer2,private fb: FormBuilder, private router: Router, private toastr: ToastrService,private service: UserService) { }
  formModel = {
    Username: '',
    Password: ''
  }
  ngOnInit(): void {
    this.renderer.addClass(document.querySelector('app-root'), 'login-page');

  }
  ngOnDestroy() {
    this.renderer.removeClass(document.querySelector('app-root'), 'login-page');
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
}
