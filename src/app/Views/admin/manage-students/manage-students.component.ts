import { Component, OnInit,ViewChild, TemplateRef, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/shared/admin.service';
import { Observable, Subject } from 'rxjs';
import { Student } from 'src/app/interfaces/student';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-manage-students',
  templateUrl: './manage-students.component.html',
  styleUrls: ['./manage-students.component.scss']
})
export class ManageStudentsComponent implements OnInit, OnDestroy {
  //formControls for inserting student data
  insertForm:FormGroup;
  fullName:FormControl;
  UserName:FormControl;
  Email:FormControl;
  PhoneNumber:FormControl;
  registrationNumber:FormControl;
  fatherName:FormControl;
  address:FormControl;
  department:FormControl;
  program:FormControl;
  //FormControls for updating student data
  updateForm:FormGroup;
  _fullName:FormControl;
  _UserName:FormControl;
  _Email:FormControl;
  _PhoneNumber:FormControl;
  _registrationNumber:FormControl;
  _fatherName:FormControl;
  _address:FormControl;
  _department:FormControl;
  _program:FormControl;
  _id:FormControl;
   //Add Modal
   @ViewChild('template') modal: TemplateRef<any>;
   //update Modal
   @ViewChild('editTemplate') editModal:TemplateRef<any>;
    //Modal properties
  modalMessage:string;
  modalRef:BsModalRef;
  selectedStudent:Student;
  students$:Observable<Student[]>
  students:Student[]=[];      //To retrieve elements from Observable
  userRoleStatus:string;
    //Properties for the data table
    dtOptions: DataTables.Settings = {};
    dtTrigger:Subject<any>=new Subject();
    //Data Table directive
    @ViewChild(DataTableDirective) dtElement:DataTableDirective;
  constructor(private service:AdminService,private modalService:BsModalService,private spinner:NgxSpinnerService,
    private fb:FormBuilder,private changeRef:ChangeDetectorRef,private toastr:ToastrService,private route:Router) { }

