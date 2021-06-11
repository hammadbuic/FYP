import { ChangeDetectorRef, Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalService,BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { DataTableDirective } from 'angular-datatables';
import { Observable, Subject } from 'rxjs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { AdminService } from 'src/app/shared/admin.service';
import { Group } from 'src/app/interfaces/group';
import { GroupService } from 'src/app/shared/group.service';
import { Supervisor } from 'src/app/interfaces/supervisor';
import { StudentGroup } from 'src/app/interfaces/student-group';
import { ThisReceiver } from '@angular/compiler';
import { UserService } from 'src/app/shared/user.service';
@Component({
  selector: 'app-manage-groups',
  templateUrl: './manage-groups.component.html',
  styleUrls: ['./manage-groups.component.scss']
})
export class ManageGroupsComponent implements OnInit,OnDestroy {
  groups$:Observable<Group[]>;
  selectedGroup:Group;
  groups:Group[]=[];
  //Example Start
  title = 'app';
  tab = 1;
  studentOptions:any=[];
  supervisorOptions:any=[];
  singleSelect: any = [];
  multiSelect: any = [];
  stringArray: any = [];
  objectsArray: any = [];
  config = {
    displayKey: 'userName', // if objects array passed which key to be displayed defaults to description
    search: true,
    limitTo: 5,
  };
  resetOption: any;
  selectForm: FormGroup;
  //Example End
  //Form Controls for inserting
  insertForm:FormGroup;
  GroupName:FormControl;
  //Members:FormControl;
  selectedStudents:FormControl;
  Supervisor:FormControl;
  ProjectName:FormControl;
  ProjectDescription:FormControl;
  //Form Controls for updating
  updateForm:FormGroup;
  _GroupName:FormControl;
  //Members:FormControl;
  _selectedStudents:FormControl;
  _Supervisor:FormControl;
  _ProjectId:FormControl;
  _ProjectName:FormControl;
  _ProjectDescription:FormControl;
  _id:FormControl;
//Add Modal
@ViewChild('template') modal: TemplateRef<any>;
//update Modal
@ViewChild('editTemplate') editModal:TemplateRef<any>;
//Modal properties
modalMessage:string;
modalRef:BsModalRef;
//Dropdown Components
dropdownList = [];
selectedItems = [];
dropdownSettings={}
//Properties for the data table
dtOptions: DataTables.Settings = {};
dtTrigger:Subject<any>=new Subject();
//Data Table directive
@ViewChild(DataTableDirective) dtElement:DataTableDirective;
  constructor(private service:AdminService,private userService:UserService,private groupService:GroupService,private modalService:BsModalService,
    private fb:FormBuilder,private changeRef:ChangeDetectorRef,private toastr:ToastrService,private route:Router) { }

  ngOnInit(): void {
    //this.resetOption = [this.options[0]];//Example Code
        //Modal Message
        this.modalMessage="All Fields are necessary";
        //insert specs
        this.GroupName=new FormControl();
        this.selectedStudents=new FormControl();
        this.Supervisor=new FormControl();
        this.ProjectName=new FormControl();
        this.ProjectDescription=new FormControl();
        this.insertForm=this.fb.group({
          'GroupName':this.GroupName,
          'SelectedStudents':this.selectedStudents,
          'Supervisor':this.Supervisor,
          'ProjectName':this.ProjectName,
          'ProjectDescription':this.ProjectDescription
        });
        //update specs
        this._GroupName=new FormControl();
        this._selectedStudents=new FormControl();
        this._Supervisor=new FormControl();
        this._ProjectId=new FormControl();
        this._ProjectName=new FormControl();
        this._ProjectDescription=new FormControl();
        this._id=new FormControl();
        this.updateForm=this.fb.group({
          'id':this._id.value,
          'GroupName':this._GroupName,
          'SelectedStudents':this._selectedStudents,
          'Supervisor':this._Supervisor,
          'ProjectId':this._ProjectId,
          'ProjectName':this._ProjectName,
          'ProjectDescription':this._ProjectDescription
        });
        this.groups$=this.groupService.getGroups();
        this.groups$.subscribe(
          result=>{
            this.groups=result;
            this.changeRef.detectChanges();
            this.dtTrigger.next();
          });
        this.dropdownSettings = {
          singleSelection: false,
          idField: 'item_id',
          textField: 'item_text',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          itemsShowLimit: 5,
          allowSearchFilter: true
        };
        this.service.getStudents().subscribe(result=>{
          this.studentOptions=result;
        });
        this.service.getSupervisors().subscribe(result=>{
          this.supervisorOptions=result;
        })
        this.userService.getUserProfile().subscribe(result=>{
          console.log(result);
        })
  }
  //loading add group modal
  onAddGroup(){
    this.modalRef=this.modalService.show(this.modal);
  }
  onSubmit()
  {
    var studentsToAssign:StudentGroup[]=[];
    let newGroup:any={};
    let group=this.insertForm.value;//seprating values from insert form
    newGroup.groupName=group.GroupName;
    newGroup.supervisorId=group.Supervisor.id;
    newGroup.projectName=group.ProjectName;
    newGroup.projectDescription=group.ProjectDescription;
    var student=group.SelectedStudents;



    //console.log(student);
    this.groupService.addGroup(newGroup).subscribe(
      result=>{
        student.forEach(element => {
          let studentToAssign:any={};
          studentToAssign.id=element.id;
          studentToAssign.groupId=result.groupId;
          studentsToAssign.push(studentToAssign);
        });
        console.log(studentsToAssign);
        this.groupService.addStudentsToGroup(studentsToAssign).subscribe(
          result=>{
            this.groupService.clearCache();
            this.groups$=this.groupService.getGroups();
            this.groups$.subscribe(
              newList=>{
                this.groups=newList;
                this.modalRef.hide();
                this.insertForm.reset();
              }
            );
            this.rerender();
            this.toastr.success("Students are added successfully");
          },
          error=>{
            this.toastr.error("Unable to add students");
          }
        )
        this.groupService.clearCache();
        this.groups$=this.groupService.getGroups();
        this.groups$.subscribe(
          result=>{
            this.groups=result;
            this.modalRef.hide();
            this.insertForm.reset();
          }
        );
        this.rerender();
        this.toastr.success("Group Created Successfully");
      },
      error=>{
        this.toastr.error("Group Creation Unsuccessfull");
      }
    )
  }
  rerender(){
    this.dtElement.dtInstance.then((dtInstance:DataTables.Api)=>{
      //destroy table in current context
      dtInstance.destroy();
      //rerender again
      this.dtTrigger.next();
    })
  }
  onUpdateModal(groupEdit:Group):void{
    console.log(groupEdit);
    this.groupService.getStudentsByGroup(groupEdit.groupId).subscribe(result=>{
      this._selectedStudents.setValue(result);
    });
    console.log(this._selectedStudents);
    this._id.setValue(groupEdit.groupId);
    this._GroupName.setValue(groupEdit.groupName);
    this._Supervisor.setValue(groupEdit.username);
    this._ProjectId.setValue(groupEdit.projectId);
    this._ProjectName.setValue(groupEdit.projectName);
    this._ProjectDescription.setValue(groupEdit.projectDescription);
    this.updateForm.setValue({
      'id':this._id.value,
      'GroupName':this._GroupName.value,
      'SelectedStudents':this._selectedStudents.value,
      'Supervisor':this._Supervisor.value,
      'ProjectId':this._ProjectId.value,
      'ProjectName':this._ProjectName.value,
      'ProjectDescription':this._ProjectDescription.value
    });
    this.modalRef=this.modalService.show(this.editModal);
  }
  onUpdate(){
    var studentsToAssign:StudentGroup[]=[];
    let updateGroup:any={};  //to send to the api
    let editGroup=this.updateForm.value;
    updateGroup.groupId=editGroup.id;
    updateGroup.groupName=editGroup.GroupName;
    updateGroup.supervisorId=editGroup.Supervisor.id;
    updateGroup.projectId=editGroup.ProjectId;
    updateGroup.projectName=editGroup.ProjectName;
    updateGroup.projectDescription=editGroup.ProjectDescription;
    var students=editGroup.SelectedStudents;
    console.log(updateGroup);
    console.log(students);
    this.groupService.updateGroup(updateGroup.groupId,updateGroup).subscribe(
      result=>{
        students.forEach(element => {
          let studentToAssign:any={};
          studentToAssign.id=element.id;
          studentToAssign.groupId=updateGroup.groupId;
          studentsToAssign.push(studentToAssign);
        });
        console.log(studentsToAssign);
        this.groupService.updateStudentsInGroup(updateGroup.groupId,studentsToAssign).subscribe(
          result=>{
            this.groupService.clearCache();
            this.groups$=this.groupService.getGroups();
            this.groups$.subscribe(updatedList=>{
              this.groups=updatedList;
              this.modalRef.hide();
              this.rerender();
            });
            this.toastr.success("Students updated in group")
          },
          error=>{
            this.toastr.error("Unable to update Group");
          }
        )
        this.toastr.success("Group is updated successfully");
      },
      error=>{
        this.toastr.error("Unable to update Group");
      }
    )
  }
  onDelete(group:Group):void{
    this.groupService.deleteGroup(group.groupId).subscribe(result=>{
      this.groupService.clearCache();
      this.groups$=this.groupService.getGroups();
      this.groups$.subscribe(updatedList=>{
        this.groups=updatedList;
        this.rerender();
        this.toastr.success("Group Deleted Success");
      });
    },
    error=>{
      this.toastr.error("Unable to delete Group");
    });
  }
  reset() {//Example
    this.resetOption = [];
  }
  ngOnDestroy(){
    this.groupService.clearCache();
    this.service.clearCache();
  }
}
