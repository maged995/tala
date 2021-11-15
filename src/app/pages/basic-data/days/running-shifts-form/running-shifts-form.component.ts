import { Component, Inject, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EmployeesService } from '../../../../shared/employees.service';
import { NotificationService } from '../../../../shared/notification.service';
import { RunningShiftsService } from '../../../../shared/running-shifts.service';
import { SafesService } from '../../../../shared/safes.service';
import { ShiftsTimeService } from '../../../../shared/shifts-time.service';

@Component({
  selector: 'ngx-running-shifts-form',
  templateUrl: './running-shifts-form.component.html',
  styles: []
})
export class RunningShiftsFormComponent implements OnInit {

  submitted:boolean=false;
  shiftsTimesList$:Observable<any>;
  safesList$: Observable<any>;
 
    constructor(
      public service:RunningShiftsService,private serviceShiftsTime:ShiftsTimeService,public dialogRef: MatDialogRef<RunningShiftsFormComponent>,
      @Inject(MAT_DIALOG_DATA) public data,private serviceSafes:SafesService,
      private serviceEmployees:EmployeesService,
      private notify:NotificationService) { }
  
    ngOnInit() {
      this.service.runningShiftForm.controls["ShiftsTimeId"].clearValidators();
     this.service.runningShiftForm.controls["SafeId"].clearValidators();
     this.service.runningShiftForm.controls["ShiftsTimeId"].updateValueAndValidity();
     this.service.runningShiftForm.controls["SafeId"].updateValueAndValidity();
      if(this.data.runningShift==1)
      {
        this.service.runningShiftForm.controls["ShiftsTimeId"].setValidators([Validators.required]);
        this.service.runningShiftForm.controls["ShiftsTimeId"].updateValueAndValidity();

     this.shiftsTimesList$=this.serviceShiftsTime.getAllShiftsTime();
      }
      else 
      {
        this.service.runningShiftForm.controls["SafeId"].setValidators([Validators.required]);
        this.service.runningShiftForm.controls["SafeId"].updateValueAndValidity();
        this.serviceEmployees.getBranchIdForUser().subscribe((res:number)=>{
  
          console.log(res)
          this.safesList$=this.serviceSafes.getAllSafes(res).pipe(map((a:any)=>a.safes));
        })
      }
this.service.runningShiftForm.reset({RunningShiftId:0})
this.service.runningShiftForm;
  
  }
  
    
  
    get f(){
      return this.service.runningShiftForm.controls;
    }
  
  
    onClose(){
      this.service.runningShiftForm.reset({RunningShiftId:0})
      this.dialogRef.close();
    }
  
    onSubmit(){
     
  this.submitted=true;
  if(this.service.runningShiftForm.invalid)
  {
  return;
  }
  else
  {
  var body={
  ...this.service.runningShiftForm.value 
  }

if(this.data.runningShift==1)
{
  this.service.postRunningShifts(body).subscribe(res=>{
    this.notify.success('تمت الاضافه بنجاح');
    this.service.runningShiftForm.reset({RunningShiftId:0})
    this.dialogRef.close();
  })
  
 
    }
    else if(this.data.runningShift==0)
    {
      let SafeId=this.service.runningShiftForm.controls['SafeId'].value;
       this.service.deleteRunningShifts(SafeId).subscribe(result=>{
        if(result==0)
        {
          this.notify.error('لايمكن اغلاق الورديه قبل اغلاق جميع الخزن');
          this.service.runningShiftForm.reset({RunningShiftId:0})
          this.dialogRef.close();
        }
        else if(result==1)
        {
                  this.notify.error('تم  اغلاق الورديه  بنجاح');
                  this.service.runningShiftForm.reset({RunningShiftId:0})
                  this.dialogRef.close();
        }       
                
                })
              }
    
}
    }

}

