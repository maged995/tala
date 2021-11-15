import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CustomerDiseasesService {

  customerDiseaseForm:FormGroup=this.fb.group({
    CustomerDiseasesId:["0"],
    CustomerId:["",Validators.required],
    CustomerDiseasesName:["",Validators.required],
    IsActive:[true]
  })

  constructor(private fb:FormBuilder,private http:HttpClient) { }

  getAllCustomerDiseases(CustomerId){
    return this.http.get(environment.apiUrl+"CustomerDiseases/byCustomerId?id="+CustomerId);
  }

  getOneCustomerDisease(CustomerDiseasesId){
    return this.http.get(environment.apiUrl+"CustomerDiseases/byId?id="+CustomerDiseasesId);
  }

  postCustomerDisease(body){
return this.http.post(environment.apiUrl+"CustomerDiseases",body);
  }
  putCustomerDisease(CustomerDiseasesId,body){
return this.http.put(environment.apiUrl+"CustomerDiseases/"+CustomerDiseasesId,body);
  }
  deleteCustomerDisease(CustomerDiseasesId){
    return this.http.delete(environment.apiUrl+"CustomerDiseases/"+CustomerDiseasesId)
  }
}
