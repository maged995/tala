import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from '../../environments/environment.prod';
import { MatCalendarBody } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class LeavesTransactionsService {

  constructor(private http:HttpClient,private fb:FormBuilder) { }

  leaveTransactionMasterForm:FormGroup=this.fb.group({
    LeaveTransactionMasterId:["0",Validators.required],
    LeaveTransactionMasterCode:["0",Validators.required],
    DocTypeId:["",Validators.required],
    StoreId:["",Validators.required],
    StoreTypeId:[""],
    StoreIdTo:[""]
  })

  leavestransactionStoreForm:FormGroup=this.fb.group({
    LeaveTransactionMasterId:["",Validators.required],
    StoreIdTo:["",Validators.required]
  })
leaveTransactionDetails:any[]=[];
leaveTransactionDetailForm:FormGroup=this.fb.group({
  LeaveTransactionDetailId:["0",Validators.required],
  LeaveTransactionMasterId:["0",Validators.required],
  ItemId:["",Validators.required],
  ItemDesc:["",Validators.required],
  ItemsStandardIdFrom:["",Validators.required],
  ItemsStandardDescFrom:["",Validators.required],
  ItemsStandardIdTo:[""],
  ItemsStandardDescTo:[""],
  CheckQuantity:[""],
  QuantityFrom:["",Validators.required],
  QuantityTo:[""]

})
  getAllReceiveOrders(type,DocTypeId){
    if(type=="qualityTransaction")
    {
    return this.http.get(environment.apiUrl+"LeaveTransactionMasters/forQuality?id="+DocTypeId);
    }
   else  if(type=="adminTransaction")
    {
      return this.http.get(environment.apiUrl+"LeaveTransactionMasters/forAdmin?id="+DocTypeId);
    }
    else if(type=="wharehouseTransaction")
    {
      return this.http.get(environment.apiUrl+"LeaveTransactionMasters/forWharehouse?id="+DocTypeId);
    }
    else if(type=="receiverTransaction")
    {
      return this.http.get(environment.apiUrl+"LeaveTransactionMasters/forReceiver?id="+DocTypeId);
    }
  }


  registerQuality(LeaveTransactionMasterId)
  {
   return this.http.delete(environment.apiUrl+"LeaveTransactionMasters/RegisterQuality?id="+LeaveTransactionMasterId);
  }
reportsTransaction(LeaveTransactionMasterId)
{
  return this.http.get(environment.apiUrl+"LeaveTransactionMasters/ForTransaionReport?id="+LeaveTransactionMasterId);
  
}




  registerAdmin(LeaveTransactionMasterId){
    return this.http.delete(environment.apiUrl+"LeaveTransactionMasters/RegisterAdmin?id="+LeaveTransactionMasterId);
  }






  RegisterReceiver(LeaveTransactionMasterId){
    return this.http.delete(environment.apiUrl+"LeaveTransactionMasters/RegisterReceiver?id="+LeaveTransactionMasterId)
  }

  postTransaction(body){
    return this.http.post(environment.apiUrl+"LeaveTransactionMasters",body);
  }

  RegisterWhareHouse(LeaveTransactionMasterId)
  {
    return this.http.delete(environment.apiUrl+"LeaveTransactionMasters/RegisterWharehouse?id="+LeaveTransactionMasterId)
  }

  PutWharehouses(body){
return this.http.put(environment.apiUrl+"LeaveTransactionMasters/RegisterWharehouse",body);
  }


  getCheckRedundancy(ItemId,StoreId,ItemStandardId){
    return this.http.get(environment.apiUrl+"LeaveTransactionMasters/checkRedundancy?ItemId="+ItemId+"&&StoreId="+StoreId+"&&ItemStandardId="+ItemStandardId)
  }
}
