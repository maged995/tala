import { Component, OnInit, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { JobsService } from '../../../../shared/jobs.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { NotificationService } from '../../../../shared/notification.service';
import { Departmentservice } from '../../../../shared/department.service';
import { EmployeeFlagService } from '../../../../shared/employee-flag.service';

@Component({
  selector: 'ngx-jobs-form',
  templateUrl: './jobs-form.component.html',
  styles: []
})
export class JobsFormComponent implements OnInit {
  submitted:boolean=false;
 employeeFlagList$:Observable<any>;
    constructor(
      public service:JobsService,public dialogRef: MatDialogRef<JobsFormComponent>,
      @Inject(MAT_DIALOG_DATA) public data,private serviceEmployeeFlag:EmployeeFlagService,

      private notify:NotificationService) { }

    ngOnInit() {

this.employeeFlagList$=this.serviceEmployeeFlag.getAllEmployeeFlag();

      if(this.data.JobId==null){
this.service.jobsForm;
this.service.jobsForm.get('DeptId').setValue(this.data.DeptId);

    }
  else
  {

  this.service.getOneJob(this.data.JobId).subscribe((res:any)=>{
    this.service.jobsForm.setValue({
      JobId:res.JobId,
      JobName:res.JobName,
      DeptId:res.DeptId,
      EmployeeFlagId:res.EmployeeFlagId,
      IsActive:res.IsActive
       })
  })
  }

    }

    get f(){
      return this.service.jobsForm.controls;
    }




    onClose(){
      this.service.jobsForm.reset({JobId:0,IsActive:true});
      this.dialogRef.close();
    }

    onSubmit(){

  this.submitted=true;
  if(this.service.jobsForm.invalid)
  {
  return;
  }
  else
  {
  var body={
  ...this.service.jobsForm.value
  }
  if(this.data.JobId==null)
  {


  this.service.postJob(body).subscribe(res=>{
    this.notify.success('Successfully added');
    this.service.jobsForm.reset({JobId:0,IsActive:true});
    this.dialogRef.close();
  })

  }
  else
  {
    this.service.putJob(this.data.JobId,body).subscribe(res=>{
    this.notify.success('Edited successfully');
    this.service.jobsForm.reset({JobId:0,IsActive:true});
    this.dialogRef.close();
    })
  }
  }

    }

}
