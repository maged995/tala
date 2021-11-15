import { Component, OnInit, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ReservationTypesService } from '../../../../shared/reservation-types.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ReservationsService } from '../../../../shared/reservations.service';
import { NotificationService } from '../../../../shared/notification.service';

@Component({
  selector: 'ngx-reservation-type-from',
  templateUrl: './reservation-type-from.component.html',
  styles: []
})
export class ReservationTypeFromComponent implements OnInit {
  submitted:boolean=false;
 reservationList$:Observable<any>;
 ReservationTypeId;
    constructor(
      public service:ReservationTypesService,public dialogRef: MatDialogRef<ReservationTypeFromComponent>,
      @Inject(MAT_DIALOG_DATA) public data,private reservationService:ReservationsService,
     
      private notify:NotificationService) { }
  
    ngOnInit() {
      this.ReservationTypeId=this.data.ReservationTypeId;
this.reservationList$=this.reservationService.getReservationsForDept(this.data.DeptId);
     
      if(this.data.ReservationTypeId==null){
this.service.reservationTypeForm;
this.service.reservationTypeForm.get('DeptId').setValue(this.data.DeptId);

    }
  else
  {
    
  this.service.getOneReservationType(this.data.ReservationTypeId).subscribe((res:any)=>{
    this.service.reservationTypeForm.setValue({
      ReservationTypeId:res.ReservationTypeId,
      ReservationId:res.ReservationId,
      DeptId:res.DeptId,
      Price:res.Price,
      IsActive:res.IsActive
       })
  })
  }
  
    }
  
    get f(){
      return this.service.reservationTypeForm.controls;
    }

  
  
  
    onClose(){
      this.service.reservationTypeForm.reset({ReservationTypeId:0,IsActive:true});
      this.dialogRef.close();
    }
  
    onSubmit(){
     
  this.submitted=true;
  if(this.service.reservationTypeForm.invalid)
  {
  return;
  }
  else
  {
  var body={
  ...this.service.reservationTypeForm.value 
  }
  if(this.data.ReservationTypeId==null)
  {


  this.service.postReservation(body).subscribe(res=>{
    this.notify.success('تمت الاضافه بنجاح');
    this.service.reservationTypeForm.reset({ReservationTypeId:0,IsActive:true});
    this.dialogRef.close();
  })
  
  }
  else 
  {
    this.service.putReservation(this.data.ReservationTypeId,body).subscribe(res=>{
    this.notify.success('تم التعديل بنجاح');
    this.service.reservationTypeForm.reset({ReservationTypeId:0,IsActive:true});
    this.dialogRef.close();
    })
  }
  }
  
    }

}
