import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  MedicineList:any[]=[];
  OperationList:any[]=[];
  DiseaseList:any[]=[];

  CustomerDiseaseForm:FormGroup=this.fb.group({
    CustomerDiseasesId:["0",Validators.required],
    CustomerDiseasesName:["",Validators.required],
    Flag:["",Validators.required],
    IsActive:[true,Validators.required]
  })

  customerForm:FormGroup=this.fb.group({
    CustomerId:["0"],
    CustomerName:["",Validators.required],
    GenderId:["1",Validators.required],
    CustomerAge:["",[Validators.required,Validators.min(1)]],
    CustomerPhone1:["",[Validators.required,Validators.minLength(5),Validators.maxLength(13)]],
    CustomerPhone2:["",[Validators.minLength(5),Validators.maxLength(13)]],
    CustomerAddress:[""],
    CustomerEmail:["",Validators.email],
    CustomerNotes:[""],
    AffiliateMember:[false],
    AffiliateMemberId:[""],
    FirstPerioudBalance:["",Validators.required],
    IsActive:[true],
    IsPregnant:[false],
    DeletedCustomerDiseasesId:[""]

  })

  constructor(private http:HttpClient,private fb:FormBuilder) { }

  getAllCustomers(){
    return this.http.get(environment.apiUrl+"Customers/getAll");
  }

  getForAffiliate(){
    return this.http.get(environment.apiUrl+"Customers/getForAffiliate");
  }

  getForEditAffiliate(CustomerId){
    
    return this.http.get(environment.apiUrl+"Customers/getForAffiliateByCustomerId?id="+CustomerId);
  }
  getOneCustomer(CustomerId){
    return this.http.get(environment.apiUrl+"Customers/byId?id="+CustomerId)
  }
postCustomer(body){
return this.http.post(environment.apiUrl+"Customers",body);
}
putCustomer(CustomerId,body){
  return this.http.put(environment.apiUrl+"Customers/"+CustomerId,body);
}
deleteCustomer(CustomerId){
  return this.http.delete(environment.apiUrl+"Customers/"+CustomerId);
}

}
