import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


import { Observable } from 'rxjs';
import { GroupsService } from '../../../../shared/groups.service';
import { NotificationService } from '../../../../shared/notification.service';



@Component({
  selector: 'ngx-groups-form',
  templateUrl: './groups-form.component.html',
  styleUrls: ['./groups-form.component.scss']
})
export class GroupsFormComponent implements OnInit {

  submitted:boolean=false;

    constructor(
      public service:GroupsService,public dialogRef: MatDialogRef<GroupsFormComponent>,
      @Inject(MAT_DIALOG_DATA) public data,
      private notify:NotificationService) { }
  
    ngOnInit() {

      if(this.data.GroupId==null){
this.service.groupsForm;
    }
  else
  {
  this.service.getOneGroup(this.data.GroupId).subscribe((res:any)=>{
    this.service.groupsForm.setValue({
      GroupId:res.GroupId,
      GroupDesc:res.GroupDesc,
  
  IsActive:res.IsActive
       })
  })
  }
  
    }
  
    get f(){
      return this.service.groupsForm.controls;
    }
  
  
    onClose(){
      this.service.groupsForm.reset({GroupId:0,IsActive:true});
      this.dialogRef.close();
    }
  
    onSubmit(){
     
  this.submitted=true;
  if(this.service.groupsForm.invalid)
  {
  return;
  }
  else
  {
  var body={
  ...this.service.groupsForm.value 
  }
  if(this.data.GroupId==null)
  {


  this.service.postGroup(body).subscribe(res=>{
    this.notify.success('تمت الاضافه بنجاح');
    this.service.groupsForm.reset({GroupId:0,IsActive:true});
    this.dialogRef.close();
  })
  
  }
  else 
  {
    this.service.putGroup(this.data.GroupId,body).subscribe(res=>{
    this.notify.success('تم التعديل بنجاح');
    this.service.groupsForm.reset({GroupId:0,IsActive:true});
    this.dialogRef.close();
    })
  }
  }
  
    }

}
