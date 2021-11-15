import { Component, OnInit } from '@angular/core';
import { TreasuryService } from '../../../../shared/treasury.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'ngx-treasury-date',
  templateUrl: './treasury-date.component.html',
  styles: []
})
export class TreasuryDateComponent implements OnInit {

  model: NgbDateStruct;
  submitted:boolean=false;

    constructor(
      public service:TreasuryService,
      private datePipe: DatePipe,
      private router:Router,
public dialog: MatDialog) {

   
       }
 

 
  
    
    ngOnInit() {


        this.getClinicReservation();
    
    }
    getClinicReservation(){


    this.service.treasuryDateForm.reset();
     this.service.treasuryDateForm;

    }
  
    get f(){
      return this.service.treasuryDateForm.controls;
    }

changeDate(ctrl){
  this.service.treasuryDateForm.get('CompareDate').setValue("");
if(typeof(ctrl)==="undefined")
{

}
else 
{
var date:Date=new Date(ctrl.year,ctrl.month -1,ctrl.day,0,0,0);
var startDate = new Date(date);
var day = 60 * 60 * 24 * 1000;
var endDate = new Date(startDate.getTime() + day);
let x= this.datePipe.transform(startDate, 'yyyy-MM-dd'); 
this.service.treasuryDateForm.get('CompareDate').setValue(x);

}
}



    onSubmit(){     
  this.submitted=true;
  if(this.service.treasuryDateForm.invalid )
  {
 
  return;
  }
  else
  {
  var body={
  ...this.service.treasuryDateForm.value 
  }

this.router.navigateByUrl('pages/basicData/treasuryDateList/'+this.service.treasuryDateForm.get('CompareDate').value);

 

  
  }
  
    }

}
