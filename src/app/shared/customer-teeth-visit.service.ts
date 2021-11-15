import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CustomerTeethVisitService {

  customerTeethVisitForm:FormGroup=this.fb.group({
    CustomerTeethVisitId:["",Validators.required],
    TeethId:["",Validators.required],
    TeathPalmDesc:["",Validators.required],
    TeethNumber:["",Validators.required],
    CustomerTeethDesc:["",Validators.required],
    IsActive:[true]
  })

  constructor(private http:HttpClient,private fb:FormBuilder) { }

  getAllCustomerTeeth(TeethId,CustomerId){
    return this.http.get(environment.apiUrl+"CustomerTeethVisits/getByTeethIdAndCustomerId?TeethId="+TeethId+"&&CustomerId="+CustomerId)
  }
}
