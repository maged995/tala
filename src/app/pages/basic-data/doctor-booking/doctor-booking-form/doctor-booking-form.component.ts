import { Component, Inject, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { empty, Observable } from 'rxjs';
import { Departmentservice } from '../../../../shared/department.service';
import { DoctorBookingService } from '../../../../shared/doctor-booking.service';
import { EmployeesService } from '../../../../shared/employees.service';
import { MiniSafesService } from '../../../../shared/mini-safes.service';
import { NotificationService } from '../../../../shared/notification.service';
import { ReservationDoctorService } from '../../../../shared/reservation-doctor.service';
import { ReservationsService } from '../../../../shared/reservations.service';
import { TreasuryService } from '../../../../shared/treasury.service';

@Component({
  selector: 'ngx-doctor-booking-form',
  templateUrl: './doctor-booking-form.component.html',
  styles: []
})
export class DoctorBookingFormComponent implements OnInit {
  submitted:boolean=false; 
  DoctorList$:Observable<any>;
DeptList$:Observable<any>;
ReservationTypeList$:Observable<any>;
  submit: boolean;
  reservation: number;
    constructor(
      public service:DoctorBookingService,
      private serviceTreasury:TreasuryService,
    private serviceDept:Departmentservice,
    private serviceReservation:ReservationDoctorService,
     // private serviceShifts:ShiftsService,
     private serviceMiniSafes:MiniSafesService,
      public dialogRef: MatDialogRef<DoctorBookingFormComponent>,
      private serviceEmployees:EmployeesService,
      @Inject(MAT_DIALOG_DATA) public data, 
      private notify:NotificationService) { }
  
    ngOnInit() {
    this.submit=true;
    this.DeptList$=this.serviceDept.getActiveDepartments();
this.ReservationTypeList$=this.serviceReservation.getAllReservationDoctor();
     this.service.doctorBookingForm.reset({DoctorBookingId:0});
this.service.doctorBookingForm;
    }
  
    get f(){
      return this.service.doctorBookingForm.controls;
    }


    getTotal(){
      let price=this.service.doctorBookingForm.get('Price').value;
      let Qty=this.service.doctorBookingForm.get('Qty').value;
if(price>0)
{
      this.service.doctorBookingForm.get('Total').setValue(price*Qty);
}
    }

    changeReservationType(ctrl){

      this.reservation=0;
      if(typeof(ctrl)==="undefined"){
        
        
      }
      else 
      {

        this.service.doctorBookingForm.get('Price').setValue('');
        this.service.doctorBookingForm.get('Qty').setValue('');
        this.service.doctorBookingForm.get('Total').setValue('');
        this.service.doctorBookingForm.get('Precentage').setValue('');
        this.reservation=ctrl.ReservationDoctorId;
        

if(ctrl.ReservationDoctorId==1)
{

    this.service.doctorBookingForm.get('Precentage').setValue(0);
}

else if(ctrl.ReservationDoctorId==2)
{

  this.service.doctorBookingForm.get('Qty').setValue(1);
  this.service.doctorBookingForm.get('Precentage').setValue(0);



}
else if(ctrl.ReservationDoctorId==3)
      {
        this.service.doctorBookingForm.get('Price').setValue(0);
        this.service.doctorBookingForm.get('Qty').setValue(0);
        this.service.doctorBookingForm.get('Total').setValue(0);
      }
      else if(ctrl.ReservationDoctorId==5)
      {
        this.service.doctorBookingForm.get('Qty').setValue(1);

      }


      }

    }
    changeDepartMent(ctrl)
    {
      if(typeof(ctrl)==="undefined"){
        this.service.doctorBookingForm.controls['DoctorId'].setValue("");
  
        this.DoctorList$=empty();
      }
      else 
      {
        this.service.doctorBookingForm.controls['DoctorId'].setValue("");
        this.DoctorList$=this.serviceEmployees.getAllEmployeesByFlagIdAndDept(1,ctrl.DeptId);
 



      }
    }
  
  
    onClose(){
      this.service.doctorBookingForm.reset({DoctorBookingId:0});
      this.dialogRef.close();
    }
  
    onSubmit(){


  this.submitted=true;

  if(this.service.doctorBookingForm.invalid)
  {
  
  return;
  }
  else 
  {
    /*
    this.serviceTreasury.getBalance().subscribe(res=>{
      if(parseFloat(this.service.doctorBookingForm.get('DoctorPayed').value) > res)
      {
        this.notify.error('المبلغ المطلوب اكبر من المبلغ الحالي في الخزنه');
        return;
      }
      else 
      {
this.submitTrue();
}
    })
*/
this.submitTrue();
  }

    }

    submitTrue(){
     // this.serviceShifts.getAnyShifts().subscribe((res:number)=>{
       this.serviceMiniSafes.checkSafes().subscribe(res=>{
        if(res==1)
        { 

      this.submit=false;
      var body={
        ...this.service.doctorBookingForm.value 
        }
   
        this.service.postDoctorBooking(body).subscribe(su=>{
          this.notify.success('Successfully added');
      
          this.dialogRef.close(su);
        })

        }
        else 
        {
this.notify.error("Please open the vault first")
        }
      })
    }

  }
