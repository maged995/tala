import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from '../../environments/environment.prod';
import { checkQuantity } from './checkQuantity.validator';

@Injectable({
  providedIn: 'root'
})
export class MissionTransactionService {


  MissionTransactionForm:FormGroup=this.fb.group({
    MissionTransactionMasterId:["0",Validators.required],
    MissionTransactionMasterCode:["0",Validators.required],
    DocTypeId:["",Validators.required],
    ItemTypeId:["",Validators.required],
    GroupId:[""],
    ItemsStandardId:[""],
    ItemId:[""],
    PatchNumber:[""],
    StoreIdFrom:["",Validators.required],
    StoreIdTo:["",Validators.required],
    CheckQuantity:[""],
    Quantity:[""]  
  })


  MissionTransactionDiscardForm:FormGroup=this.fb.group({
    MissionTransactionMasterId:["0",Validators.required],
    MissionTransactionMasterCode:["0",Validators.required],
    DocTypeId:["",Validators.required],
    StoreIdFrom:["",Validators.required],
    StoreIdTo:["",Validators.required],
  })

  missionTransactionDetails:any[]=[];

  missionTransactionDetailsForm:FormGroup=this.fb.group({
    MissionTransactionDetailId:["0",Validators.required],
    MissionTransactionMasterId:["0",Validators.required],
    ItemId:["",Validators.required],
    ItemDesc:["",Validators.required],
    ItemUnit:["",Validators.required],
    CheckQuantity:[""],
    Quantity:["",[Validators.required,Validators.min(0)]]
  })

  constructor(private http:HttpClient,private fb:FormBuilder) { }

  getAllTransactions(type,DocTypeId){
    if(type=="qualityTransaction"){
      return this.http.get(environment.apiUrl+"MissionTransactionMasters/forQuality?id="+DocTypeId)
    }
    else if(type=="adminTransaction"){
      return this.http.get(environment.apiUrl+"MissionTransactionMasters/forAdmin?id="+DocTypeId)
    }
    else if(type=="wharehouseTransaction")
    {
      return this.http.get(environment.apiUrl+"MissionTransactionMasters/forWareHouse?id="+DocTypeId)
    }
 
    else if(type=="receiverTransaction")
    {
      return this.http.get(environment.apiUrl+"MissionTransactionMasters/forReceiver?id="+DocTypeId)
    }


  }
  registerQuality(MissionTransactionMasterId){
    return this.http.delete(environment.apiUrl+"MissionTransactionMasters/RegisterQuality?id="+MissionTransactionMasterId);
  }
  registerAdmin(MissionTransactionMasterId){
    return this.http.delete(environment.apiUrl+"MissionTransactionMasters/RegisterAdmin?id="+MissionTransactionMasterId);
  }
  RegisterReceiver(MissionTransactionMasterId)
  {
    return this.http.delete(environment.apiUrl+"MissionTransactionMasters/RegisterReceiver?id="+MissionTransactionMasterId);
  }

  RegisterWhareHouse(MissionTransactionMasterId){
    return this.http.delete(environment.apiUrl+"MissionTransactionMasters/RegisterWhareHouse?id="+MissionTransactionMasterId);
  }

  postMissionTransaction(body){
    return this.http.post(environment.apiUrl+"MissionTransactionMasters",body);
  }

  getReport(MissionTransactionMasterId){
return this.http.get(environment.apiUrl+"MissionTransactionMasters/ForReport?id="+MissionTransactionMasterId)
  }
}
