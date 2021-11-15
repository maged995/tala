import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Departmentservice } from '../../../shared/department.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { CustomersService } from '../../../shared/customers.service';
import { CustomerReportsService } from '../../../shared/customer-reports.service';
import { Validators } from '@angular/forms';

@Component({
  selector: 'ngx-customer-reports',
  templateUrl: './customer-reports.component.html',
  styles: []
})
export class CustomerReportsComponent implements OnInit {



  submitted:boolean=false;

 deptList$:Observable<any>;
 CustomerList$:Observable<any>;
  Type: string;


    constructor(
      public service:CustomerReportsService,
     private serviceDept:Departmentservice,
     private activatedRoute:ActivatedRoute,
     private serviceCustomer:CustomersService,
      private router:Router,
public dialog: MatDialog) {

   
       }
 

 
  
    
    ngOnInit() {

this.Type=this.activatedRoute.snapshot.url[0].path;
        this.getClinicReservation();
    
    }
    getClinicReservation(){

      this.deptList$=this.serviceDept.GetActiveExceptOneDept();
      this.CustomerList$=this.serviceCustomer.getAllCustomers();
      this.service.CustomerReportForm.get('CustomerId').clearValidators();
      this.service.CustomerReportForm.get('CustomerId').updateValueAndValidity();
    this.service.CustomerReportForm.reset();
    if(this.Type=="customerReports")
    {
      this.service.CustomerReportForm.get('CustomerId').setValidators([Validators.required]);
      this.service.CustomerReportForm.get('CustomerId').updateValueAndValidity();
    }
     this.service.CustomerReportForm;

    }
  
    get f(){
      return this.service.CustomerReportForm.controls;
    }





    onSubmit(number){     
  this.submitted=true;
  if(this.service.CustomerReportForm.invalid )
  {
 
  return;
  }
  else
  {
  var body={
  ...this.service.CustomerReportForm.value 
  }

  if(number==1)
  {
this.router.navigateByUrl('pages/basicData/customerAccountReports/'+this.service.CustomerReportForm.get('CustomerId').value+"/"+this.service.CustomerReportForm.get('DeptId').value);

  }
  else if(number==2){
this.router.navigateByUrl('pages/basicData/customerVisitByDept/'+this.service.CustomerReportForm.get('CustomerId').value+"/"+this.service.CustomerReportForm.get('DeptId').value);
  }
  else if(number==3){
    

    this.router.navigateByUrl('pages/basicData/DeptCustomer/'+this.service.CustomerReportForm.get('DeptId').value);
  }

 else if (number==4){
  this.router.navigateByUrl('pages/basicData/customerOnlineActive/'+this.service.CustomerReportForm.get('DeptId').value);
 }

 else if(number==5)
 {
  this.router.navigateByUrl('pages/basicData/customerOnlineNonActive/'+this.service.CustomerReportForm.get('DeptId').value);
 }


  
  }
  
    }

}
