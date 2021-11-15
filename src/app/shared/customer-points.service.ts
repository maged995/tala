import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { FormBuilder, FormGroupDirective, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CustomerPointsService {

  CustomerPointsForm:FormGroup=this.fb.group({
    CustomerPointsId:["0",Validators.required],
    DocNum:["",Validators.required],
    CreditValue:["",Validators.required],
    CustomerId:["",Validators.required]
  })

  constructor(private http:HttpClient,private fb:FormBuilder) { }

  getAllforCustomers(){
    return this.http.get(environment.apiUrl+"CustomerPoints")
  }
  getOneCustomer(CustomerId){
    return this.http.get(environment.apiUrl+"CustomerPoints/byCustomerId?CustomerId="+CustomerId)
  }

  postCustomerPoints(body){
    return this.http.post(environment.apiUrl+"CustomerPoints",body)
  }

  
}
