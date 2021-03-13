import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
readonly BaseURI='http://localhost:51528/api'
  constructor(private fb: FormBuilder, private http: HttpClient,private router:Router) { }
  formModel = this.fb.group({
    FullName: [''],
    UserName: ['', Validators.required],
    Email: ['', Validators.email],
    PhoneNumber: [''],
    Role:[''],
    Passwords: this.fb.group({
      Password: ['', [Validators.required, Validators.minLength(6)]],
      ConfirmPassword: ['', [Validators.required]]
    },
      { validator: this.comparePasswords })
  })
  comparePasswords(fb: FormGroup) {
    let ConfirmPasswordCtrl = fb.get('ConfirmPassword');
    if (ConfirmPasswordCtrl.errors == null || 'passwordMismatch' in ConfirmPasswordCtrl.errors) {
      if (fb.get('Password').value != ConfirmPasswordCtrl.value) {
        ConfirmPasswordCtrl.setErrors({ passwordMismatch: true });
      } else {
        ConfirmPasswordCtrl.setErrors(null);
      }
    }
  }
  register() {
    var body = {
      FullName: this.formModel.value.FullName,
      UserName: this.formModel.value.UserName,
      Email: this.formModel.value.Email,
      PhoneNumber: this.formModel.value.PhoneNumber,
      Role:this.formModel.value.Role,
      Password: this.formModel.value.Passwords.Password
    }
    console.log(body)
    return this.http.post(this.BaseURI+'/ApplicationUser/Register',body)
  }
  login(formData){
    return this.http.post(this.BaseURI+'/ApplicationUser/Login',formData)
  }
  getUserProfile(){
    return this.http.get(this.BaseURI+'/UserProfile');
  }
  roleMatch(allowedRoles):boolean{
    var isMatch=false;
    var payload=JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
    var userRole=payload.role;
    allowedRoles.forEach(element => {
      if(userRole==element){
        isMatch=true;
        return false;
      }
    });
    return isMatch;
  }
  onLogout(){
    localStorage.removeItem('token');
    this.router.navigate(['/login'])}
}
