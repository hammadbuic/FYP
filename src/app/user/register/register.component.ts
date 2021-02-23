import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit {

  constructor(public service:UserService,private toastr:ToastrService) { }

  ngOnInit(): void {
    this.service.formModel.reset();
  }
  onSubmit(){
    this.service.register().subscribe(
      (res:any)=>{
        if(res.succeeded){
          this.service.formModel.reset();
          this.toastr.success('New User added!','Registration Successfull')
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
