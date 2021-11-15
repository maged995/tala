import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ReservationTypesService {

  reservationTypeForm:FormGroup=this.fb.group({
    ReservationTypeId:["0"],
    ReservationId:["",Validators.required],
    DeptId:["",Validators.required],
    Price:["",[Validators.required,Validators.min(0)]],
    IsActive:[true]

  })

  constructor(private http:HttpClient,private fb:FormBuilder) { }
  getAllReservationsByDept(DeptId){
    return this.http.get(environment.apiUrl+"ReservationTypes/GetByDept?id="+DeptId);
  }
  
  getAllReservationsByClinic(ClinicId){
    return this.http.get(environment.apiUrl+"ReservationTypes/GetByClinic?id="+ClinicId);
  }

  getOneReservationType(ReservationTypeId){
    return this.http.get(environment.apiUrl+"ReservationTypes/byId?id="+ReservationTypeId);
  }
  postReservation(body){
return this.http.post(environment.apiUrl+"ReservationTypes",body);
  }
  putReservation(ReservationTypeId,body){
    return this.http.put(environment.apiUrl+"ReservationTypes/"+ReservationTypeId,body);
  }
  deleteReservation(ReservationTypeId){
    return this.http.delete(environment.apiUrl+"ReservationTypes/"+ReservationTypeId);
  }
}
