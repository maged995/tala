import { Component, OnInit } from '@angular/core';
import { Observable, empty } from 'rxjs';
import { InvoiceMasterService } from '../../../../shared/invoice-master.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { NotificationService } from '../../../../shared/notification.service';
import { Departmentservice } from '../../../../shared/department.service';
import { Validators } from '@angular/forms';
import { InvoiceMasterDetailsComponent } from '../invoice-master-details/invoice-master-details.component';
import { ClinicsService } from '../../../../shared/clinics.service';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'ngx-invoice-master-form',
  templateUrl: './invoice-master-form.component.html',
  styles: []
})
export class InvoiceMasterFormComponent implements OnInit {

  submitted:boolean=false;
 
  deptList$:Observable<any>;
  receiverlist$:Observable<any>;
  DocTypeId;
    constructor(
      public service:InvoiceMasterService,
     private activateRoute:ActivatedRoute,
     public dialog: MatDialog,
     private serviceDepartment:Departmentservice,
     private serviceClinics:ClinicsService,
     private route:Router,
      private notify:NotificationService) { }
  
    ngOnInit() {
  
  this.DocTypeId=this.activateRoute.snapshot.paramMap.get('id');
  this.service.invoiceForm.get('DeptId').enable({ onlySelf: true });
  this.service.InvoiceDetailsList=[];
  
  this.service.invoiceForm.reset({InvoiceMasterId:0,InvoiceMasterCode:0});
      this.deptList$=this.serviceDepartment.getActiveDepartments();
      this.service.invoiceForm.get("DocTypeId").setValue(this.DocTypeId);
      
      this.service.invoiceForm.get("ReceiverId").clearValidators();
      this.service.invoiceForm.get("ReceiverId").updateValueAndValidity();
this.receiverlist$=empty();
    if(this.DocTypeId==9 || this.DocTypeId==10)
      {
        
        this.service.invoiceForm.get("ReceiverId").setValidators([Validators.required]);
        this.service.invoiceForm.get("ReceiverId").updateValueAndValidity();
      }
   

      
  this.service.invoiceForm;
  
  
    }
 
   
  
    get f(){
      return this.service.invoiceForm.controls;
    }
  
  
  

    onDelete(Index){
    
         this.service.InvoiceDetailsList.splice(Index,1);
      }
    

  
    onSubmit(){
     
  this.submitted=true;
  if(this.service.invoiceForm.invalid || this.service.InvoiceDetailsList.length==0)
  {
   
  return;
  }
  else
  {
  var body={
  ...this.service.invoiceForm.getRawValue() ,
  InvoiceDetails:this.service.InvoiceDetailsList
  
  }
  
  
  this.service.postInvoiceMaster(body).subscribe(res=>{
  
    this.notify.success('تمت الاضافه بنجاح');
    this.service.invoiceForm.reset({InvoiceMasterId:0,InvoiceMasterCode:0});
   this.route.navigateByUrl("/pages/basicData/invoiceMaster/"+this.DocTypeId);
  })
  
  }
  
    }
  
    addOrEdit(Index){
let DocTypeId=this.DocTypeId;
let DeptId=this.service.invoiceForm.get('DeptId').value;

if(DeptId>0)
{
  this.service.invoiceForm.get('DeptId').disable({ onlySelf: true });
      const dialogConfig = new MatDialogConfig();
      dialogConfig.autoFocus = true;
      dialogConfig.disableClose = true;
      dialogConfig.width = "60%";
      dialogConfig.data = {DocTypeId,DeptId , Index};
      this.dialog.open(InvoiceMasterDetailsComponent, dialogConfig).afterClosed().subscribe(res=>{
     
      });
    }
    else 
    {
      this.onSubmit();
    }
    }
  
    changeDept(ctrl){
      this.service.invoiceForm.get('ReceiverId').setValue("")
   if(typeof(ctrl)==="undefined"){

this.receiverlist$=empty();

   }
   else 
   {
if(this.DocTypeId==9){
  
  this.receiverlist$=this.serviceClinics.getAllClinicsByDept(ctrl.DeptId).pipe(map((a:any)=>a.clinics));

}
else if(this.DocTypeId==10)
{
  this.receiverlist$=this.deptList$.pipe(map(a=>a.filter(e=>e.DeptId!==ctrl.DeptId)));
}
   }
 }
  

}
