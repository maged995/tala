import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class DoctorBookingService {

  constructor(private http:HttpClient,private fb:FormBuilder) { }

  doctorBookingForm:FormGroup=this.fb.group({
    DoctorBookingId:["0"],
    DeptId:["",Validators.required],
    DoctorId:["",Validators.required],
    ReservationDoctorId:["",Validators.required],
    Price:["",Validators.required],
    Qty:["",Validators.required],
    Total:["",Validators.required],
    Precentage:["",[Validators.required,Validators.max(100),Validators.min(0)]],
    StartDate:["",Validators.required],
    EndDate:["",Validators.required],
  })

  getAllDoctorBooking(){
    return this.http.get(environment.apiUrl+"DoctorBookings")
  }

  postDoctorBooking(body){
    return this.http.post(environment.apiUrl+"DoctorBookings",body)
  }

  
}
