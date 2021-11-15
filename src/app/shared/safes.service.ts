import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class SafesService {
  safesForm:FormGroup=this.fb.group({
    SafeId:["0",Validators.required],
    BranchId:["",Validators.required],
    SafeName:["",Validators.required],
    IsActive:[true]
  })


  constructor(private http:HttpClient,private fb:FormBuilder) { }

  getAllSafes(BranchId){
    return this.http.get(environment.apiUrl+"safes/byBranchId?id="+BranchId);
  }

  getBalanceSafe(){
    return this.http.get(environment.apiUrl+"safes/getBalanceInEachSafe")
  }
  getSafesBranchUser(){
    return this.http.get(environment.apiUrl+"safes/")
  }
  getOneSafe(SafeId){
return this.http.get(environment.apiUrl+"safes/byId?id="+SafeId);
  }
  postSafe(body){
return this.http.post(environment.apiUrl+"safes",body);
  }
  putSafe(SafeId,body){
    return this.http.put(environment.apiUrl+"safes/"+SafeId,body)
  }

  deleteSafe(SafeId)
  {
    return this.http.delete(environment.apiUrl+"safes/"+SafeId)
  }

  getSafeValue(SafeId){
return this.http.get(environment.apiUrl+"safes/getValueofSafes?SafeId="+SafeId)
  }
}
