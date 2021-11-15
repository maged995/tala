import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NotificationService } from '../../../../shared/notification.service';
import { CustomersService } from '../../../../shared/customers.service';

@Component({
  selector: 'ngx-customers-details',
  templateUrl: './customers-details.component.html',
  styles: []
})
export class CustomersDetailsComponent implements OnInit {


  submitted;
  
    constructor( public dialogRef: MatDialogRef<CustomersDetailsComponent>,
      private snackbar:NotificationService,
      @Inject(MAT_DIALOG_DATA) public data,
     
      public service:CustomersService) { }
  
    ngOnInit() {
     
    
      if(this.data.Index==null){
        this.service.CustomerDiseaseForm.reset({CustomerDiseasesId:0,IsActive:true})
        this.service.CustomerDiseaseForm;
        this.service.CustomerDiseaseForm.get('Flag').setValue(this.data.Flag);
      }
     else 
     {
      let res:any;
     if(this.data.Flag==1)
     {
     res = this.service.DiseaseList[this.data.Index];
     }
     else if(this.data.Flag==2)
     {
      res = this.service.MedicineList[this.data.Index];
     }
     else if(this.data.Flag==3){
      res = this.service.OperationList[this.data.Index];
     }
      
     
      this.service.CustomerDiseaseForm.setValue({
        CustomerDiseasesId:res.CustomerDiseasesId,
        CustomerDiseasesName:res.CustomerDiseasesName,
        Flag:res.Flag,
        IsActive:res.IsActive
      })
     
    }
    }
    get f(){
      return this.service.CustomerDiseaseForm.controls;
    }

    onClose(){
      this.dialogRef.close();
    }

    onSubmit(){

      
      this.submitted=true;

    if(this.service.CustomerDiseaseForm.invalid){
     
      return;
    }
  

    else 
    {


    if(this.data.Index==null){

 if(this.data.Flag==1){
  this.service.DiseaseList.push(this.service.CustomerDiseaseForm.getRawValue());
 }
 else if(this.data.Flag==2){
  this.service.MedicineList.push(this.service.CustomerDiseaseForm.getRawValue());
 }
 else if(this.data.Flag==3){
  this.service.OperationList.push(this.service.CustomerDiseaseForm.getRawValue());
 }
    
     
    this.dialogRef.close();
  }

 
    
    else 
    {

      if(this.data.Flag==1){
        this.service.DiseaseList[this.data.Index]=this.service.CustomerDiseaseForm.getRawValue();
      }
      else if(this.data.Flag==2){
        this.service.MedicineList[this.data.Index]=this.service.CustomerDiseaseForm.getRawValue();
      }
     else if(this.data.Flag==3){
      this.service.OperationList[this.data.Index]=this.service.CustomerDiseaseForm.getRawValue();
     }
            
      this.dialogRef.close();
              }
        
  this.submitted=false;
    }
  
    }

}
