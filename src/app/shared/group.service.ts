import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { flatMap, first, shareReplay } from "rxjs/operators";
import { Group } from "../interfaces/group";
import { StudentGroup } from "../interfaces/student-group";
@Injectable({
  providedIn: 'root'
})
export class GroupService {
  readonly BaseURL = 'http://localhost:51528/api'
  readonly GitURL='https://20.197.56.146/api/v4'
  constructor(private http: HttpClient) { }
  private groupListURL='/groups/getgroups/';
  private groupAddURL='/groups/postgroup/';
  private studentGroupAssignURL="/groups/assignstudent";
  private groupUpdateURL='/groups/putgroup/';
  private groupDeleteURL='groups/';
  private groups$:Observable<Group[]>;
  getGroups():Observable<Group[]>{
    if(!this.groups$)
    {
      this.groups$=this.http.get<Group[]>(this.BaseURL+this.groupListURL).pipe(shareReplay());
    }
    return this.groups$;
  }
  getGroupById(groupId:Number):Observable<Group>{
    return this.getGroups().pipe(flatMap(result=>result),first(group=>group.groupId==groupId));
  }
  addGroup(newGroup:Group):Observable<Group>{
    return this.http.post<Group>(this.BaseURL+this.groupAddURL,newGroup);
  }
  addStudentsToGroup(students:StudentGroup[]):Observable<StudentGroup[]>{
    return this.http.put<StudentGroup[]>(this.BaseURL+this.studentGroupAssignURL,students);
  }
  updateGroup(id:Number,updateGroup:Group):Observable<Group>{
    return this.http.put<Group>(this.BaseURL+this.groupUpdateURL+id,updateGroup);
  }
  deleteGroup(groupId:Number):Observable<any>{
    return this.http.delete(this.BaseURL+this.groupDeleteURL+groupId);
  }
  clearCache(){
    this.groups$=null;
  }
}