  ngOnInit(): void {
    this.dtOptions={
      pagingType:'full_numbers',        //pages
      pageLength: 10,                    //5 elements will be shown
      autoWidth:true,
      //order:[[0,'desc']]
    };
    this.students$=this.service.getStudents();
    this.students$.subscribe(result=>{
      this.students=result;
      this.changeRef.detectChanges();
      this.dtTrigger.next();
    });
    //Modal Message
    this.modalMessage="All Fields are necessary";
        //intializing add supervisor properties
        this.fullName=new FormControl('',[Validators.required,Validators.maxLength(20)]);
        this.UserName=new FormControl('',[Validators.required,Validators.maxLength(20)]);
      this.Email=new FormControl('',[Validators.required,Validators.maxLength(50)]);
      this.PhoneNumber=new FormControl('',[Validators.required,Validators.maxLength(11)]);
      this.registrationNumber=new FormControl('',[Validators.required,Validators.maxLength(20)]);
      this.fatherName=new FormControl('',[Validators.required,Validators.maxLength(20)]);
      this.address=new FormControl('',[Validators.required,Validators.maxLength(20)]);
      this.department=new FormControl('',[Validators.required,Validators.maxLength(3)]);
      this.program=new FormControl('',[Validators.required,Validators.maxLength(20)]);
      //You can use regex above
    this.insertForm=this.fb.group({
    'fullName':this.fullName,
    'UserName':this.UserName,
    'Email':this.Email,
    'PhoneNumber':this.PhoneNumber,
    'RegistrationNumber':this.registrationNumber,
    'FatherName':this.fatherName,
    'Address':this.address,
    'Department':this.department,
    'Program':this.program,
    });
    //intializing add supervisor properties
    this._fullName=new FormControl('',[Validators.required,Validators.maxLength(20)]);
    this._UserName=new FormControl('',[Validators.required,Validators.maxLength(20)]);
  this._Email=new FormControl('',[Validators.required,Validators.maxLength(50)]);
  this._PhoneNumber=new FormControl('',[Validators.required,Validators.maxLength(11)]);
  this._registrationNumber=new FormControl('',[Validators.required,Validators.maxLength(20)]);
  this._fatherName=new FormControl('',[Validators.required,Validators.maxLength(20)]);
  this._address=new FormControl('',[Validators.required,Validators.maxLength(20)]);
  this._department=new FormControl('',[Validators.required,Validators.maxLength(3)]);
  this._program=new FormControl('',[Validators.required,Validators.maxLength(20)]);
  this.updateForm=this.fb.group({
    'id':this._id,
    'fullName':this._fullName,
    'UserName':this._UserName,
    'Email':this._Email,
    'PhoneNumber':this._PhoneNumber,
    'RegistrationNumber':this._registrationNumber,
    'FatherName':this._fatherName,
    'Address':this._address,
    'Department':this._department,
    'Program':this._program,
    });
  }
    //on selecting a student
    onSelect(student:Student){
      this.selectedStudent=student;
      this.route.navigateByUrl("/home/admin/"+student.id);
   }
  //method to detect changer
  rerenderer(){
    this.dtElement.dtInstance.then((dtInstance:DataTables.Api)=>{
      //destroy table in current context
      dtInstance.destroy();
      //rerender again
      this.dtTrigger.next();
    })
  }
  //adding student backend
  onSubmit(){
    let newStudentUser:any={};
    let newStudent=this.insertForm.value;
    newStudentUser.name=newStudent.fullName;
    newStudentUser.email=newStudent.Email;
    newStudentUser.username=newStudent.UserName;
    newStudentUser.reset_password=true;
    newStudentUser.can_create_group=false;
    newStudentUser.skip_confirmation=false;
    this.service.createGitStudent(newStudentUser).subscribe(result=>{
      console.log(result.id);
      newStudent.gitID=result.id;
      newStudent.webURL=result.web_url;
      newStudent.createdAt=result.created_at;
      console.log("GIT REGISTRATION SUCCESSFULL");
      this.service.insertStudent(newStudent).subscribe(result=>{
        this.service.clearStudentCache();
        this.students$=this.service.getStudents();
        this.students$.subscribe(newList=>{
          this.students=newList;
          this.modalRef.hide();
          this.insertForm.reset();
        });
        this.rerenderer();
        this.toastr.success("Student added successfully");
      },
      error=>{
        this.toastr.error("Operation Unsuccessfull");
      })
    },
    error=>{
      console.log(" Git Registration Unsuccessfull");
    });
  }
  //showing student modal
  onAddStudent(){
    this.modalRef=this.modalService.show(this.modal);
  }
    //updating existing supervisor
    onUpdate(){
      //console.log(this.updateForm.value);
      let editStudent=this.updateForm.value;
      this.service.updateStudent(editStudent.id,editStudent).subscribe(
        result=>{
          console.log("STUDENT UPDATED");
          this.toastr.success("Student updated success");
          this.service.clearStudentCache();
          this.students$=this.service.getStudents();
          this.students$.subscribe(updatedList=>{
            this.students=updatedList;
            this.modalRef.hide();
            this.rerenderer();
          })
        },
        error=>{
          console.log("UNABLE To UPDATE STUDENT");
          this.toastr.error("Operation Failed");
        }
      )
    }
    //Load Student update modal
      //Load the update Modal
  onUpdateModal(studentEdit:Student):void{
    this._id.setValue(studentEdit.id);
    this._fullName.setValue(studentEdit.fullName);
    this._UserName.setValue(studentEdit.userName);
    this._Email.setValue(studentEdit.email);
    this._PhoneNumber.setValue(studentEdit.phoneNumber);
    this._registrationNumber.setValue(studentEdit.registrationNumber);
    this._fatherName.setValue(studentEdit.fatherName);
    this._address.setValue(studentEdit.address);
    this._department.setValue(studentEdit.department);
    this._program.setValue(studentEdit.program);
    this.updateForm.setValue({
    'id':this._id.value,
    'fullName':this._fullName.value,
    'UserName':this._UserName.value,
    'Email':this._Email.value,
    'PhoneNumber':this._PhoneNumber.value,
    'RegistrationNumber':this._registrationNumber.value,
    'FatherName':this._fatherName.value,
    'Address':this._address.value,
    'Program':this._program.value,
    'Department':this._department.value,
    });
    this.modalRef=this.modalService.show(this.editModal);
  }
  //method to delete student
  onDeleteStudent(student:Student):void{
    this.service.deleteGitUser(student.gitID).subscribe(result=>{console.log("User deleted on git");},error=>{console.log("Failed to delete user")})
    this.service.deleteStudent(student.id).subscribe(result=>{
      this.service.clearCache();
      this.students$=this.service.getStudents();
      this.students$.subscribe(newList=>
        {
          this.students=newList;
          this.rerenderer();
        })
        this.toastr.success("Student deleted success");
        console.log("STUDENT DELETED")
    },
    error=>{
      console.log("UNABLE TO DELETE STUDENT");
      this.toastr.error("Operation Failed");
    })
  }
ngOnDestroy():void{
  this.service.clearStudentCache();

 }
}
