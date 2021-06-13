import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Student } from '../interfaces/student';
import { flatMap, first, shareReplay } from "rxjs/operators";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  readonly BaseURL = 'http://localhost:51528/api'
  private getStudentDataURL:string="/student/getStudent";
  public studentSpec:Promise<Student>;
  constructor(private http:HttpClient) {
    this.studentSpec=this.getStudentInformation();
  }
   //get student information
   async getStudentInformation(){
    return await this.http.get<Student>(this.BaseURL+this.getStudentDataURL).toPromise();
  }
}
