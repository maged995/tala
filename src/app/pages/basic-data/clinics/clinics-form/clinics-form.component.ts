import { Component, OnInit, Inject } from '@angular/core';
import { ClinicsService } from '../../../../shared/clinics.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { EmployeeFlagService } from '../../../../shared/employee-flag.service';
import { NotificationService } from '../../../../shared/notification.service';

@Component({
  selector: 'ngx-clinics-form',
  templateUrl: './clinics-form.component.html',
  styles: []
})
export class ClinicsFormComponent implements OnInit {

  submitted:boolean=false;

    constructor(
      public service:ClinicsService,public dialogRef: MatDialogRef<ClinicsFormComponent>,
      @Inject(MAT_DIALOG_DATA) public data,

      private notify:NotificationService) { }

    ngOnInit() {


      if(this.data.ClinicId==null){
this.service.clinicForm;
this.service.clinicForm.get('BranchId').setValue(this.data.BranchId);

    }
  else
  {

  this.service.getOneClinic(this.data.ClinicId).subscribe((res:any)=>{
    this.service.clinicForm.setValue({
      ClinicId:res.ClinicId,
      ClinicDesc:res.ClinicDesc,
      BranchId:res.BranchId,
      IsActive:res.IsActive
       })
  })
  }

    }

    get f(){
      return this.service.clinicForm.controls;
    }




    onClose(){
      this.service.clinicForm.reset({ClinicId:0,IsActive:true});
      this.dialogRef.close();
    }

    onSubmit(){

  this.submitted=true;
  if(this.service.clinicForm.invalid)
  {
  return;
  }
  else
  {
  var body={
  ...this.service.clinicForm.value
  }
  if(this.data.ClinicId==null)
  {


  this.service.postClinic(body).subscribe(res=>{
    this.notify.success('Successfully added');
    this.service.clinicForm.reset({ClinicId:0,IsActive:true});
    this.dialogRef.close();
  })

  }
  else
  {
    this.service.putClinic(this.data.ClinicId,body).subscribe(res=>{
    this.notify.success('Edited successfully');
    this.service.clinicForm.reset({ClinicId:0,IsActive:true});
    this.dialogRef.close();
    })
  }
  }

    }

}
