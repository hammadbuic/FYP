import { Template } from '@angular/compiler/src/render3/r3_ast';
import { Component, OnInit, ViewChild, TemplateRef, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { ToastrService } from 'ngx-toastr';
import { Observable, Subject } from 'rxjs';
import { Supervisor } from 'src/app/interfaces/supervisor';
import { AdminService } from 'src/app/shared/admin.service';
@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss']
})
export class ManageUsersComponent implements OnInit, OnDestroy {
  isShown:boolean=false;
  //FormControls for inserting
  insertForm:FormGroup;
  fullName:FormControl;
  UserName:FormControl;
  Email:FormControl;
  PhoneNumber:FormControl;
  Program:FormControl;
  Designation:FormControl;
  Department:FormControl;
  is_coordiantor:FormControl;
  //FormControls for updating
  updateForm:FormGroup;
  _fullName:FormControl;
  _UserName:FormControl;
  _Email:FormControl;
  _PhoneNumber:FormControl;
  _Program:FormControl;
  _Designation:FormControl;
  _Department:FormControl;
  _id:FormControl;
  //Form Controlsfor assigningcoordinator
  coordForm:FormGroup;
  section:FormControl;
  supervisorId:FormControl;
  //Add Modal
  @ViewChild('template') modal: TemplateRef<any>;
  //update Modal
  @ViewChild('editTemplate') editModal:TemplateRef<any>;
  //Assign Coord Modal
  @ViewChild('coordTemplate') coordModal:TemplateRef<any>;
  //Modal properties
  modalMessage:string;
  modalRef:BsModalRef;
  selectedSupervisor:Supervisor;
  supervisors$:Observable<Supervisor[]>
  supervisors:Supervisor[]=[];      //To retrieve elements from Observable
  userRoleStatus:string;
  //Properties for the data table
  dtOptions: DataTables.Settings = {};
  dtTrigger:Subject<any>=new Subject();
  //Data Table directive
  @ViewChild(DataTableDirective) dtElement:DataTableDirective;
  constructor(private service:AdminService,private modalService:BsModalService,
    private fb:FormBuilder,private changeRef:ChangeDetectorRef,private toastr:ToastrService,private route:Router) { }

