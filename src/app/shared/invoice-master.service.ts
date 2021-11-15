import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class InvoiceMasterService {

  constructor(private http:HttpClient,private fb:FormBuilder) { }
invoiceDetailForm:FormGroup=this.fb.group({
  InvoiceDetailId:["0"],
  InvoiceMasterId:["0"],
  ItemId:["",Validators.required],
  ItemDesc:["",Validators.required],
  CheckedQuantity:[""],
  Quantity:["",Validators.required]
})

  invoiceForm:FormGroup=this.fb.group({
    InvoiceMasterId:["0"],
    InvoiceMasterCode:["0"],
    DeptId:["",Validators.required],
    ReceiverId:[""],
    DocTypeId:["",[Validators.required,Validators.min(8),Validators.max(10)]],
    Notes:[""]

  })

  InvoiceDetailsList:any[]=[];

  getForReport(InvoiceMasterId){
    return this.http.get(environment.apiUrl+"InvoiceMasters/getReports?id="+InvoiceMasterId)
  }

  getAllByDocType(DocTypeId){
return this.http.get(environment.apiUrl+"InvoiceMasters/getByDocType?DocTypeId="+DocTypeId)
  }


  postInvoiceMaster(body){
return this.http.post(environment.apiUrl+"InvoiceMasters",body);
  }
  
}
