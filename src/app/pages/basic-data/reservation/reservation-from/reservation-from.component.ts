import { Component, OnInit, Inject } from '@angular/core';
import { ReservationsService } from '../../../../shared/reservations.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NotificationService } from '../../../../shared/notification.service';

@Component({
  selector: 'ngx-reservation-from',
  templateUrl: './reservation-from.component.html',
  styles: []
})
export class ReservationFromComponent implements OnInit {

  submitted:boolean=false;

    constructor(
      public service:ReservationsService,public dialogRef: MatDialogRef<ReservationFromComponent>,
      @Inject(MAT_DIALOG_DATA) public data,

      private notify:NotificationService) { }

    ngOnInit() {



      if(this.data.ReservationId==null){
this.service.reservationForm;


    }
  else
  {

  this.service.getOneReservation(this.data.ReservationId).subscribe((res:any)=>{
    this.service.reservationForm.setValue({
      ReservationId:res.ReservationId,
      ReservationDesc:res.ReservationDesc,
      IsActive:res.IsActive
       })
  })
  }

    }

    get f(){
      return this.service.reservationForm.controls;
    }




    onClose(){
      this.service.reservationForm.reset({ReservationId:0,IsActive:true});
      this.dialogRef.close();
    }

    onSubmit(){

  this.submitted=true;
  if(this.service.reservationForm.invalid)
  {
  return;
  }
  else
  {
  var body={
  ...this.service.reservationForm.value
  }
  if(this.data.ReservationId==null)
  {


  this.service.postReservation(body).subscribe(res=>{
    this.notify.success('Successfully added');
    this.service.reservationForm.reset({ReservationId:0,IsActive:true});
    this.dialogRef.close();
  })

  }
  else
  {
    this.service.putReservation(this.data.ReservationId,body).subscribe(res=>{
    this.notify.success('Edited successfully');
    this.service.reservationForm.reset({ReservationId:0,IsActive:true});
    this.dialogRef.close();
    })
  }
  }

    }

}
