import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CustomerOnlineService {

  customerOnlineForm:FormGroup=this.fb.group({
    CustomerOnlineId:["",Validators.required],
    Notes:["",Validators.required],

  })

  constructor(private http:HttpClient,private fb:FormBuilder) { }

  getActive(DeptId){
return this.http.get(environment.apiUrl+"CustomerOnlines/getActiveOnline?DeptId="+DeptId)
  }

  getNonActive(DeptId){
return this.http.get(environment.apiUrl+"CustomerOnlines/getNotActiveOnline?DeptId="+DeptId)
  }

  postCustomerOnline(body){
return this.http.post(environment.apiUrl+"CustomerOnlines",body)
  }

}
