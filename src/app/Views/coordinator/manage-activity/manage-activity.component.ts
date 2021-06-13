import { ChangeDetectorRef, Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { Activity } from 'src/app/interfaces/activity';
import { ActivityService } from 'src/app/shared/activity.service';
import { GroupService } from 'src/app/shared/group.service';
import * as FileSaver from 'file-saver';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-manage-activity',
  templateUrl: './manage-activity.component.html',
  styleUrls: ['./manage-activity.component.scss']
})
export class ManageActivityComponent implements OnInit,OnDestroy {
  fileToUpload: File = null;
  coordinatorDetails: any = {}; //For saving coordinator details
  isOpen = true;//to be used for expension
  //Adding formcontrols for inserting
  insertForm: FormGroup;
  activityTitle: FormControl;
  activityDescription: FormControl;
  activityDeadline: FormControl;
  activities$:Observable<Activity[]>;
  activities:Activity[];
  fileInfo$:Observable<any>;
  fileDetails: any = {};

  //Add Modal
  @ViewChild('template') modal: TemplateRef<any>;
  //update Modal
  @ViewChild('editTemplate') editModal: TemplateRef<any>;
  //Modal properties
  modalMessage: string;
  modalRef: BsModalRef;
  //dtTrigger to be used in change ref
  dtTrigger:Subject<any>=new Subject();
  constructor(private fb: FormBuilder,private changeRef:ChangeDetectorRef,
    private modalService: BsModalService, private route:Router,
    private toastr:ToastrService, private groupService: GroupService, private activityService: ActivityService) { }

  ngOnInit(): void {
    this.groupService.getCoordinator().subscribe(result => { this.coordinatorDetails = result });
    //Modal Message
    this.modalMessage = "All Fields are necessary";
    this.activityTitle = new FormControl();
    this.activityDescription = new FormControl();
    this.activityDeadline = new FormControl();
    this.insertForm = this.fb.group({
      'Title': this.activityTitle,
      'Description': this.activityDescription,
      'DueDate': this.activityDeadline,
    });
    this.activities$=this.activityService.getActivities();
    this.activities$.subscribe(result=>{
      this.activities=result;
      this.changeRef.detectChanges();
      this.dtTrigger.next();
    },error=>{console.log("FAILED TO RETRIEVE ACTIVITIES")});
  }
  onAddActivity() {
    this.modalRef = this.modalService.show(this.modal);
    // this.activities.push({
    //   title: `Dynamic Group Header - ${this.activities.length + 1}`,
    //   content: `Dynamic Group Body - ${this.activities.length + 1}`
    // });

  }
   onSubmit() {
    let activityPostData:any={};
    let activity = this.insertForm.value;
    activityPostData.Title=activity.Title;
    activityPostData.Description=activity.Description;
    activityPostData.DueDate=activity.DueDate;
    activityPostData.coordinatorId=this.coordinatorDetails.id;
    console.log(this.coordinatorDetails.id);
    this.uploadFileOnGit(this.fileToUpload,this.coordinatorDetails.reposId,activityPostData);
  }
  public fileChange(fileList: FileList): void {
    this.fileToUpload = fileList[0];
  }
  public convertToBase64(file: Blob) {
    const result = new ReplaySubject<string>(1);
    let reader = new FileReader();
    reader.readAsDataURL(file as Blob);
    reader.onloadend = () => result.next(reader.result as string);
    return result;
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
          this.insertForm.reset();
          this.modalRef.hide();
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
  onDownload(activity):void{
    console.log(activity);//replace dot with %2E
    let fileName:string=activity.fileName
    let FileTypeFORBLOB:string=activity.fileType;
    let fileToDownload:string=activity.fileName;
    fileToDownload=this.activityService.jsEncode(fileToDownload);
    fileToDownload=fileToDownload.replace(".","%2E");
    fileToDownload=fileToDownload+"?ref="+activity.branch;
    console.log(fileToDownload);
    this.activityService.getRawFileGit(this.coordinatorDetails.reposId,fileToDownload).subscribe(result=>{
      console.log(result);
      let decodedRawData=window.atob(result.content);
      console.log(decodedRawData)
        const blob=this.dataURItoBlob(decodedRawData,FileTypeFORBLOB)
        console.log(blob);
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
  reloadActivities(){
    this.activities$=null;
    this.activityService.clearCache();
    this.activities$=this.activityService.getActivities();
    this.activities$.subscribe(result=>{
      this.activities=result;
      this.changeRef.detectChanges();
      this.dtTrigger.next();
    },error=>{console.log("FAILED TO RETRIEVE ACTIVITIES")});
  }
  onClick(){
    this.route.navigateByUrl('home/admin/root');
  }
  ngOnDestroy(){
    this.activityService.clearCache();
  }
}
