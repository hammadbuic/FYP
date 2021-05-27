import { ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalService,BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { DataTableDirective } from 'angular-datatables';
import { Observable, Subject } from 'rxjs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { AdminService } from 'src/app/shared/admin.service';
@Component({
  selector: 'app-manage-groups',
  templateUrl: './manage-groups.component.html',
  styleUrls: ['./manage-groups.component.scss']
})
export class ManageGroupsComponent implements OnInit {
  //Example Start
  title = 'app';
  tab = 1;
  studentOptions:any=[];
  singleSelect: any = [];
  multiSelect: any = [];
  stringArray: any = [];
  objectsArray: any = [];
  stringOptions = [
    'Burns Dalton',
    'Mcintyre Lawson',
    'Amie Franklin',
    'Jocelyn Horton',
    'Fischer Erickson',
    'Medina Underwood',
    'Goldie Barber',
  ];
  config = {
    displayKey: 'userName', // if objects array passed which key to be displayed defaults to description
    search: true,
    limitTo: 3,
  };
  selectedOptions = [
    {
      _id: '5a66d6c31d5e4e36c7711b7a',
      index: 0,
      balance: '$2,806.37',
      picture: 'http://placehold.it/32x32',
      name: 'Burns Dalton',
    },
    {
      _id: '5a66d6c3657e60c6073a2d22',
      index: 1,
      balance: '$2,984.98',
      picture: 'http://placehold.it/32x32',
      name: 'Mcintyre Lawson',
    },
  ];
  options = [
    {
      _id: '5a66d6c31d5e4e36c7711b7a',
      index: 0,
      balance: '$2,806.37',
      picture: 'http://placehold.it/32x32',
      name: 'Burns Dalton',
    },
    {
      _id: '5a66d6c3657e60c6073a2d22',
      index: 1,
      balance: '$2,984.98',
      picture: 'http://placehold.it/32x32',
      name: 'Mcintyre Lawson',
    },
    {
      _id: '5a66d6c376be165a5a7fae33',
      index: 2,
      balance: '$2,794.16',
      picture: 'http://placehold.it/32x32',
      name: 'Amie Franklin',
    },
    {
      _id: '5a66d6c3f7854b6b4d96333b',
      index: 3,
      balance: '$2,537.14',
      picture: 'http://placehold.it/32x32',
      name: 'Jocelyn Horton',
    },
    {
      _id: '5a66d6c31f967d4f3e9d84e9',
      index: 4,
      balance: '$2,141.42',
      picture: 'http://placehold.it/32x32',
      name: 'Fischer Erickson',
    },
    {
      _id: '5a66d6c34cfa8cddefb31602',
      index: 5,
      balance: '$1,398.60',
      picture: 'http://placehold.it/32x32',
      name: 'Medina Underwood',
    },
    {
      _id: '5a66d6c3d727c450794226de',
      index: 6,
      balance: '$3,915.65',
      picture: 'http://placehold.it/32x32',
      name: 'Goldie Barber',
    },
  ];
  resetOption: any;
  selectForm: FormGroup;
  //Example End
  //Form Controls for inserting
  insertForm:FormGroup;
  GroupName:FormControl;
  Members:FormControl;
  Supervisor:FormControl;
  ProjectName:FormControl;
  ProjectDescription:FormControl;
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
  constructor(private service:AdminService,private modalService:BsModalService,
    private fb:FormBuilder,private changeRef:ChangeDetectorRef,private toastr:ToastrService,private route:Router) { }

  ngOnInit(): void {
    this.resetOption = [this.options[0]];//Example Code
        //Modal Message
        this.modalMessage="All Fields are necessary";
        this.GroupName=new FormControl();
        this.Members=new FormControl();
        this.Supervisor=new FormControl();
        this.ProjectName=new FormControl();
        this.ProjectDescription=new FormControl();
        this.insertForm=this.fb.group({
          'GroupName':this.GroupName,
          'Members':this.Members,
          'Supervisor':this.Supervisor,
          'ProjectName':this.ProjectName,
          'ProjectDescription':this.ProjectDescription
        });
        //multiselect dropdown
        this.dropdownList = [
          { item_id: 1, item_text: 'Mumbai' },
          { item_id: 2, item_text: 'Bangaluru' },
          { item_id: 3, item_text: 'Pune' },
          { item_id: 4, item_text: 'Navsari' },
          { item_id: 5, item_text: 'New Delhi' }
        ];
        this.selectedItems = [
          { item_id: 3, item_text: 'Pune' },
          { item_id: 4, item_text: 'Navsari' }
        ];
        this.dropdownSettings = {
          singleSelection: false,
          idField: 'item_id',
          textField: 'item_text',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          itemsShowLimit: 3,
          allowSearchFilter: true
        };
        this.service.getStudents().subscribe(result=>{
          console.log(result);
          this.studentOptions=result;
        })
  }
  //loading add group modal
  onAddGroup(){
    this.modalRef=this.modalService.show(this.modal);
  }
  reset() {//Example
    this.resetOption = [];
  }
}
