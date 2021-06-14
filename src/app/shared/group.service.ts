import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { flatMap, first, shareReplay } from "rxjs/operators";
import { Group } from "../interfaces/group";
import { StudentGroup } from "../interfaces/student-group";
import { Student } from '../interfaces/student';
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
  private groupDeleteURL='/groups/';
  private getStudentsByGroupURL='/groups/getStudentsByGroup/';
  private updateStudentsByGroupURL='/groups/updateStudentsByGroupId/';
  private getCoordinatorURL='/coordinator/GetCoordinator/';
  private gitProjectCreationURL='/projects/';
  private assignMembersOnGitURL='/members/';
  private getGroupByStudentURL='/groups/GetGroupsByStudent';
  private getGroupBySupervisorURL='/groups/getgroupsbysupervisor';
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
  getStudentsByGroup(groupId:Number):Observable<Student[]>{
    return this.http.get<Student[]>(this.BaseURL+this.getStudentsByGroupURL+groupId);
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
  updateStudentsInGroup(groupId:Number,students:StudentGroup[]):Observable<StudentGroup[]>{
    return this.http.put<StudentGroup[]>(this.BaseURL+this.updateStudentsByGroupURL+groupId,students);
  }
  deleteGroup(groupId:Number):Observable<any>{
    return this.http.delete(this.BaseURL+this.groupDeleteURL+groupId);
  }
  //For creating a project inside group
  createGitProject(project:any):Observable<any>{
    return this.http.post<any>('@api-x/'+this.GitURL+this.gitProjectCreationURL,project);
  }
  //Deleting git project
  deleteGitProject(gitProjectId):Observable<any>{
    return this.http.delete('@api-x/'+this.GitURL+this.gitProjectCreationURL+gitProjectId);
  }
  //getting coordinator details from coordinator table
  getCoordinator():Observable<any>{
    return this.http.get<any>(this.BaseURL+this.getCoordinatorURL);
  }
  //assigning students on git repository
  assignMembersOnGitRepo(gitRepoId:Number,assignStudentGit:any):Observable<any>{
    return this.http.post<any>('@api-x/'+this.GitURL+this.gitProjectCreationURL+gitRepoId+this.assignMembersOnGitURL,assignStudentGit);
  }
  //get Group Data of the student
  getGroupByStudent():Observable<Group>{
    return this.http.get<Group>(this.BaseURL+this.getGroupByStudentURL);
  }
  getGroupsBySupervisor():Observable<Group[]>{
    return this.http.get<Group[]>(this.BaseURL+this.getGroupBySupervisorURL);
  }
  clearCache(){
    this.groups$=null;
  }
}
