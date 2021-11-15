import { Component, OnInit, Inject } from '@angular/core';
import { BranchesService } from '../../../../shared/branches.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NotificationService } from '../../../../shared/notification.service';

@Component({
  selector: 'ngx-branches-form',
  templateUrl: './branches-form.component.html',
  styles: []
})
export class BranchesFormComponent implements OnInit {


  submitted:boolean=false;

    constructor(
      public service:BranchesService,public dialogRef: MatDialogRef<BranchesFormComponent>,
      @Inject(MAT_DIALOG_DATA) public data,
      private notify:NotificationService) { }

    ngOnInit() {


      if(this.data.BranchId==null){
this.service.branchForm;
    }
  else
  {
  this.service.getOneBranch(this.data.BranchId).subscribe((res:any)=>{
    this.service.branchForm.setValue({
      BranchId:res.BranchId,
      BranchDesc:res.BranchDesc,
      BranchAddress:res.BranchAddress,
      BranchPhone:res.BranchPhone,
      BranchIsActive:res.BranchIsActive
       })
  })
  }

    }

    get f(){
      return this.service.branchForm.controls;
    }


    onClose(){
      this.service.branchForm.reset({BranchId:0,BranchIsActive:true});
      this.dialogRef.close();
    }

    onSubmit(){

  this.submitted=true;
  if(this.service.branchForm.invalid)
  {
  return;
  }
  else
  {
  var body={
  ...this.service.branchForm.value
  }
  if(this.data.BranchId==null)
  {


  this.service.postBranch(body).subscribe(res=>{
    this.notify.success('Successfully added');
    this.service.branchForm.reset({BranchId:0,BranchIsActive:true});
    this.dialogRef.close();
  })

  }
  else
  {
    this.service.putBranch(this.data.BranchId,body).subscribe(res=>{
    this.notify.success('Edited successfully');
    this.service.branchForm.reset({BranchId:0,BranchIsActive:true});
    this.dialogRef.close();
    })
  }
  }

    }

}
