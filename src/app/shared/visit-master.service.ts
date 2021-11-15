import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class VisitMasterService {

DiagonsisList:any[]=[];
MedicineList:any[]=[];
ServiceList:any[]=[];
CustomerTeethVisit:any[]=[];

visitMasterForm:FormGroup=this.fb.group({
  VisitMasterId:["",Validators.required],
ClinicReservationId:["",Validators.required],
Discount:["0",[Validators.required,Validators.min(0)]],
  TotalValue:[0,[Validators.required,Validators.min(0)]],
  TotalPoints:[0,[Validators.required,Validators.min(0)]],
  IsClosed:[],
  IsConvert:[],
  DeletedServiceId:[""],
  DeletedCustomerTeethVisitId:[""],
  DeletedDiagnosisId:[""],
  DeletedVisitMedicineId:[""]

})


visitServiceReportsForm:FormGroup=this.fb.group({
  VisitDateFrom:["",Validators.required],
  VisitDateTo:["",Validators.required],
  ServiceId:["",Validators.required]
})

  constructor(private http:HttpClient,private fb:FormBuilder) { }

  getVisitByClinicAppoinmentOpen(ClinicAppoinmentId){
    return this.http.get(environment.apiUrl+"VisitMasters/getVisitByClinicAppoinmentOpen?ClinicAppoinmentId="+ClinicAppoinmentId)
  }

  getReports(VisitMasterId){
    return this.http.get(environment.apiUrl+"VisitMasters/Reports?id="+VisitMasterId)
  }

  getEntryPatient(VisitMasterId){
    return this.http.get(environment.apiUrl+"VisitMasters/entryPatient?VisitMasterId="+VisitMasterId)
  }

  getOneVisitMaster(VisitMasterId){
    return this.http.get(environment.apiUrl+"VisitMasters/byId?id="+VisitMasterId)
  }
  
  checkVisitMasterExist(ClinicId)
  {
   return this.http.get(environment.apiUrl+"VisitMasters/checkByClinicReservationId?ClinicId="+ClinicId)
  }

  checkByDoctorId(){
    return this.http.get(environment.apiUrl+"VisitMasters/checkByDoctorId")
  }

  getOldByCustomerAndDoctor(CustomerId){
    return this.http.get(environment.apiUrl+"VisitMasters/getOldByDoctorAndCustomer?CustomerId="+CustomerId)
  }

  getByDoctorId(){
    return this.http.get(environment.apiUrl+"VisitMasters/getByDoctorId")
  }

  putVisitForm(body){
    return this.http.post(environment.apiUrl+"VisitMasters/PostVisitMaster",body)
  }

  postQuantity(body){
  return this.http.post(environment.apiUrl+"VisitMasters/PostQuantityVisit",body)
  }
}
