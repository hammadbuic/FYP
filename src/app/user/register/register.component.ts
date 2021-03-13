import { Component, OnInit, Renderer2, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit {

  constructor(private renderer: Renderer2,public service:UserService,private toastr:ToastrService,private router:Router) { }

  ngOnInit(): void {
    this.renderer.addClass(document.querySelector('app-root'), 'register-page');
    this.service.formModel.reset();
  }
  ngOnDestroy() {
    this.renderer.removeClass(
      document.querySelector('app-root'),
      'register-page'
    );
  }
  onSubmit(){
    this.service.register().subscribe(
      (res:any)=>{
        if(res.succeeded){
          this.service.formModel.reset();
          this.toastr.success('New User added!','Registration Successfull')
          this.router.navigate(['/login'])
        }else{
          res.errors.forEach(element => {
            switch (element.code) {
              case 'DuplicateUserName':
                this.toastr.error('Username already taken','Registration Failed')
                break;

              default:
                //registration failed
                this.toastr.error(element.description,'Registration Failed')
                break;
            }
          });

        }
      },
      errorRegister=>{
        console.log(errorRegister)
      }
    )
  }

}
