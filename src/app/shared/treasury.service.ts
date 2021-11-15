import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EINPROGRESS } from 'constants';

@Injectable({
  providedIn: 'root'
})
export class TreasuryService {

  treasuryDateForm:FormGroup=this.fb.group({
    CompareDate:["",[Validators.required]]
  })

  constructor(private http:HttpClient,private fb:FormBuilder) { }
treasuryList:any[]=[];

  getBalance(){
    return this.http.get(environment.apiUrl+"Treasuries/checkCurrentValue");
  }

  getTreasuryByShift(ShiftId){
    return this.http.get(environment.apiUrl+"Treasuries/getByShiftId?ShiftId="+ShiftId);
  }

  getTreasuryByDate(compareDate){
  return this.http.get(environment.apiUrl+"Treasuries/getByDate?compareDate="+compareDate)
  }

}
