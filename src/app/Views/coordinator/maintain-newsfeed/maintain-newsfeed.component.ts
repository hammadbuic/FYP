import { ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalService,BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { DataTableDirective } from 'angular-datatables';
import { Observable, Subject } from 'rxjs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import{BsDatepickerConfig} from 'ngx-bootstrap/datepicker';
@Component({
  selector: 'app-maintain-newsfeed',
  templateUrl: './maintain-newsfeed.component.html',
  styleUrls: ['./maintain-newsfeed.component.scss']
})
export class MaintainNewsfeedComponent implements OnInit {
  datePickerConfig:Partial<BsDatepickerConfig>;
  //Form Controls for inserting
  insertForm:FormGroup;
  title:FormControl;
  description:FormControl;
  dueDate:FormControl;
  //Form Controls for updating
  updateForm:FormGroup;
  _title:FormControl;
  _description:FormControl;
  _dueDate:FormControl;
  id:FormControl;
  //Add Modal
@ViewChild('template') modal: TemplateRef<any>;
//update Modal
@ViewChild('editTemplate') editModal:TemplateRef<any>;
//Modal properties
modalMessage:string;
modalRef:BsModalRef;
//Properties for the data table
dtOptions: DataTables.Settings = {};
dtTrigger:Subject<any>=new Subject();
//Data Table directive
@ViewChild(DataTableDirective) dtElement:DataTableDirective;
  constructor(private fb:FormBuilder,private modalService:BsModalService) { }

  ngOnInit(): void {
    //Date Picker Configuration
    this.datePickerConfig=Object.assign({},{containerClass:'theme-dark-blue'});
    //Modal Message
    this.modalMessage="All Fields are necessary";
    //insert specs
    this.title=new FormControl();
    this.description=new FormControl();
    this.dueDate=new FormControl();
    this.insertForm=this.fb.group({
      'Title':this.title,
      'Description':this.description,
      'DueDate':this.dueDate,
    });
    //update specs
    this._title=new FormControl();
    this._description=new FormControl();
    this._dueDate=new FormControl();
    this.id=new FormControl();
    this.updateForm=this.fb.group({
      'id':this.id.value,
      'Title':this._title,
      'Description':this._description,
      'DueDate':this._dueDate,
    });
  }
    //loading add group modal
    onAddNews(){
      this.modalRef=this.modalService.show(this.modal);
    }
    onSubmit(){}
    rerender(){
      this.dtElement.dtInstance.then((dtInstance:DataTables.Api)=>{
        //destroy table in current context
        dtInstance.destroy();
        //rerender again
        this.dtTrigger.next();
      })
    }
    onUpdateModal(){}
}
