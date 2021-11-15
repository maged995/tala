import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { min } from 'rxjs/operators';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Injectable({
  providedIn: 'root'
})
export class InvoiceRummyMasterService {
  


  constructor(private http:HttpClient,private fb:FormBuilder) { }
  rummyInvoiceForm:FormGroup=this.fb.group({
    InvoiceMasterRummyId:["0",Validators.required],
    InvoiceMasterRummyCode:["0",Validators.required],
    DocTypeId:["",Validators.required],
    SafeId:["",Validators.required],
    TreaterId:["",Validators.required],
    TotalWeight:["0",[Validators.required,Validators.min(1)]],
    TotalAmount:["0",[Validators.required,Validators.min(1)]],
    Price:["",[Validators.required,,Validators.min(1)]],
    TotalPrice:["0",[Validators.required,,Validators.min(1)]]
  })
  invoiceRummyDetailList:any[];

  invoiceRummyDetailForm:FormGroup=this.fb.group({
    InvoiceDetailRummyId:["0"],
    InvoiceMasterRummyId:["0"],
   TreaterId:[""],
   TreaterName:[""],
    StoreId:["",Validators.required],
    StoreDesc:[""],
    GroupId:["",Validators.required],
    GroupDesc:["",Validators.required],
    ItemId:["",Validators.required],
    ItemDesc:["",Validators.required],
    Weight:["",[Validators.required,Validators.min(0)]],
    Amount:["",[Validators.required,Validators.min(0)]],
    Price:["",[Validators.min(0)]],
    TotalPriceForTreater:["",[Validators.min(0)]]

  })

  getAllInvoiceMaster(){
    return this.http.get(environment.apiUrl+"InvoiceRummyMasters");
  }

  postInvoice(body){
return this.http.post(environment.apiUrl+"InvoiceRummyMasters",body)
  }

  getRummyInvocieByItem(ItemId,StoreId){
    return this.http.get(environment.apiUrl+"InvoiceRummyMasters/GetRummyInvoiceByItem?ItemId="+ItemId+"&&StoreId="+StoreId);

  }


  getReports(InvoiceMasterRummyId){
return this.http.get(environment.apiUrl+"InvoiceRummyMasters/forReport?id="+InvoiceMasterRummyId)
  }


}
