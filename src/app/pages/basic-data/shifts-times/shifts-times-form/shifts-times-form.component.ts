import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NotificationService } from '../../../../shared/notification.service';
import { ShiftsTimeService } from '../../../../shared/shifts-time.service';

@Component({
  selector: 'ngx-shifts-times-form',
  templateUrl: './shifts-times-form.component.html',
  styles: []
})
export class ShiftsTimesFormComponent implements OnInit {


  submitted:boolean=false;
 
    constructor(
      public service:ShiftsTimeService,public dialogRef: MatDialogRef<ShiftsTimesFormComponent>,
      @Inject(MAT_DIALOG_DATA) public data,
      private notify:NotificationService) { }
  
    ngOnInit() {
     
     
      if(this.data.ShiftsTimeId==null){
this.service.shiftsTimeForm;
    }
  else
  {
  this.service.getOneShiftsTime(this.data.ShiftsTimeId).subscribe((res:any)=>{
    this.service.shiftsTimeForm.setValue({
      ShiftsTimeId:res.ShiftsTimeId,
      ShiftsTimeName:res.ShiftsTimeName,
      StartTime:res.StartTime,
      EndTime:res.EndTime,
      IsActive:res.IsActive
       })
  })
  }
  
    }
  
    get f(){
      return this.service.shiftsTimeForm.controls;
    }
  
  
    onClose(){
      this.service.shiftsTimeForm.reset({ShiftsTimeId:0,IsActive:true});
      this.dialogRef.close();
    }
  
    onSubmit(){
     
  this.submitted=true;
  if(this.service.shiftsTimeForm.invalid)
  {
  return;
  }
  else
  {
  var body={
  ...this.service.shiftsTimeForm.value 
  }
  if(this.data.ShiftsTimeId==null)
  {


  this.service.postShift(body).subscribe(res=>{
    this.notify.success('تمت الاضافه بنجاح');
    this.service.shiftsTimeForm.reset({ShiftsTimeId:0,IsActive:true});
    this.dialogRef.close();
  })
  
  }
  else 
  {
    this.service.putShift(this.data.ShiftsTimeId,body).subscribe(res=>{
    this.notify.success('تم التعديل بنجاح');
    this.service.shiftsTimeForm.reset({ShiftsTimeId:0,IsActive:true});
        this.dialogRef.close();
    })
  }
  }
  
    }
}
