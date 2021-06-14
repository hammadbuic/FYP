import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Router } from '@angular/router';
import { AdminService } from "src/app/shared/admin.service"
import { Users } from '../interfaces/users';
import { Observable } from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class UserService {
  readonly BaseURI = 'http://localhost:51528/api'
  private getUserProfileURL:string="/userProfile/GetUserDataForProfile/"
  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router,private adminService:AdminService) { }
  formModel = this.fb.group({
    FullName: [''],
    FatherName: [''],
    UserName: ['', Validators.required],
    Email: ['', Validators.email],
    PhoneNumber: [''],
    Address: [''],
    Program: [''],
    Designation: [''],
    Department: [''],
    Role: [''],
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
  register(getRole) {
    var body:any;
    if (getRole == "Student") {
        body = {
        FullName: this.formModel.value.FullName,
        FatherName:this.formModel.value.FatherName,
        UserName: this.formModel.value.UserName,
        Email: this.formModel.value.Email,
        PhoneNumber: this.formModel.value.PhoneNumber,
        Address:this.formModel.value.Address,
        Program:this.formModel.value.Program,
        Role: getRole,//this.formModel.value.Role,
        Password: this.formModel.value.Passwords.Password
      }
    }else if(getRole=="Supervisor"){
        body = {
        FullName: this.formModel.value.FullName,
        UserName: this.formModel.value.UserName,
        Email: this.formModel.value.Email,
        PhoneNumber: this.formModel.value.PhoneNumber,
        Designation:this.formModel.value.Designation,
        Department:this.formModel.value.Department,
        Program:this.formModel.value.Program,
        Role: getRole,//this.formModel.value.Role,
        Password: this.formModel.value.Passwords.Password
      }
    }
    console.log(body.Role)
    return this.http.post(this.BaseURI + '/ApplicationUser/Register', body)
  }
  login(formData) {
    return this.http.post(this.BaseURI + '/ApplicationUser/Login', formData)
  }
  getUserProfile():Observable<Users> {
    return this.http.get<Users>(this.BaseURI + '/UserProfile');
  }
  getProfileData():Observable<any>{
    return this.http.get(this.BaseURI+this.getUserProfileURL);
  }
  roleMatch(allowedRoles): boolean {
    var isMatch = false;
    var payload = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
    var userRole = payload.role;
    allowedRoles.forEach(element => {
      if (userRole == element) {
        isMatch = true;
        return false;
      }
    });
    return isMatch;
  }
  onLogout() {
    this.adminService.clearCache();
    localStorage.removeItem('token');
    this.router.navigate(['/login'])
  }
}
