import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class BankCheckWaletService {

  constructor(private http:HttpClient,private fb:FormBuilder) { }

  waletFrom:FormGroup=this.fb.group({
    BankCheckWaletId:["0"],
    TreaterId:["",Validators.required],
    BankCheckNumber:["",Validators.required],
    SafeId:["",Validators.required],
    BankCheckReservedDate:["",Validators.required],
    BankCheckValue:["",Validators.required],
    DocTypeId:["",Validators.required],
    BankCheckNotes:[""]
  })

  registerWaletForm:FormGroup=this.fb.group({
    BankCheckWaletId:["",Validators.required],
    PaMentTypeId:["",Validators.required],
    SafeId:["",Validators.required],
    DocTypeId:["",Validators.required],
  })

  getAllBankCheckWaletNotCashed(DocTypeId){
    return this.http.get(environment.apiUrl+"BankCheckWalets/getList?id="+DocTypeId)
  }

  getOneBankCheckWalet(BankCheckWaletId){
    return this.http.get(environment.apiUrl+"BankCheckWalets/getOne?id="+BankCheckWaletId)
  }
  postWalet(body){
    return this.http.post(environment.apiUrl+"BankCheckWalets/addbankCheckWalet",body);
  }

  registerWalet(body){
return this.http.post(environment.apiUrl+"BankCheckWalets/registerbankCheckWalet",body);
  }
}
