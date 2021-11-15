import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ClinicsService {
  clinicForm:FormGroup=this.fb.group({
    ClinicId:["0"],
    ClinicDesc:["",Validators.required],
    BranchId:["",Validators.required],
    IsActive:[true]
  })

  constructor(private http:HttpClient,private fb:FormBuilder) { }

  getAllClinicsByDept(DeptId){
    return this.http.get(environment.apiUrl+"Clinics/getByDept?id="+DeptId);
  }

  getOneClinic(ClinicId){
    return this.http.get(environment.apiUrl+"Clinics/byId?id="+ClinicId);
  }

  getFullNameClinic(ClinicId){
    return this.http.get(environment.apiUrl+"Clinics/getFullName?id="+ClinicId);
  }

  postClinic(body){
return this.http.post(environment.apiUrl+"Clinics",body);
  }

  putClinic(ClinicId,body){
    return this.http.put(environment.apiUrl+"Clinics/"+ClinicId,body);
  }
  deleteClinic(ClinicId){
    return this.http.delete(environment.apiUrl+"Clinics/"+ClinicId)
  }
}
