import { Component, OnInit, Inject } from '@angular/core';
import { ItemsService } from '../../../../shared/items.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NotificationService } from '../../../../shared/notification.service';
import { Observable } from 'rxjs/internal/Observable';
import { Departmentservice } from '../../../../shared/department.service';
import { Validators } from '@angular/forms';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'ngx-items-form',
  templateUrl: './items-form.component.html',
  styles: []
})
export class ItemsFormComponent implements OnInit {

  submitted:boolean=false;
  departmentList$:Observable<any>;

    constructor(
      public service:ItemsService,private serviceDepartment:Departmentservice,
      public dialogRef: MatDialogRef<ItemsFormComponent>,
      @Inject(MAT_DIALOG_DATA) public data,
      private notify:NotificationService) { }

    ngOnInit() {



     //this.service.itemForm.controls['ItemBuyPrice'].clearValidators();
     //this.service.itemForm.controls['ItemBuyPrice'].updateValueAndValidity();

     this.service.itemForm.controls['ItemSellPrice'].clearValidators();
     this.service.itemForm.controls['ItemSellPrice'].updateValueAndValidity();

   //  this.service.itemForm.controls['ItemPoints'].clearValidators();
   //  this.service.itemForm.controls['ItemPoints'].updateValueAndValidity();
      if(this.data.ItemId==null){

this.service.itemForm;
this.service.itemForm.get('GroupId').setValue(this.data.GroupId);

    }
  else
  {
  this.service.getOneItem(this.data.ItemId).subscribe((res:any)=>{
    this.service.itemForm.setValue({
      ItemId:res.ItemId,
      ItemDesc:res.ItemDesc,
      GroupId:res.GroupId,
      DeptId:res.DeptId,
      ItemBuyPrice:res.ItemBuyPrice,
      ItemSellPrice:res.ItemSellPrice,
      ItemPoints:res.ItemPoints,
      IsActive:res.IsActive
       })
  })
  }
  if(this.data.GroupId==1)
  {
this.departmentList$=this.serviceDepartment.GetAllExceptOneDept();
  }

  if(this.data.GroupId==2)
  {
    this.departmentList$=this.serviceDepartment.getAllDepartments();
   // this.service.itemForm.controls['ItemBuyPrice'].setValidators([Validators.required,Validators.min(0)]);
   // this.service.itemForm.controls['ItemBuyPrice'].updateValueAndValidity();
  }
  else if(this.data.GroupId==3)
  {
    this.departmentList$=this.serviceDepartment.GetAllExceptOneDept();
    /*
    this.service.itemForm.controls['ItemSellPrice'].setValidators([Validators.required,Validators.min(0)]);
    this.service.itemForm.controls['ItemSellPrice'].updateValueAndValidity();
    */
    //this.service.itemForm.controls['ItemPoints'].setValidators([Validators.required,Validators.min(0)]);
    //this.service.itemForm.controls['ItemPoints'].updateValueAndValidity();
  }

    }

    get f(){
      return this.service.itemForm.controls;
    }


    onClose(){
      this.service.itemForm.reset({ItemId:0,IsActive:true});
      this.dialogRef.close();
    }

    onSubmit(){

  this.submitted=true;
  if(this.service.itemForm.invalid)
  {
  return;
  }
  else
  {
  var body={
  ...this.service.itemForm.value
  }
  if(this.data.ItemId==null)
  {


  this.service.postItem(body).subscribe(res=>{
    this.notify.success('Successfully added');
    this.service.itemForm.reset({ItemId:0,IsActive:true});
    this.dialogRef.close();
  })

  }
  else
  {
    this.service.putItem(this.data.ItemId,body).subscribe(res=>{
    this.notify.success('Edited successfully');
    this.service.itemForm.reset({ItemId:0,IsActive:true});
    this.dialogRef.close();
    })
  }
  }

    }


}
