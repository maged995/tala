import { Component, OnInit, Inject } from '@angular/core';

import { JobsService } from '../../../../shared/jobs.service';
import { Observable, empty } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { NotificationService } from '../../../../shared/notification.service';

import { map } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { EmployeesService } from '../../../../shared/employees.service';
import { Departmentservice } from '../../../../shared/department.service';
import { BranchesService } from '../../../../shared/branches.service';
import { Validators } from '@angular/forms';

@Component({
  selector: 'ngx-employees-form',
  templateUrl: './employees-form.component.html',
  styles: []
})
export class EmployeesFormComponent implements OnInit {

departmentList$:Observable<any>;
branchList$:Observable<any>;
  jobList$:Observable<any>;
  submitted:boolean=false;

    constructor(
      public service:EmployeesService,public dialogRef: MatDialogRef<EmployeesFormComponent>,
      @Inject(MAT_DIALOG_DATA) public data,private serviceDepartments:Departmentservice,
 private serviceBranch:BranchesService,
      private serviceJobs:JobsService,
      private notify:NotificationService) { }

    ngOnInit() {
      this.branchList$=this.serviceBranch.getAllBranches();
 this.jobList$=empty();
 this.departmentList$=empty();

 if(this.data.EmployeeFlagId==1){
this.service.employeesForm.get('EmpSalary').clearValidators();
this.service.employeesForm.get('EmpSalary').updateValueAndValidity();
 }
 else
 {
  this.service.employeesForm.get('EmpSalary').setValidators([Validators.required]);
  this.service.employeesForm.get('EmpSalary').updateValueAndValidity();
 }

      if(this.data.EmployeeId==null){
this.service.employeesForm;

    }
  else
  {

  this.service.getOneEmployee(this.data.EmployeeId).subscribe((res:any)=>{
    this.departmentList$=this.serviceDepartments.getDepartmentsByEmployeeFlag(this.data.EmployeeFlagId,res.BranchId)
    this.jobList$=this.serviceJobs.getAllJobsByFlag(res.DeptId,this.data.EmployeeFlagId);
    var datePipe = new DatePipe("en-US");
    let formatedyear = datePipe.transform(res.HireDate, 'yyyy-MM-dd');
    this.service.employeesForm.setValue({
      EmployeeId:res.EmployeeId,
    EmployeeName:res.EmployeeName,
      EmployeeAge:res.EmployeeAge,
      JobId:res.JobId,
      BranchId:res.BranchId,
      DeptId:res.DeptId,
      EmpSalary:res.EmpSalary,
      HireDate:formatedyear,
      EmpPhone:res.EmpPhone,
      EmpAddress:res.EmpAddress,
      UserName:res.UserName,
      GenderId:res.GenderId,
      IsActive:res.IsActive,
      IsLogIn:res.IsLogIn
       })
  })
  }

    }



    get f(){
      return this.service.employeesForm.controls;
    }




    onClose(){
      this.service.employeesForm.reset({EmployeeId:0,IsLogIn:false,IsActive:true});
      this.dialogRef.close();
    }

    onSubmit(){

  this.submitted=true;
  if(this.service.employeesForm.invalid)
  {

  return;
  }
  else
  {
  var body={
  ...this.service.employeesForm.value
  }
  if(this.data.EmployeeId==null)
  {


  this.service.postEmployee(body).subscribe(res=>{
    this.notify.success('Successfully added');
    this.service.employeesForm.reset({EmployeeId:0,IsLogIn:false,IsActive:true});
    this.dialogRef.close();
  })

  }
  else
  {
    this.service.putEmployee(this.data.EmployeeId,body).subscribe(res=>{
    this.notify.success('Edited successfully');
    this.service.employeesForm.reset({EmployeeId:0,IsLogIn:false,IsActive:true});
    this.dialogRef.close();
    })
  }
  }

    }



    changeDepartMent(ctrl)
    {
      if(typeof(ctrl)==="undefined"){
        this.service.employeesForm.controls['JobId'].setValue("");

        this.jobList$=empty();
      }
      else
      {
        this.service.employeesForm.controls['JobId'].setValue("");
        this.jobList$=this.serviceJobs.getAllJobsByFlag(ctrl.DeptId,this.data.EmployeeFlagId);

      }
    }


changeBranch(ctrl){
  this.service.employeesForm.controls['JobId'].setValue("");
  this.service.employeesForm.controls['DeptId'].setValue("");
  this.jobList$=empty();
  if(typeof(ctrl)==="undefined"){
    this.departmentList$=empty();
  }
  else
  {
   this.departmentList$=this.serviceDepartments.getDepartmentsByEmployeeFlag(this.data.EmployeeFlagId,ctrl.BranchId)
  }


}

}
