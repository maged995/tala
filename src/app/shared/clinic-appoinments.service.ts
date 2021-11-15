import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ClinicAppoinmentsService {
  clinicAppoinmentForm:FormGroup=this.fb.group({
    ClinicAppoinmentId:["0"],
    ClinicId:["",Validators.required],
    DoctorId:["",Validators.required],
    AppoinmentTimeFrom:["",Validators.required],
    AppoinmentTimeTo:["",Validators.required],
    DayId:["",Validators.required],
    IsActive:[true]
  })

  constructor(private http:HttpClient,private fb:FormBuilder) { }

  getAllClinicAppoinments(ClinicId,DayId){

    return this.http.get(environment.apiUrl+"ClinicAppoinments/byClinicAndDay?ClinicId="+ClinicId+"&&DayId="+DayId)
  }

  getClinicAppoinmentReservation(ClinicId,DayId,DoctorId=null){
    if(DoctorId==null)
    {
return this.http.get
(environment.apiUrl+"ClinicAppoinments/getByClinicAndDayReservation?ClinicId="+ClinicId+"&&DayId="+DayId)
    }
    else 
    {
      return this.http.get
(environment.apiUrl+"ClinicAppoinments/getByClinicAndDayReservation?ClinicId="+ClinicId+"&&DayId="+DayId+"&&DoctorId="+DoctorId)
    }  
}
  getOneClinicAppoinment(ClinicAppoinmentId)
  {
    return this.http.get(environment.apiUrl+"ClinicAppoinments/byId?id="+ClinicAppoinmentId);
  }
  postClinicAppoinments(body){
return this.http.post(environment.apiUrl+"ClinicAppoinments",body);
  }
  putClinicAppoinments(ClinicAppoinmentId,body){
return this.http.put(environment.apiUrl+"ClinicAppoinments/"+ClinicAppoinmentId,body);
  }
  deleteClinicAppoinments(ClinicAppoinmentId){
return this.http.delete(environment.apiUrl+"ClinicAppoinments/"+ClinicAppoinmentId)
  }
}
