import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {
readonly BaseURI='http://localhost:51528/api'
  constructor(private fb: FormBuilder, private http: HttpClient) { }
  formModel = this.fb.group({
    FullName: [''],
    UserName: ['', Validators.required],
    Email: ['', Validators.email],
    PhoneNumber: [''],
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
      Password: this.formModel.value.Passwords.Password
    }
    return this.http.post(this.BaseURI+'/ApplicationUser/Register',body)
  }
  login(formData){
    return this.http.post(this.BaseURI+'/ApplicationUser/Login',formData)
  }
}
