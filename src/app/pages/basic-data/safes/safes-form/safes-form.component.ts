import { Component, OnInit, Inject } from '@angular/core';
import { SafesService } from '../../../../shared/safes.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BranchesService } from '../../../../shared/branches.service';
import { NotificationService } from '../../../../shared/notification.service';

@Component({
  selector: 'ngx-safes-form',
  templateUrl: './safes-form.component.html',
  styles: []
})
export class SafesFormComponent implements OnInit {



  submitted:boolean=false;

    constructor(
      public service:SafesService,public dialogRef: MatDialogRef<SafesFormComponent>,
      @Inject(MAT_DIALOG_DATA) public data,

      private notify:NotificationService) { }

    ngOnInit() {



      if(this.data.SafeId==null){
this.service.safesForm;
this.service.safesForm.get('BranchId').setValue(this.data.BranchId);
    }
  else
  {

  this.service.getOneSafe(this.data.SafeId).subscribe((res:any)=>{
    this.service.safesForm.setValue({
      SafeId:res.SafeId,
      BranchId:res.BranchId,
      SafeName:res.SafeName,
      IsActive:res.IsActive
       })
  })
  }

    }

    get f(){
      return this.service.safesForm.controls;
    }




    onClose(){
      this.service.safesForm.reset({SafeId:0,IsActive:true});
      this.dialogRef.close();
    }

    onSubmit(){

  this.submitted=true;
  if(this.service.safesForm.invalid)
  {
  return;
  }
  else
  {
  var body={
  ...this.service.safesForm.value
  }
  if(this.data.SafeId==null)
  {


  this.service.postSafe(body).subscribe(res=>{
    this.notify.success('Successfully added');
    this.service.safesForm.reset({SafeId:0,IsActive:true});
    this.dialogRef.close();
  })

  }
  else
  {
    this.service.putSafe(this.data.SafeId,body).subscribe(res=>{
    this.notify.success('Edited successfully');
    this.service.safesForm.reset({SafeId:0,IsActive:true});
    this.dialogRef.close();
    })
  }
  }

    }

}
