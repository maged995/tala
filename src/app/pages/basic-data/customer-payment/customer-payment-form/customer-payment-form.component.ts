import { Component, OnInit, Inject } from '@angular/core';
import { Observable, empty } from 'rxjs';
import { CustomerPaymentService } from '../../../../shared/customer-payment.service';
import { NotificationService } from '../../../../shared/notification.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CustomersService } from '../../../../shared/customers.service';
import { Departmentservice } from '../../../../shared/department.service';
import { ClinicsService } from '../../../../shared/clinics.service';
import { map } from 'rxjs/operators';
import { TreasuryService } from '../../../../shared/treasury.service';
import { DialogService } from '../../../../shared/dialog.service';
import { Router } from '@angular/router';
import { EmployeesService } from '../../../../shared/employees.service';

@Component({
  selector: 'ngx-customer-payment-form',
  templateUrl: './customer-payment-form.component.html',
  styles: []
})
export class CustomerPaymentFormComponent implements OnInit {

  submitted:boolean=false;

  customerList$:Observable<any>;
  deptList$:Observable<any>;
  clinicList$:Observable<any>;
  doctorList$:Observable<any>;

    constructor(
      public service:CustomerPaymentService,


      public dialogRef: MatDialogRef<CustomerPaymentFormComponent>,
      @Inject(MAT_DIALOG_DATA) public data,
      private serviceCustomer:CustomersService,
      private serviceTreasury:TreasuryService,
      private serviceDepartment:Departmentservice,
      private serviceClinics:ClinicsService,
      private serviceDoctors:EmployeesService,
      private confirm:DialogService,
      private route:Router,
      private notify:NotificationService) { }
  
    ngOnInit() {
      

this.deptList$=this.serviceDepartment.getActiveDepartments();
this.customerList$=this.serviceCustomer.getAllCustomers();
     this.service.customerPaymentForm.reset({CustomerPaymentId:0});
this.service.customerPaymentForm;
if(this.data.DocTypeId==3)
{
this.service.customerPaymentForm.controls['DocTypeId'].setValue(this.data.DocTypeId);
this.service.customerPaymentForm.controls["DepitValue"].setValue("0");
}
else if(this.data.DocTypeId==4)
{
  this.service.customerPaymentForm.controls['DocTypeId'].setValue(this.data.DocTypeId);
this.service.customerPaymentForm.controls["CreditValue"].setValue("0");
}

if(this.data.CustomerId>0)
{
  this.service.customerPaymentForm.controls['CustomerId'].setValue(this.data.CustomerId);
  this.service.customerPaymentForm.controls['DeptId'].setValue(this.data.DeptId);
  this.service.customerPaymentForm.controls['ClinicId'].setValue(this.data.ClinicId);
  this.service.customerPaymentForm.controls['DoctorId'].setValue(this.data.DoctorId)
}

    }
  
    get f(){
      return this.service.customerPaymentForm.controls;
    }

  
    changeDept(ctrl)
    {
      this.service.customerPaymentForm.get('ClinicId').setValue("");
      if(typeof(ctrl)==="undefined")
      {
this.clinicList$=empty();
      }
      else
      {
        this.clinicList$=this.serviceClinics.getAllClinicsByDept(ctrl.DeptId).pipe(map((res:any)=>res.clinics))
      }
    }
    onClose(){
      this.service.customerPaymentForm.reset({CustomerPaymentId:0});
      this.dialogRef.close();
    }


    changeClinic(ctrl)
{
  this.service.customerPaymentForm.get('DoctorId').setValue("");
  if(typeof(ctrl)==="undefined")
  {
this.doctorList$=empty();
  }
  else
  {
    this.doctorList$=this.serviceDoctors.getEmployeeByClinic(ctrl.ClinicId);
  }
}  
    onSubmit(){

  
  this.submitted=true;
  if(this.service.customerPaymentForm.invalid)
  {
    console.log("error");
  return;
  } 
  /*
  else if(this.service.customerPaymentForm.get('DocTypeId').value==4)

  {

    this.serviceTreasury.getBalance(this.service.customerPaymentForm.get('ClinicId').value).subscribe(res=>{
      if(parseFloat(this.service.customerPaymentForm.get('DepitValue').value) > res)
      {
        this.notify.error('المبلغ المطلوب اكبر من المبلغ الحالي في الخزنه');
        return;
      }
      else 
      {
  var body={
  ...this.service.customerPaymentForm.getRawValue() 
  }
 
  this.service.postCustomerPayment(body).subscribe(su=>{
    this.notify.success('تمت الاضافه بنجاح');

    this.dialogRef.close();
  })
}
    })

  }
*/
  else 
  {
    var body={
      ...this.service.customerPaymentForm.getRawValue() 
      }
     
      this.service.postCustomerPayment(body).subscribe(su=>{
      
        this.confirm.openConfirmDialog('تم الحفظ بنجاح هل تريد الطباعه').afterClosed().subscribe(result=>{
          this.submitted=false;
          this.notify.success("تمت الاضافه بنجاح");
           this.dialogRef.close();
          if(result){
    this.route.navigate(['/pages/basicData/customerPaymnentReport/'+su])
          }
     
        })
    
        })
  }
  
    }

}
