import { Component, OnInit, Inject } from '@angular/core';
import { CustomersService } from '../../../../shared/customers.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig, MatDialog } from '@angular/material';

import { NotificationService } from '../../../../shared/notification.service';
import { empty, Observable } from 'rxjs';
import { DatePipe } from '@angular/common';
import { Validators } from '@angular/forms';
import { filter, map } from 'rxjs/operators';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomersDetailsComponent } from '../customers-details/customers-details.component';

@Component({
  selector: 'ngx-customers-form',
  templateUrl: './customers-form.component.html',
  styles: []
})
export class CustomersFormComponent implements OnInit {

submitted:boolean=false;
IsValidCustomer:boolean=false;
affiliateMemberList$:Observable<any>;
afflateList$:Observable<any>;
CustomerId;
  constructor(
    public service:CustomersService,
   private activateRoute:ActivatedRoute,
   public dialog: MatDialog,
   private route:Router,
    private notify:NotificationService) { }

  ngOnInit() {

this.CustomerId=this.activateRoute.snapshot.paramMap.get('id');
this.service.DiseaseList=[];
this.service.MedicineList=[];
this.service.OperationList=[];
this.service.customerForm.reset({CustomerId:0,AffiliateMember:false,GenderId:0,DeletedCustomerDiseasesId:"",IsActive:true,IsPregnant:false});
    this.affiliateMemberList$=empty();
    if(this.CustomerId==null){

this.service.customerForm;


  }
else
{

this.service.getOneCustomer(this.CustomerId).subscribe((res:any)=>{
  if(res.Master.AffiliateMember==true)
  {

    this.service.customerForm.get('AffiliateMemberId').setValidators([Validators.required]);
    this.service.customerForm.get('AffiliateMemberId').updateValueAndValidity();
  this.CheangeAffliateMember(res.Master.CustomerId);
     this.IsValidCustomer=true;
  }
  else
  {
    this.affiliateMemberList$=empty();
    this.IsValidCustomer=false;
    this.service.customerForm.get('AffiliateMemberId').clearValidators();
    this.service.customerForm.get('AffiliateMemberId').updateValueAndValidity();
  }
 /*
  var datePipe = new DatePipe("en-US");
  let formatedyear = datePipe.transform(res.HireDate, 'yyyy-MM-dd');
  */
  this.service.customerForm.setValue({
    CustomerId:res.Master.CustomerId,
    CustomerName:res.Master.CustomerName,
    GenderId:res.Master.GenderId,
    CustomerPhone1:res.Master.CustomerPhone1,
    CustomerPhone2:res.Master.CustomerPhone2,
    CustomerAddress:res.Master.CustomerAddress,
    CustomerEmail:res.Master.CustomerEmail,
    IsPregnant:res.Master.IsPregnant,
    CustomerNotes:res.Master.CustomerNotes,
    AffiliateMember:res.Master.AffiliateMember,
    AffiliateMemberId:res.Master.AffiliateMemberId,
    FirstPerioudBalance:res.Master.FirstPerioudBalance,
    CustomerAge:res.Master.CustomerAge,
    IsActive:res.Master.IsActive,
    DeletedCustomerDiseasesId:""
     })

    this.service.DiseaseList=res.DiseaseList;
     this.service.MedicineList=res.MedicineList;
     this.service.OperationList=res.OperationList;
})
}

  }
  CheangeAffliateMember(CustomerId){

    this.affiliateMemberList$=this.service.getForEditAffiliate(CustomerId)

}


  get f(){
    return this.service.customerForm.controls;
  }



/*
  onClose(){
    this.service.customerForm.reset({CustomerId:0,GenderId:1,AffiliateMember:false,IsActive:true});
    this.dialogRef.close();
  }
  */

  onDelete(CustomerDiseasesId,Index,Flag){
    if(CustomerDiseasesId!=0){
      let x:string =this.service.customerForm.get('DeletedCustomerDiseasesId').value+CustomerDiseasesId+",";
      console.log(x);
      this.service.customerForm.controls['DeletedCustomerDiseasesId'].setValue(x);

    }
    if(Flag==1)
    {
       this.service.DiseaseList.splice(Index,1);
    }
    else if(Flag==2){
      this.service.MedicineList.splice(Index,1);
    }
    else if(Flag==3){
      this.service.OperationList.splice(Index,1);
    }
  }

  onSubmit(){

this.submitted=true;
if(this.service.customerForm.invalid)
{

return;
}
else
{
var body={
...this.service.customerForm.value ,
CustomerDiseases:this.service.DiseaseList.concat(this.service.MedicineList).concat(this.service.OperationList)

}


this.service.postCustomer(body).subscribe(res=>{
  if(this.CustomerId==null)
  {
  this.notify.success('Successfully added');
  }
  else
  {
    this.notify.error("Edited successfully")
  }
  this.service.customerForm.reset({CustomerId:0,AffiliateMember:false,GenderId:0,DeletedCustomerDiseasesId:"",IsActive:true,IsPregnant:false});
 this.route.navigateByUrl("/pages/basicData/customers")
})

}

  }

  addOrEdit(CustomerId,Index,Flag){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "60%";
    dialogConfig.data = {CustomerId , Index,Flag};
    this.dialog.open(CustomersDetailsComponent, dialogConfig).afterClosed().subscribe(res=>{

    });
  }

  onChangeCheck(ctrl){

    this.service.customerForm.get('AffiliateMemberId').clearValidators();
    this.service.customerForm.get('AffiliateMemberId').updateValueAndValidity();
     this.service.customerForm.controls['AffiliateMemberId'].setValue('');
this.affiliateMemberList$.subscribe(res=>{

})
     if (ctrl.target.checked === true) {
      if(this.CustomerId===null)
      {
        this.affiliateMemberList$=this.service.getForAffiliate();
      }
      else
      {

         this.CheangeAffliateMember(this.CustomerId);
      }
       this.service.customerForm.get('AffiliateMemberId').setValidators([Validators.required]);
       this.service.customerForm.get('AffiliateMemberId').updateValueAndValidity();
       this.IsValidCustomer=true;
     }
     else
     {
       this.affiliateMemberList$=empty();
       this.IsValidCustomer=false;
     }


  }





}