  ngOnInit(): void {
    this.dtOptions={
      pagingType:'full_numbers',        //pages
      pageLength: 10,                    //5 elements will be shown
      autoWidth:true,
      //order:[[0,'desc']]
    };
    this.supervisors$=this.service.getSupervisors();  //observable of supervisors from service
    this.supervisors$.subscribe(result=>{
      this.supervisors=result;
      //console.log(result)
      this.changeRef.detectChanges();     //Detect Changes before table load
      this.dtTrigger.next();
    }); //assigned to array and to datatable
    //Modal Message
    this.modalMessage="All Fields are necessary";
    //intializing add supervisor properties
    this.fullName=new FormControl('',[Validators.required,Validators.maxLength(20)]);
    this.UserName=new FormControl('',[Validators.required,Validators.maxLength(20)]);
  this.Email=new FormControl('',[Validators.required,Validators.maxLength(50)]);
  this.PhoneNumber=new FormControl('',[Validators.required,Validators.maxLength(11)]);
  this.Program=new FormControl('',[Validators.required,Validators.maxLength(3)]);
  this.Designation=new FormControl('',[Validators.required,Validators.maxLength(20)]);
  this.Department=new FormControl('',[Validators.required,Validators.maxLength(20)]);
  //You can use regex above
  this.insertForm=this.fb.group({
    'fullName':this.fullName,
    'UserName':this.UserName,
    'Email':this.Email,
    'PhoneNumber':this.PhoneNumber,
    'Program':this.Program,
    'Designation':this.Designation,
    'Department':this.Department,
  });
  //initializing update supervisor Properties
  this._fullName=new FormControl('',[Validators.required,Validators.maxLength(20)]);
  this._UserName=new FormControl('',[Validators.required,Validators.maxLength(20)]);
  this._Email=new FormControl('',[Validators.required,Validators.maxLength(50)]);
  this._PhoneNumber=new FormControl('',[Validators.required,Validators.maxLength(11)]);
  this._Program=new FormControl('',[Validators.required,Validators.maxLength(3)]);
  this._Designation=new FormControl('',[Validators.required,Validators.maxLength(20)]);
  this._Department=new FormControl('',[Validators.required,Validators.maxLength(20)]);
  this._id=new FormControl();
  this.updateForm=this.fb.group({
    'id':this._id,
    'fullName':this._fullName,
    'UserName':this._UserName,
    'Email':this._Email,
    'PhoneNumber':this._PhoneNumber,
    'Program':this._Program,
    'Designation':this._Designation,
    'Department':this._Department,
  });
  //initializing Assign Coordinator Properties
  this.section=new FormControl('',[Validators.required,Validators.maxLength(20)]);
  this.supervisorId=new FormControl();
  this.coordForm=this.fb.group({
    'section':this.section,
    'supervisorId':this.supervisorId,
  })
  }
  //on selecting a supervisor
  onSelect(supervisor:Supervisor){
     this.selectedSupervisor=supervisor;
     this.route.navigateByUrl("/home/admin/"+supervisor.id);
  }
  //For Loading add coordinator Modal
  onAddSupervisor(){
    this.modalRef=this.modalService.show(this.modal);
  }
  //For Loading assign coordinator modal
  onAssignCoordModal(id:string){
    this.supervisorId.setValue(id);
    this.coordForm.setValue({
      'section':this.section.value,
      'supervisorId':this.supervisorId.value,
    })
    this.modalRef=this.modalService.show(this.coordModal);
  }
  //method for assigning the coordinator
  onAssignCoordinator(){
    let newCoordinator=this.coordForm.value;
    console.log(newCoordinator)
    this.service.assignCoordinator(newCoordinator).subscribe(
      result=>{
        console.log("COORDINATOR ADDED");
        this.toastr.success("Coordinator is assigned to "+ newCoordinator.section);
        this.service.clearCache();
        this.supervisors$=this.service.getSupervisors();
        this.supervisors$.subscribe(
          updatedList=>{
            this.supervisors=updatedList;
            this.modalRef.hide();
            this.rerender();
          }
        )
      },
      error=>{
        console.log("Unable to Assign Coordinator");
        this.toastr.error("Operation Unsuccessfull");
      }
    )
  }
  //Custom method to detect changes
  //destroy old table and load with the change
  rerender(){
    this.dtElement.dtInstance.then((dtInstance:DataTables.Api)=>{
      //destroy table in current context
      dtInstance.destroy();
      //rerender again
      this.dtTrigger.next();
    })
  }
  onSubmit(){
    let newSupervisorUser:any={};//declare
    let newSupervisor=this.insertForm.value;
    //  let name=;
    // console.log(name);
    //setting values
    newSupervisorUser.name=newSupervisor.fullName;
    newSupervisorUser.email=newSupervisor.Email;
    newSupervisorUser.username=newSupervisor.UserName;
    newSupervisorUser.reset_password=true;
    newSupervisorUser.can_create_group=false;
    newSupervisorUser.skip_confirmation=false;
    //displaying on console
    console.log(newSupervisorUser);
    this.service.createGitSupervisor(newSupervisorUser).subscribe(
      result=>{
        console.log(result.id);
        newSupervisor.gitID=result.id;
        newSupervisor.webURL=result.web_url;
        newSupervisor.createdAt=result.created_at;
        console.log("Git Registration successfull");
        console.log(newSupervisor);
        this.service.insertSupervisor(newSupervisor).subscribe(
          result=>{
            this.service.clearCache();
            this.supervisors$.subscribe(newList=>{
              this.supervisors=newList;
              this.modalRef.hide();
              this.insertForm.reset();
              //this.dtTrigger.next();
            });
            this.rerender();
            console.log("New Supervisor is added");
            this.toastr.success("Supervisor added successfully");
          },
          error=>{
            console.log("Unable to add supervisor");
            this.toastr.error("Operation Unsuccessfull");
          }
        )
      },
      error=>{
        console.log(" Git Registration Unsuccessfull");
      }
    )

  }
  //updating existing supervisor
  onUpdate(){
    //console.log(this.updateForm.value);
    let editSupervisor=this.updateForm.value;
    this.service.updateSupervisor(editSupervisor.id,editSupervisor).subscribe(
      result=>{
        console.log("SUPERVISOR UPDATED");
        this.toastr.success("Supervisor updated success");
        this.service.clearCache();
        this.supervisors$=this.service.getSupervisors();
        this.supervisors$.subscribe(updatedList=>{
          this.supervisors=updatedList;
          this.modalRef.hide();
          this.rerender()
        })
      },
      error=>{
        console.log("UNABLE To UPDATE SUPERVISOR");
        this.toastr.error("Operation Failed");
      }
    )
  }
  //Load the update Modal
  onUpdateModal(supervisorEdit:Supervisor):void{
    this._id.setValue(supervisorEdit.id);
    this._fullName.setValue(supervisorEdit.fullName);
    this._UserName.setValue(supervisorEdit.userName);
    this._Email.setValue(supervisorEdit.email);
    this._PhoneNumber.setValue(supervisorEdit.phoneNumber);
    this._Department.setValue(supervisorEdit.department);
    this._Designation.setValue(supervisorEdit.designation);
    this._Program.setValue(supervisorEdit.program);
    this.updateForm.setValue({
    'id':this._id.value,
    'fullName':this._fullName.value,
    'UserName':this._UserName.value,
    'Email':this._Email.value,
    'PhoneNumber':this._PhoneNumber.value,
    'Program':this._Program.value,
    'Designation':this._Designation.value,
    'Department':this._Department.value,
    });
    this.modalRef=this.modalService.show(this.editModal);
  }
  //method to delete supervisor
  onDeleteSupervisor(supervisor:Supervisor):void{
    this.service.deleteSupervisor(supervisor.id).subscribe(result=>{
      this.service.clearCache();
      this.supervisors$=this.service.getSupervisors();
      this.supervisors$.subscribe(newList=>
        {
          this.supervisors=newList;
          this.rerender();
        })
        this.toastr.success("Supervisor deleted success");
        console.log("SUPERVISOR DELETED")
    },
    error=>{
      console.log("UNABLE TO DELETE SUPERVISOR");
      this.toastr.error("Operation Failed");
    })
  }
  ngOnDestroy():void {
    this.service.clearCache();
    this.dtTrigger.unsubscribe()
  }
}
