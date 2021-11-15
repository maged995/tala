import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CustomerPaymentService {

  customerPaymentForm:FormGroup=this.fb.group({
    CustomerPaymentId:["0",Validators.required],
    CustomerId:["",Validators.required],
    DepitValue:["",[Validators.required,Validators.min(0)]],
    CreditValue:["",[Validators.required,Validators.min(0)]],
    DocTypeId:["",Validators.required],
    DeptId:["",Validators.required],
    ClinicId:["",Validators.required],
    DoctorId:["",Validators.required]
  })

  constructor(private http:HttpClient,private fb:FormBuilder) { }

  getAllCustomerPayment(DocTypeId){
    return this.http.get(environment.apiUrl+"CustomerPayments/ByDocTypeId?DocTypeId="+DocTypeId)
  }

  postCustomerPayment(body){
    return this.http.post(environment.apiUrl+"CustomerPayments",body);
  }

  getCustomerPaymentReport(CustomerPaymentId){
    return this.http.get(environment.apiUrl+"CustomerPayments/getForReports?CustomerPaymentId="+CustomerPaymentId)
  }
}
