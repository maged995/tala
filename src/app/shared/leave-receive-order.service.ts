import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class LeaveReceiveOrderService {

  constructor(private http:HttpClient,private fb:FormBuilder) { }

  leaveReceiveOrderForm:FormGroup=this.fb.group({
    LeaveReceiveOrderId:["0",Validators.required],
    
    LeaveReceiveOrderCode:["0",Validators.required],
    DocTypeId:["",Validators.required],
    StoreId:["",Validators.required],
    TreaterId:["",Validators.required],
    ItemId:["",Validators.required],
    checkedQuantity:[""],
    CurrentReceivedQuantity:["",Validators.required]
  })

  getAllReceiveOrders(type,DocTypeId){
    if(type=="quality")
    {
    return this.http.get(environment.apiUrl+"LeaveReceiverOrders/forQuality?id="+DocTypeId);
    }
   else  if(type=="admin")
    {
      return this.http.get(environment.apiUrl+"LeaveReceiverOrders/forAdmin?id="+DocTypeId);
    }
    else if(type=="wharehouse")
    {
      return this.http.get(environment.apiUrl+"LeaveReceiverOrders/forWharehouse?id="+DocTypeId);
    }
    else if(type=="accounter")
    {
      return this.http.get(environment.apiUrl+"LeaveReceiverOrders/forAccounter?id="+DocTypeId);
    }
  }


  registerQuality(RummyReceiveOrderId)
  {
   return this.http.delete(environment.apiUrl+"LeaveReceiverOrders/RegisterQuality?id="+RummyReceiveOrderId);
  }



  registerAdmin(RummyReceiveOrderId){
    return this.http.delete(environment.apiUrl+"LeaveReceiverOrders/RegisterAdmin?id="+RummyReceiveOrderId);
  }


  RegisterWharehouse(RummyReceiveOrderId){
    return this.http.delete(environment.apiUrl+"LeaveReceiverOrders/RegisterWharehouse?id="+RummyReceiveOrderId);
  }



  RegisterAccounter(RummyReceiveOrderId){
    return this.http.delete(environment.apiUrl+"LeaveReceiverOrders/RegisterAccounter?id="+RummyReceiveOrderId)
  }

  postReceiveOrder(body){
    return this.http.post(environment.apiUrl+"LeaveReceiverOrders",body);
  }

  


  getCheckRedundancy(ItemId,StoreId,ItemStandardId){
    return this.http.get(environment.apiUrl+"LeaveReceiverOrders/checkRedundancy?ItemId="+ItemId+"&&StoreId="+StoreId+"&&ItemStandardId="+ItemStandardId)
  }

  reportForLeaves(LeaveReceiveOrderId){
    return this.http.get(environment.apiUrl+"LeaveReceiverOrders/forReport?id="+LeaveReceiveOrderId)
  }

  deleteLeave(LeaveReceiveOrderId){
    return this.http.delete(environment.apiUrl+"LeaveReceiverOrders/DeleteLeave?id="+LeaveReceiveOrderId)
  }



}
