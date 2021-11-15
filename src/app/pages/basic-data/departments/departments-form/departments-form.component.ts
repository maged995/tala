import { Component, OnInit, Inject } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NotificationService } from '../../../../shared/notification.service';
import { Departmentservice } from '../../../../shared/department.service';


@Component({
  selector: 'ngx-departments-form',
  templateUrl: './departments-form.component.html',
  styles: []
})
export class DepartmentsFormComponent implements OnInit {


  submitted:boolean=false;

    constructor(
      public service:Departmentservice,public dialogRef: MatDialogRef<DepartmentsFormComponent>,
      @Inject(MAT_DIALOG_DATA) public data,
      private notify:NotificationService) { }

    ngOnInit() {


      if(this.data.DeptId==null){
this.service.departmentForm;
    }
  else
  {
  this.service.getOneDepartment(this.data.DeptId).subscribe((res:any)=>{
    this.service.departmentForm.setValue({
      DeptId:res.DeptId,
      DeptDescr:res.DeptDescr,
      IsActive:res.IsActive
       })
  })
  }

    }

    get f(){
      return this.service.departmentForm.controls;
    }


    onClose(){
      this.service.departmentForm.reset({DeptId:0,IsActive:true});
      this.dialogRef.close();
    }

    onSubmit(){

  this.submitted=true;
  if(this.service.departmentForm.invalid)
  {
  return;
  }
  else
  {
  var body={
  ...this.service.departmentForm.value
  }
  if(this.data.DeptId==null)
  {


  this.service.postDepartment(body).subscribe(res=>{
    this.notify.success('Successfully added');
    this.service.departmentForm.reset({DeptId:0,IsActive:true});
    this.dialogRef.close();
  })

  }
  else
  {
    this.service.putDepartment(this.data.DeptId,body).subscribe(res=>{
    this.notify.success('Edited successfully');
    this.service.departmentForm.reset({DeptId:0,IsActive:true});
    this.dialogRef.close();
    })
  }
  }

    }

}
