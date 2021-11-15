import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ReservationsService {
reservationForm:FormGroup=this.fb.group({
  ReservationId:["0"],
  ReservationDesc:["",Validators.required],
  IsActive:[true]
})

  constructor(private http:HttpClient,private fb:FormBuilder) { }

  getAllReservations(){
    return this.http.get(environment.apiUrl+"Reservations");
  }
  getOneReservation(ReservationId){
    return this.http.get(environment.apiUrl+"Reservations/byId?id="+ReservationId);
  }
getReservationsForDept(DeptId){
  return this.http.get(environment.apiUrl+"Reservations/ForDeptId?id="+DeptId);
}

  postReservation(body){
    return this.http.post(environment.apiUrl+"Reservations/",body);
  }
  putReservation(ReservationId,body){
    return this.http.put(environment.apiUrl+"Reservations/"+ReservationId,body);
  }
  deleteReservation(ReservationId){
    return this.http.delete(environment.apiUrl+"Reservations/"+ReservationId);
  }
}
