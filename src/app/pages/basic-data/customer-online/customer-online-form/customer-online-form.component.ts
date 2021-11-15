import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NotificationService } from '../../../../shared/notification.service';
import { CustomerOnlineService } from '../../../../shared/customer-online.service';

@Component({
  selector: 'ngx-customer-online-form',
  templateUrl: './customer-online-form.component.html',
  styles: []
})
export class CustomerOnlineFormComponent implements OnInit {

  submitted:boolean=false;

    constructor(
      public service:CustomerOnlineService,public dialogRef: MatDialogRef<CustomerOnlineFormComponent>,
      @Inject(MAT_DIALOG_DATA) public data,
     
      private notify:NotificationService) { }
  
    ngOnInit() {


  
this.service.customerOnlineForm;
this.service.customerOnlineForm.get('CustomerOnlineId').setValue(this.data.CustomerOnlineId);

    }
  
    get f(){
      return this.service.customerOnlineForm.controls;
    }

  
  
  
    onClose(){
      this.service.customerOnlineForm.reset();
      this.dialogRef.close();
    }
  
    onSubmit(){
     
  this.submitted=true;
  if(this.service.customerOnlineForm.invalid)
  {
  return;
  }
  else
  {
  var body={
  ...this.service.customerOnlineForm.value 
  }

  this.service.postCustomerOnline(body).subscribe(res=>{
    this.notify.success('تمت الاضافه بنجاح');
    this.service.customerOnlineForm.reset();
    this.dialogRef.close();
  })
  
  
  }
  
    }


}
