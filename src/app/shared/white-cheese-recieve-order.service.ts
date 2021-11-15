import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';

import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn } from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class WhiteCheeseRecieveOrderService {
 
  constructor(private http:HttpClient,private fb:FormBuilder,private service:WhiteCheeseRecieveOrderService) { }
  whiteReceiveOrderForm:FormGroup=this.fb.group({
    WhiteCheeseRecieveOrderMasterId:["0"],
    WhiteCheeseRecieveOrderMasterCode:["0"],
    PatchNumber:["0"],
    TreaterId:["",Validators.required],
    DocTypeId:["0"],
    NetTotalWeight:["0",Validators.required],
    StoreId:["0"],
    StoreIdTo:["0"],
    DeletedWhiteCheeseRecieveOrderDetailId:[""]

  })


  


  whiteReceiveOrderDetailsForm:FormGroup=this.fb.group({
    WhiteCheeseRecieveOrderDetailId:["0"],
    WhiteCheeseRecieveOrderMasterId:["0"],
    ItemId:["",Validators.required],
    ItemIdTo:[""],
    ItemDescTo:[""],
    GroupId:["",Validators.required],
    GroupDesc:["",Validators.required],
    ItemDesc:["",Validators.required],
    CurrentRecivedQuantity:["0",[Validators.required,Validators.min(1)]],
    CheckedQuantity:["0"],
    QuantityBucket:[""],
    QuantityKilo:[""],


  })

  whiteReceiveOrderDetailsList:any=[];
  getQuantityForCharts(){
   
    return this.http.get(environment.apiUrl+"WhiteCheeseRecieveOrderMasters/GetQuantityForCharts");
 /*
   else  if(type=="Admin")
    {
      return this.http.get(environment.apiUrl+"WhiteCheeseRecieveOrderMasters/GetAdminForCharts");
    }
    else if(type=="Wharehouse")
    {
      return this.http.get(environment.apiUrl+"WhiteCheeseRecieveOrderMasters/GetWharehouseForCharts");
    }
    else if(type=="Accounter")
    {
      return this.http.get(environment.apiUrl+"WhiteCheeseRecieveOrderMasters/GetAccounterForCharts");
    }
    else if(type=="SettlementsQuality")
    {
      return this.http.get(environment.apiUrl+"WhiteCheeseRecieveOrderMasters/forSettlementsQuality");
    }
    */
 
  }

  getAllReceiveOrders(type,DocTypeId){
    if(type=="quality")
    {
    return this.http.get(environment.apiUrl+"WhiteCheeseRecieveOrderMasters/forQuality?id="+DocTypeId);
    }
   else  if(type=="admin")
    {
      return this.http.get(environment.apiUrl+"WhiteCheeseRecieveOrderMasters/forAdmin?id="+DocTypeId);
    }
    else if(type=="wharehouse")
    {
      return this.http.get(environment.apiUrl+"WhiteCheeseRecieveOrderMasters/forWharehouse?id="+DocTypeId);
    }
    else if(type=="accounter")
    {
      return this.http.get(environment.apiUrl+"WhiteCheeseRecieveOrderMasters/forAccounter?id="+DocTypeId);
    }
    else if(type=="settlementsQuality")
    {
      return this.http.get(environment.apiUrl+"WhiteCheeseRecieveOrderMasters/forSettlementsQuality");
    }
    else if(type=="receiver")
    {
      return this.http.get(environment.apiUrl+"WhiteCheeseRecieveOrderMasters/forReceiver?id="+DocTypeId);
    }
  }

  getOneReceiveOrder(WhiteCheeseRecieveOrderMasterId){
    return this.http.get(environment.apiUrl+"WhiteCheeseRecieveOrderMasters/ById?id="+WhiteCheeseRecieveOrderMasterId)
  }

  getReceiveOrderReport(WhiteCheeseRecieveOrderMasterId)
{
  return this.http.get(environment.apiUrl+"WhiteCheeseRecieveOrderMasters/ForReport?id="+WhiteCheeseRecieveOrderMasterId);
}

  postReceiveOrder(body){
    return this.http.post(environment.apiUrl+"WhiteCheeseRecieveOrderMasters/",body);
  }

  registerQuantity(WhiteCheeseRecieveOrderMasterId)
  {
   return this.http.delete(environment.apiUrl+"WhiteCheeseRecieveOrderMasters/RegisterQuantity?id="+WhiteCheeseRecieveOrderMasterId);
  }



  registerAdmin(WhiteCheeseRecieveOrderMasterId){
    return this.http.delete(environment.apiUrl+"WhiteCheeseRecieveOrderMasters/RegisterAdmin?id="+WhiteCheeseRecieveOrderMasterId);
  }


  RegisterWharehouse(WhiteCheeseRecieveOrderMasterId){
    return this.http.delete(environment.apiUrl+"WhiteCheeseRecieveOrderMasters/RegisterWharehouse?id="+WhiteCheeseRecieveOrderMasterId);
  }

  RegisterAccounter(WhiteCheeseRecieveOrderMasterId){
    return this.http.delete(environment.apiUrl+"WhiteCheeseRecieveOrderMasters/RegisterAccounter?id="+WhiteCheeseRecieveOrderMasterId)
  }

  RegisterReceiver(WhiteCheeseRecieveOrderMasterId){
    return this.http.delete(environment.apiUrl+"WhiteCheeseRecieveOrderMasters/RegisterReceiver?id="+WhiteCheeseRecieveOrderMasterId)
  }
  checkPatchNumberExist(PatchNumber){
return this.http.get(environment.apiUrl+"WhiteCheeseRecieveOrderMasters/PatchNumber?PatchNumber="+PatchNumber)
  }


  checkPatchNumberToken(PatchNumber: string,WhiteCheeseRecieveOrderMasterId:number) {
  return  this.http.get(environment.apiUrl+"WhiteCheeseRecieveOrderMasters/PatchNumber?id="+PatchNumber+"&&WhiteCheeseRecieveOrderMasterId="+WhiteCheeseRecieveOrderMasterId);
  }

   result=null;
validateEmailNotTaken(control: AbstractControl){
   

    const q = new Promise((resolve, reject) => {
      setTimeout(() => {
        this.checkPatchNumberToken(control.value,this.whiteReceiveOrderForm.get('WhiteCheeseRecieveOrderMasterId').value).subscribe(res => {
          if(res)
          {
            resolve({ 'EmailToken': true }); 
     
          }
          else 
          {
            resolve(null);
          }
        })
      }, 1000);
    });
    return q;
  
/* this.jody(control);
console.log(this.result);
 return this.result;
 */




    
    }
getQuantityOfItem(WhiteCheeseRecieveOrderMasterId,ItemId){
  return this.http.get(environment.apiUrl+"WhiteCheeseRecieveOrderMasters/getQuantityOfItem?id="+WhiteCheeseRecieveOrderMasterId+"&&ItemId="+ItemId);
}

getcheckWasting(PatchNumber,StoreId,ItemId){
return this.http.get(environment.apiUrl+"WhiteCheeseRecieveOrderMasters/checkWasting?PatchNumber="+PatchNumber+"&&StoreId="+StoreId+"&&ItemId="+ItemId);
}


deleteWhite(WhiteCheeseRecieveOrderMasterId){
return this.http.delete(environment.apiUrl+"WhiteCheeseRecieveOrderMasters/AdminDelete?id="+WhiteCheeseRecieveOrderMasterId)
}

   

    
 

  

  
  }
  





