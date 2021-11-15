import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { NOTFOUND } from 'dns';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class MissionReceiveOrderService {

  constructor(private http:HttpClient,private fb:FormBuilder) { }

missionReceiveOrderForm:FormGroup=this.fb.group({
  MissionReceiveOrderMasterId:["0",Validators.required],
  MissionReceiveOrderMasterCode:["0",Validators.required],
  TreaterId:["",Validators.required],
  DocTypeId:["",Validators.required],
  StoreId:["",Validators.required],
})


missionReceiveOrderDetailsForm:FormGroup=this.fb.group({
  MissionReceiveOrderDetailId:["0",Validators.required],
  MissionReceiveOrderMasterId:["0",Validators.required],
  ItemId:["",Validators.required],
  ItemDesc:["",Validators.required],
  ItemUnit:["",Validators.required],
  CheckQuantity:[""],
  Quantity:["",[Validators.required,Validators.min(0)]]
})

missionReceiveStoresForm:FormGroup=this.fb.group({
  MissionReceiveOrderMasterId:["",Validators.required],
  StoreIdTo:["",Validators.required]

})
missionReceiveOrderDetailsList:any[]=[];

  getAllReceiveOrders(type,DocTypeId){
    if(type=="quality"){
      return this.http.get(environment.apiUrl+"MissionReceiveOrderMasters/forQuality?id="+DocTypeId)
    }
    else if(type=="admin"){
      return this.http.get(environment.apiUrl+"MissionReceiveOrderMasters/forAdmin?id="+DocTypeId)
    }
    else if(type=="wharehouse")
    {
      return this.http.get(environment.apiUrl+"MissionReceiveOrderMasters/forWareHouse?id="+DocTypeId)
    }
    else if(type=="accounter")
    {
      return this.http.get(environment.apiUrl+"MissionReceiveOrderMasters/forAccounter?id="+DocTypeId)
    }
    else if(type=="receiver")
    {
      return this.http.get(environment.apiUrl+"MissionReceiveOrderMasters/forReceiver?id="+DocTypeId)
    }


  }
  registerQuality(MissionReceiveOrderMasterId){
    return this.http.delete(environment.apiUrl+"MissionReceiveOrderMasters/RegisterQuality?id="+MissionReceiveOrderMasterId);
  }
  registerAdmin(MissionReceiveOrderMasterId){
    return this.http.delete(environment.apiUrl+"MissionReceiveOrderMasters/RegisterAdmin?id="+MissionReceiveOrderMasterId);
  }
  RegisterReceiver(MissionReceiveOrderMasterId)
  {
    return this.http.delete(environment.apiUrl+"MissionReceiveOrderMasters/RegisterReceiver?id="+MissionReceiveOrderMasterId);
  }

  RegisterWhareHouse(MissionReceiveOrderMasterId){
    return this.http.delete(environment.apiUrl+"MissionReceiveOrderMasters/RegisterWhareHouse?id="+MissionReceiveOrderMasterId);
  }

  postReceiveOrder(body){
return this.http.post(environment.apiUrl+"MissionReceiveOrderMasters/missionReceiveOrder",body);
  }

  postReceiveStores(body){
return this.http.post(environment.apiUrl+"MissionReceiveOrderMasters/missionReceiveStores",body);
  }

checkDeal(ItemId,StoreId){
  return this.http.get(environment.apiUrl+"MissionReceiveOrderMasters/StopDeal?ItemId="+ItemId+"&&StoreId="+StoreId);
}

getReports(MissionReceiveOrderMasterId){
  return this.http.get(environment.apiUrl+"MissionReceiveOrderMasters/ForReport?id="+MissionReceiveOrderMasterId)
}

deleteMission(MissionReceiveOrderMasterId){
  return this.http.delete(environment.apiUrl+"MissionReceiveOrderMasters/AdminDelete?id="+MissionReceiveOrderMasterId);
}

}
