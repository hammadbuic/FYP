import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from "@angular/common/http";
import { Supervisor } from '../interfaces/supervisor';
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
  private supervisorAddURL: string = "/admin/insertSupervisor/";
  private supervisorUpdateURL: string = "/admin/updateSupervisor/";
  private supervisorDeleteURL: string = "/admin/deleteSupervisor/";
  private assignCoordinatorURL:string="/admin/makeCoordinator/";
  private gitUserCreationURL:string="/users";
  private supervisors$: Observable<Supervisor[]>;
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
  assignCoordinator(coordinator:Coordinator):Observable<Coordinator>{
    return this.http.post<Coordinator>(this.BaseURL+this.assignCoordinatorURL,coordinator);
  }
  //creating gitlab account
  createGitSupervisor(supervisor:any):Observable<any>{
    // const httpHeaders=new HttpHeaders({
    //   'Authorization':'493rDyBuzt4iVLAYpfbH'
    // });
    return this.http.post<any>('@api-x/'+this.GitURL+this.gitUserCreationURL,supervisor);
  }
  //clear cache
  clearCache() {
    this.supervisors$=null;
  }
}
