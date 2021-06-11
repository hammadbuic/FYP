import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from "@angular/common/http";
import { Supervisor } from '../interfaces/supervisor';
import { Student } from '../interfaces/student';
import { Observable } from "rxjs";
import { flatMap, first, shareReplay } from "rxjs/operators";
import { Coordinator } from '../interfaces/coordinator';
@Injectable({
  providedIn: 'root'
})
export class AdminService {
  readonly BaseURL = 'http://localhost:51528/api'
  readonly GitURL='https://20.197.56.146/api/v4'
  constructor(private http: HttpClient) { }
  private supervisorListURL: string = "/admin/getsupervisors/";
  private studentListURL:string="/admin/getstudents/";
  private supervisorAddURL: string = "/admin/insertSupervisor/";
  private studentAddURL:string="/admin/insertstudent/"
  private supervisorUpdateURL: string = "/admin/updateSupervisor/";
  private studentUpdateURL:string="/admin/updatestudent/";
  private supervisorDeleteURL: string = "/admin/deleteSupervisor/";
  private studentDeleteURL:string="/admin/deletestudent/";
  private assignCoordinatorURL:string="/admin/makeCoordinator/";
  private createGroupURL:string="/groups";
  private gitUserCreationURL:string="/users";
  private createRepoCoordinatorURL="/projects/";
  private deleteGitUserURL="/users/"
  private supervisors$: Observable<Supervisor[]>;
  private students$:Observable<Student[]>;
  //GEt all the supervisor
  getSupervisors(): Observable<Supervisor[]> {
    //if cache not exist
    if(!this.supervisors$){
      this.supervisors$=this.http.get<Supervisor[]>(this.BaseURL+this.supervisorListURL).pipe(shareReplay());
    }
    //if cache exist return it
    return this.supervisors$;
  }
  //get supervisor by id
  getSupervisorById(id:string): Observable<Supervisor> {
    return this.getSupervisors().pipe(flatMap(result=>result),first(supervisor=>supervisor.id == id));
  }
  //insert a Supervisor
  insertSupervisor(newSupervisor: Supervisor): Observable<Supervisor> {
    return this.http.post<Supervisor>(this.BaseURL+this.supervisorAddURL,newSupervisor);
  }
  //Update a supervisor
  updateSupervisor(id: string, editSupervisor: Supervisor): Observable<Supervisor> {
    return this.http.put<Supervisor>(this.BaseURL+this.supervisorUpdateURL+id,editSupervisor);
  }
  //Delete a Supervisor
  deleteSupervisor(id: string,): Observable<any> {
    return this.http.delete(this.BaseURL+this.supervisorDeleteURL+id);
  }
  //assign coordinator role to a supervisor
  assignCoordinator(coordinator:any):Observable<any>{
    return this.http.post<any>(this.BaseURL+this.assignCoordinatorURL,coordinator);
  }
  //create group with section name from coordinator
  createGitGroup(group:any):Observable<any>{
    return this.http.post<any>('@api-x/'+this.GitURL+this.createGroupURL,group);
  }
  //create repository for coordinator
  createReposCordinator(repo:any):Observable<any>{
    return this.http.post<any>('@api-x/'+this.GitURL+this.createRepoCoordinatorURL,repo);
  }
  //creating gitlab account
  createGitSupervisor(supervisor:any):Observable<any>{
    // const httpHeaders=new HttpHeaders({
    //   'Authorization':'493rDyBuzt4iVLAYpfbH'
    // });
    return this.http.post<any>('@api-x/'+this.GitURL+this.gitUserCreationURL,supervisor);
  }
  //GEt all the students
  getStudents(): Observable<Student[]> {
    //if cache not exist
    if(!this.students$){
      this.students$=this.http.get<Student[]>(this.BaseURL+this.studentListURL).pipe(shareReplay());
    }
    //if cache exist return it
    return this.students$;
  }
  //get student by id
  getStudentById(id:string): Observable<Student> {
    return this.getStudents().pipe(flatMap(result=>result),first(student=>student.id == id));
  }
  //insert a student
  insertStudent(newStudent: Student): Observable<Student> {
    return this.http.post<Student>(this.BaseURL+this.studentAddURL,newStudent);
  }
  //Update a student
  updateStudent(id: string, editStudent: Student): Observable<Student> {
    return this.http.put<Student>(this.BaseURL+this.studentUpdateURL+id,editStudent);
  }
  //Delete a Student
  deleteStudent(id: string,): Observable<any> {
    return this.http.delete(this.BaseURL+this.studentDeleteURL+id);
  }
  //creating gitlab account
  createGitStudent(student:any):Observable<any>{
    // const httpHeaders=new HttpHeaders({
    //   'Authorization':'493rDyBuzt4iVLAYpfbH'
    // });
    return this.http.post<any>('@api-x/'+this.GitURL+this.gitUserCreationURL,student);
  }
  //delete git supervisor
  deleteGitUser(id:Number):Observable<any>{
    return this.http.delete('@api-x/'+this.GitURL+this.deleteGitUserURL+id);
  }
  //clear student cache
  clearStudentCache(){
    this.students$=null;
  }
  //clear cache
  clearCache() {
    this.supervisors$=null;
  }
}
