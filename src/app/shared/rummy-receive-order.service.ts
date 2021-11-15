import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class RummyReceiveOrderService {

  constructor(private http:HttpClient,private fb:FormBuilder) { }

  rummyForm:FormGroup=this.fb.group({
    RummyReceiveOrderId:["0"],
    RummyReceiveOrderCode:["0"],
    InvoiceMasterRummyId:[""],
    StoreIdFrom:["",Validators.required],
    StoreIdTo:[""],
    ItemId:["",Validators.required],
    ItemsStandardId:["",Validators.required],
    Amount:["",[Validators.required,Validators.min(1)]],
    Weight:["",[Validators.required,Validators.min(1)]],
    WeightTo:["",Validators.min(1)],
    checkAmount:["",Validators.required],
    checkWeight:["",Validators.required],
    IsActiveInvoice:[""],
DocTypeId:["",Validators.required]

  })

  rummyStoreForm:FormGroup=this.fb.group({
    RummyReceiveOrderId:["",Validators.required],
    StoreIdTo:["",Validators.required],

  })
  getAllReceiveOrders(type,DocTypeId){
    if(type=="quality")
    {
    return this.http.get(environment.apiUrl+"RummyReceiveOrders/forQuality?id="+DocTypeId);
    }
   else  if(type=="admin")
    {
      return this.http.get(environment.apiUrl+"RummyReceiveOrders/forAdmin?id="+DocTypeId);
    }
    else if(type=="wharehouse")
    {
      return this.http.get(environment.apiUrl+"RummyReceiveOrders/forWharehouse?id="+DocTypeId);
    }
    else if(type=="receiver")
    {
      return this.http.get(environment.apiUrl+"RummyReceiveOrders/forReceiver?id="+DocTypeId);
    }
  }


  registerQuality(RummyReceiveOrderId)
  {
   return this.http.delete(environment.apiUrl+"RummyReceiveOrders/RegisterQuality?id="+RummyReceiveOrderId);
  }



  registerAdmin(RummyReceiveOrderId){
    return this.http.delete(environment.apiUrl+"RummyReceiveOrders/RegisterAdmin?id="+RummyReceiveOrderId);
  }


  RegisterWharehouse(RummyReceiveOrderId){
    return this.http.delete(environment.apiUrl+"RummyReceiveOrders/RegisterWharehouse?id="+RummyReceiveOrderId);
  }



  RegisterReceiver(RummyReceiveOrderId){
    return this.http.delete(environment.apiUrl+"RummyReceiveOrders/RegisterReceiver?id="+RummyReceiveOrderId)
  }

  postReceiveOrder(body){
    return this.http.post(environment.apiUrl+"RummyReceiveOrders/postOrder",body);
  }

  postStore(body){
    return this.http.post(environment.apiUrl+"RummyReceiveOrders/postStore",body);
  }


  getAmountBasedInvoice(InvoiceMasterRummyId,ItemId,StoreId){
    return this.http.get(environment.apiUrl+"RummyReceiveOrders/getAmountBasedInvoice?InvoiceMasterRummyId="
    +InvoiceMasterRummyId+"&&ItemId="+ItemId+"&&StoreId="+StoreId)
  }

  getCheckRedundancy(ItemId,StoreId){
    return this.http.get(environment.apiUrl+"RummyReceiveOrders/checkRedundancy?ItemId="+ItemId+"&&StoreId="+StoreId)
  }

  reportRumyReceiveOrder(id){
return this.http.get(environment.apiUrl+"RummyReceiveOrders/forReport?id="+id);
  }
  getAllInvoiceActiveFalse(){
    return this.http.get(environment.apiUrl+"RummyReceiveOrders/getAllInvoiceActiveFalse");
  }

  getALLDiscardInStores(){
    return this.http.get(environment.apiUrl+"RummyReceiveOrders/forDiscard");
  }

}
