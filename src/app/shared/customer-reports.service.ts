import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CustomerReportsService {

  CustomerReportForm:FormGroup=this.fb.group({
    CustomerId:[""],
    DeptId:["",Validators.required]
  })

  constructor(private http:HttpClient,private fb:FormBuilder) { }

  getAllAboutAccountAndPayment(CustomerId,DeptId)
  {
    return this.http.get(environment.apiUrl+"CustomerReports/getCustomer?CustomerId="+CustomerId+"&&DeptId="+DeptId);
  }


  getAllVisit(CustomerId,DeptId)
  {
    return this.http.get(environment.apiUrl+"CustomerReports/getVisit?CustomerId="+CustomerId+"&&DeptId="+DeptId);
  }

  getCustomersByDept(DeptId){
    return this.http.get(environment.apiUrl+"CustomerReports/getCustomersByDept?DeptId="+DeptId);
  }


}
