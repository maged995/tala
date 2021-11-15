import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Observable } from 'rxjs';
import { BranchDepartmentService } from '../../../../shared/branch-department.service';
import { NotificationService } from '../../../../shared/notification.service';

@Component({
  selector: 'ngx-branch-department-form',
  templateUrl: './branch-department-form.component.html',
  styles: []
})
export class BranchDepartmentFormComponent implements OnInit {



  submitted:boolean=false;
 departmentList$:Observable<any>;
    constructor(
      public service:BranchDepartmentService,public dialogRef: MatDialogRef<BranchDepartmentFormComponent>,
      @Inject(MAT_DIALOG_DATA) public data,

      private notify:NotificationService) { }

    ngOnInit() {



      if(this.data.BranchDeptId==null){
this.service.branchDepartmentForm;
this.departmentList$=this.service.getActiveDepartment(this.data.BranchId,0)
this.service.branchDepartmentForm.get('BranchId').setValue(this.data.BranchId);
    }
  else
  {

  this.service.getOneBranchDepartment(this.data.BranchDeptId).subscribe((res:any)=>{
    this.departmentList$=this.service.getActiveDepartment(this.data.BranchId,this.data.BranchDeptId)

    this.service.branchDepartmentForm.setValue({
      BranchDeptId:res.BranchDeptId,
      BranchId:res.BranchId,
      DeptId:res.DeptId,
      IsActive:res.IsActive
       })
  })
  }

    }

    get f(){
      return this.service.branchDepartmentForm.controls;
    }




    onClose(){
      this.service.branchDepartmentForm.reset({BranchDeptId:0,IsActive:true});
      this.dialogRef.close();
    }

    onSubmit(){

  this.submitted=true;
  if(this.service.branchDepartmentForm.invalid)
  {
  return;
  }
  else
  {
  var body={
  ...this.service.branchDepartmentForm.value
  }
  if(this.data.BranchDeptId==null)
  {


  this.service.postDepartment(body).subscribe(res=>{
    this.notify.success('Successfully added');
    this.service.branchDepartmentForm.reset({BranchDeptId:0,IsActive:true});
    this.dialogRef.close();
  })

  }
  else
  {
    this.service.putDepartment(this.data.BranchDeptId,body).subscribe(res=>{
    this.notify.success('Edited successfully');
    this.service.branchDepartmentForm.reset({BranchDeptId:0,IsActive:true});
    this.dialogRef.close();
    })
  }
  }

    }


}
