import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { flatMap, first, shareReplay } from "rxjs/operators";
import { Activity } from '../interfaces/activity';
import { HttpUrlEncodingCodec } from '@angular/common/http';
import { Student } from '../interfaces/student';
@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  readonly BaseURL = 'http://localhost:51528/api'
  readonly GitURL='https://20.197.56.146/api/v4'
  constructor(private http: HttpClient) { }
  private activityURL:string='/Activities/'
  private fileUploadOnGitURL:string="/projects/";
  private fileUploadOnGitURL1:string="/repository/files/"; //https://20.197.56.146/api/v4/projects/29/repository/files/abc.docx
  private getRawFileFromGitLabURL:string="/raw/"
  private studentActivitiesURL:string="GetActivitiesForStudents/";
  private getStudentDataURL:string="/student/getStudent";
  private activities$:Observable<Activity[]>;
  private studentActivities$:Observable<Activity[]>;
  //GEt all the activities
  getActivities(): Observable<Activity[]> {
    //if cache not exist
    if(!this.activities$){
      this.activities$=this.http.get<Activity[]>(this.BaseURL+this.activityURL).pipe(shareReplay());
    }
    //if cache exist return it
    return this.activities$;
  }
  //get activity by id
  getActivityById(id:Number): Observable<Activity> {
    return this.getActivities().pipe(flatMap(result=>result),first(activity=>activity.id == id));
  }
  //insert a activity
  insertActivity(newActivity: Activity): Observable<Activity> {
    return this.http.post<Activity>(this.BaseURL+this.activityURL,newActivity);
  }
  //Update a activity
  updateActivity(id: Number, editActivity: Activity): Observable<Activity> {
    return this.http.put<Activity>(this.BaseURL+this.activityURL+id,editActivity);
  }
  //Delete a activity
  deleteActivity(id: Number): Observable<any> {
    return this.http.delete(this.BaseURL+this.activityURL+id);
  }
  //For getting students activities
  getActivitiesForStudents():Observable<Activity[]>{
    //if cache not exist
    if(!this.studentActivities$){
      this.studentActivities$=this.http.get<Activity[]>(this.BaseURL+this.activityURL+this.studentActivitiesURL).pipe(shareReplay());
    }
    //if cache exist return it
    return this.studentActivities$;
  }
  //get student information
  getStudentInformation():Observable<Student>{
    return this.http.get<Student>(this.BaseURL+this.getStudentDataURL);
  }
  //Encoding URI
  jsEncode(param: string){
    return encodeURIComponent(param);
  }

  //Uploads file on the coordinator document repos
  postFileContentOnGit(docRepoId:Number,fileName:string,gitFileContent):Observable<any>{
    return this.http.post('@api-x/'+this.GitURL+this.fileUploadOnGitURL+docRepoId+this.fileUploadOnGitURL1+fileName,gitFileContent);
  }
    //Uploads file on the coordinator document repos
    postFileContentOnGitForStudent(docRepoId:Number,fileName:string,gitFileContent):Observable<any>{
      return this.http.post('@api-x/'+this.GitURL+this.fileUploadOnGitURL+docRepoId+this.fileUploadOnGitURL1+fileName,gitFileContent);
    }
  //getRaw File From Git
  getRawFileGit(docRepoId:Number,file_path:string):Observable<any>{
    return this.http.get<any>('@api-x/'+this.GitURL+this.fileUploadOnGitURL+docRepoId+this.fileUploadOnGitURL1+file_path);
  }
  //clear activity cache
  clearCache(){
    this.activities$=null;
    this.studentActivities$=null;
  }
}
