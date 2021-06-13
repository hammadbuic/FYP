import { Injectable } from '@angular/core';
import { flatMap, first, shareReplay } from "rxjs/operators";
import { Observable } from "rxjs";
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Supervisor } from '../interfaces/supervisor';
import { Group } from '../interfaces/group';

@Injectable({
  providedIn: 'root'
})
export class SupervisorService {
  readonly BaseURL = 'http://localhost:51528/api'
  private getSupervisorDataURL:string="/supervisor/getsupervisor";
  private getGroupsBySupervisorURL:string='/groups/GetGroupsBySupervisor'
  public supervisorSpec:Promise<Supervisor>;
  private group$:Observable<Group[]>
  constructor(private http:HttpClient) {
    this.supervisorSpec=this.getSupervisor();
   }
   async getSupervisor(){
     return await this.http.get<Supervisor>(this.BaseURL+this.getSupervisorDataURL).toPromise()
   }
   getGroupsOfSupervisor():Observable<Group[]>{
     if(this.group$==null){
      this.group$= this.http.get<Group[]>(this.BaseURL+this.getGroupsBySupervisorURL)
     }
     return this.group$;
   }
}
