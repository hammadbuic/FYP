import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalService,BsModalRef } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-manage-activity',
  templateUrl: './manage-activity.component.html',
  styleUrls: ['./manage-activity.component.scss']
})
export class ManageActivityComponent implements OnInit {
  isOpen=true;//to be used for expension
  activities = [
    {
      title: 'Dynamic Group Header - 1',
      content: 'Dynamic Group Body - 1'
    },
    {
      title: 'Dynamic Group Header - 2',
      content: 'Dynamic Group Body - 2'
    }
  ];
  //Add Modal
  @ViewChild('template') modal: TemplateRef<any>;
  //update Modal
  @ViewChild('editTemplate') editModal:TemplateRef<any>;
  //Modal properties
  modalMessage:string;
  modalRef:BsModalRef;
  constructor(private modalService:BsModalService) { }

  ngOnInit(): void {
  }
  onAddActivity(){
    //this.modalRef=this.modalService.show(this.modal);
    this.activities.push({
      title: `Dynamic Group Header - ${this.activities.length + 1}`,
      content: `Dynamic Group Body - ${this.activities.length + 1}`
    });

  }
  onSubmit(){}
}
