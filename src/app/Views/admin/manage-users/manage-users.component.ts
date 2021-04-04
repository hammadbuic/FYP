import { Template } from '@angular/compiler/src/render3/r3_ast';
import { Component, OnInit, ViewChild, TemplateRef, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
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
  //FormControls for inserting
  insertForm:FormGroup;
  fullName:FormControl;
  UserName:FormControl;
  Email:FormControl;
  PhoneNumber:FormControl;
  Program:FormControl;
  Designation:FormControl;
  Department:FormControl;
  //Add Modal
  @ViewChild('template') modal: TemplateRef<any>;
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
    private fb:FormBuilder,private changeRef:ChangeDetectorRef,private toastr:ToastrService) { }

  ngOnInit(): void {
    this.dtOptions={
      pagingType:'full_numbers',        //pages
      pageLength: 5,                    //5 elements will be shown
      autoWidth:true,
      //order:[[0,'desc']]
    };
    this.supervisors$=this.service.getSupervisors();  //observable of supervisors from service
    this.supervisors$.subscribe(result=>{
      this.supervisors=result;
      //console.log(result)
      this.changeRef.detectChanges();     //Detect Changes before table load
      this.dtTrigger.next();
    }) //assigned to array and to datatable
    //Modal Message
    this.modalMessage="All Fields are necessary";
    //intializing properties
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
    'Department':this.Department
  });
  }
  onAddSupervisor(){
    this.modalRef=this.modalService.show(this.modal);
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
    console.log("inside submit");
    let newSupervisor=this.insertForm.value;
    this.service.insertSupervisor(newSupervisor).subscribe(
      result=>{
        this.service.clearCache();
        this.supervisors$.subscribe(newList=>{
          this.supervisors=newList;
          this.modalRef.hide();
          this.insertForm.reset();
          //this.dtTrigger.next();
          this.rerender();
        });
        console.log("New Supervisor is added");
        this.toastr.success("Supervisor added successfully");
      },
      error=>{
        console.log("Unable to add supervisor");
        this.toastr.error("Operation Unsuccessfull");
      }
    )
  }
  ngOnDestroy():void {
    this.dtTrigger.unsubscribe()
  }
}
