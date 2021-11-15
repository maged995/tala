import { Component, OnInit, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NotificationService } from '../../../../shared/notification.service';
import { ItemsService } from '../../../../shared/items.service';
import { ItemStoresService } from '../../../../shared/item-stores.service';
import { InvoiceMasterService } from '../../../../shared/invoice-master.service';
import { Validators } from '@angular/forms';
import { map } from 'rxjs/operators';

@Component({
  selector: 'ngx-invoice-master-details',
  templateUrl: './invoice-master-details.component.html',
  styles: []
})
export class InvoiceMasterDetailsComponent implements OnInit {
  itemList$:Observable<any>;
error=0;

  submitted:boolean=false;
  IsValid:boolean=false;
 

  
    constructor( public dialogRef: MatDialogRef<InvoiceMasterDetailsComponent>,
      private snackbar:NotificationService,
      @Inject(MAT_DIALOG_DATA) public data,
      private serviceItem:ItemsService,
  
      private notify:NotificationService,
     private serviceItemStores:ItemStoresService,
 
     public service:InvoiceMasterService,
    ) { }
  
    ngOnInit() {
    this.submitted=false;

      this.service.invoiceDetailForm.reset({InvoiceDetailId:0,InvoiceMasterId:0});
    
      this.service.invoiceDetailForm.get('CheckedQuantity').clearValidators();
      this.service.invoiceDetailForm.get('CheckedQuantity').updateValueAndValidity();

this.itemList$=this.serviceItem.getAllItems(2).pipe(map((a:any)=>a.Items));
      if(this.data.Index==null){
        this.service.invoiceDetailForm;
      }
     else 
     {
     
      let res:any= this.service.InvoiceDetailsList[this.data.Index];
 
      this.service.invoiceDetailForm.setValue({
        InvoiceDetailId:0,
        InvoiceMasterId:0,
        ItemId:res.ItemId,
        ItemDesc:res.ItemDesc,
        CheckedQuantity:res.CheckedQuantity,
        Quantity:res.Quantity
      })

    }

    if(this.data.DocTypeId==9 || this.data.DocTypeId==10)
    {
 
      this.service.invoiceDetailForm.controls['CheckedQuantity'].setValidators([Validators.required]); 
      this.service.invoiceDetailForm.controls['CheckedQuantity'].updateValueAndValidity();
      this.IsValid=true;
    }
    else 
    {

    }
   
  }
     
 
    get f(){
      return this.service.invoiceDetailForm.controls;
    }

   

    changeItem(ctrl)
   {
     if(typeof(ctrl)==="undefined")
     {
      this.service.invoiceDetailForm.controls['ItemDesc'].setValue("");
         this.service.invoiceDetailForm.controls["CheckedQuantity"].setValue("0");
     }

     else 
     {
      this.service.invoiceDetailForm.controls['ItemDesc'].setValue(ctrl.ItemDesc);
      this.serviceItemStores.getbyItemAndDept(ctrl.ItemId,this.data.DeptId).subscribe(res=>
       {
        this.service.invoiceDetailForm.controls["CheckedQuantity"].setValue(res);
       } 
        )
    
     }
}
  
    onClose(){
      this.dialogRef.close();
    }

 
 

  
    onsubmit(){
      this.submitted=true;

    if(this.service.invoiceDetailForm.invalid){
    console.log('invalid');
      return;

    }
  

    else if(this.data.Index==null)
    { 
      console.log('valid');
      this.error=0;
    
      if((this.data.DocTypeId==9 || this.data.DocTypeId==10)&&this.service.invoiceDetailForm.get('Quantity').value>this.service.invoiceDetailForm.get('CheckedQuantity').value){
        
        this.snackbar.error("الكميه غير متاحه");
        return;
        
        }
        else 
        {
        this.service.InvoiceDetailsList.forEach(element => {
          if(element.ItemId==this.service.invoiceDetailForm.get('ItemId').value )
         {
  this.notify.error('هذا المنتج  موجوده من قبل ');
this.error=1;
return;

         }    
        });

      }

        if(this.error==0)
        {
            this.service.InvoiceDetailsList.push(this.service.invoiceDetailForm.getRawValue());
     
            this.dialogRef.close();
       }
      }
        else
        {
          if((this.data.DocTypeId==9 || this.data.DocTypeId==10)&&this.service.invoiceDetailForm.get('Quantity').value>this.service.invoiceDetailForm.get('CheckedQuantity').value){
        
            this.snackbar.error("الكميه غير متاحه");
            return;
            
            }
            else
            {
        
          this.service.InvoiceDetailsList.forEach(element => {
            if(element.ItemId==this.service.invoiceDetailForm.get('ItemId').value 
            && this.service.invoiceDetailForm.get('ItemId').value !=
            this.service.InvoiceDetailsList[this.data.Index].ItemId)
          
                {
                  this.notify.error('هذا المنتج  موجوده من قبل ');
          this.error=1;
          return;
                 }
                 
                });

            

                if(this.error==0)
                {
                    this.service.InvoiceDetailsList[this.data.Index]=this.service.invoiceDetailForm.getRawValue();
              this.dialogRef.close();
                  }
                 
                }

              }
        }
    
    



}
