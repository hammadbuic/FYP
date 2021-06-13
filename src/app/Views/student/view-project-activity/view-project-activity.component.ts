import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { Activity } from 'src/app/interfaces/activity';
import * as FileSaver from 'file-saver';
import { ActivityService } from 'src/app/shared/activity.service';
import { Router } from '@angular/router';
import { GroupService } from 'src/app/shared/group.service';
import { AdminService } from 'src/app/shared/admin.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-view-project-activity',
  templateUrl: './view-project-activity.component.html',
  styleUrls: ['./view-project-activity.component.scss']
})
export class ViewProjectActivityComponent implements OnInit,OnDestroy {
  fileToUpload: File = null;
  fileDetails: any = {};
  coordinatorDetails: any = {}; //For saving coordinator details
  studentDetails:any={};
  isOpen = true;//to be used for expension
  activities$:Observable<Activity[]>;
  activities:Activity[];
  //dtTrigger to be used in change ref
  dtTrigger:Subject<any>=new Subject();
  constructor(private toastr:ToastrService,private activityService:ActivityService,private adminService:AdminService,
    private changeRef:ChangeDetectorRef,private route:Router) { }

  ngOnInit(): void {
    this.activityService.getStudentInformation().subscribe(result=>{this.studentDetails=result},error=>{console.log("Failed To get Student DATA")})
    //console.log(this.studentDetails)
    this.activities$=this.activityService.getActivitiesForStudents();
    this.activities$.subscribe(result=>{
      this.coordinatorDetails=result;
      this.activities=result;
      this.coordinatorDetails=this.activities[0].coordinator;
      this.changeRef.detectChanges();
      this.dtTrigger.next();
    },error=>{console.log("FAILED TO RETRIEVE ACTIVITIES")});
  }
  reloadActivities(){
    this.activities$=null;
    this.activityService.clearCache();
    this.activities$=this.activityService.getActivitiesForStudents();
    this.activities$.subscribe(result=>{
      this.activities=result;
      this.changeRef.detectChanges();
      this.dtTrigger.next();
    },error=>{console.log("FAILED TO RETRIEVE ACTIVITIES")});
  }
  onDownload(activity):void{
    let fileName:string=activity.fileName
    let FileTypeFORBLOB:string=activity.fileType;
    let fileToDownload:string=activity.fileName;
    fileToDownload=this.activityService.jsEncode(fileToDownload);
    fileToDownload=fileToDownload.replace(".","%2E");
    fileToDownload=fileToDownload+"?ref="+activity.branch;
    this.activityService.getRawFileGit(this.coordinatorDetails.reposId,fileToDownload).subscribe(result=>{
      let decodedRawData=window.atob(result.content);
        const blob=this.dataURItoBlob(decodedRawData,FileTypeFORBLOB)
        FileSaver.saveAs(blob,fileName);
    },
    error=>
    {
      console.log("Unable to get raw data of the FILE")
    });
  }
  dataURItoBlob(dataURI,FileTypeFORBLOB) {
    console.log(FileTypeFORBLOB)
    const byteString = window.atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: FileTypeFORBLOB });
    return blob;
  }
  public fileChange(fileList: FileList): void {
    this.fileToUpload = fileList[0];
  }
  public uploadFileOnGit(file: File, gitProjectId: Number,data:any){
    this.convertToBase64(file).subscribe(result => {
      let fileJson: any = {};
      data.FileName = file.name; data.FileType = file.type;
      fileJson.commit_message = "Coordinator docs for activities";
      fileJson.branch = "master";
      let context = result.toString();
      var newContent = context.replace('data:' + file.type + ';base64,', "");
      fileJson.content = newContent;
      this.activityService.postFileContentOnGit(gitProjectId, file.name, fileJson).subscribe( result => {
        this.fileDetails.file_path=result.file_path;
        data.branch=result.branch;
        this.activityService.insertActivity(data).subscribe(result=>{
          this.reloadActivities();
          this.toastr.success("Activity Added Successfully");
          console.log("ACTIVITY ADDED SUCCESSFULLY");
        },error=>{
          this.toastr.error("Error! Cannot add activity")
          console.log("UNABLE TO ADD ACTIVITY");
        });
        console.log("File Uplaoded on Git Repository");
      }, error => console.log("Unable to upload git repository"));
    });
    return this.fileDetails
  }
  public convertToBase64(file: Blob) {
    const result = new ReplaySubject<string>(1);
    let reader = new FileReader();
    reader.readAsDataURL(file as Blob);
    reader.onloadend = () => result.next(reader.result as string);
    return result;
  }
  onClick(){
    this.route.navigateByUrl('home/student/root');
  }
  ngOnDestroy(){
    this.activityService.clearCache();
  }
}
