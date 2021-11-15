import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  constructor(private http:HttpClient,private fb:FormBuilder) { }

  itemForm:FormGroup=this.fb.group({
    ItemId:["0"],
    ItemDesc:["",Validators.required],
    GroupId:["",Validators.required],
    DeptId:["",Validators.required],
    ItemBuyPrice:[""],
    ItemSellPrice:["0",[Validators.min(0)]],
    ItemPoints:[""],
    IsActive:[true]
  })
  getAllItems(GroupId){
    return this.http.get(environment.apiUrl+"Items/getByGroups?id="+GroupId);
  }

  getAllItemsByGroupAndDept(GroupId,DeptId){
return this.http.get(environment.apiUrl+"Items/getByGroupsAndDept?GroupId="+GroupId+"&&DeptId="+DeptId)
  }

  getOneItem(ItemId){
    return this.http.get(environment.apiUrl+"Items/byId?id="+ItemId);
  }




  postItem(body){
    return this.http.post(environment.apiUrl+"Items/",body);
  }

  putItem(ItemId,body){
    return this.http.put(environment.apiUrl+"Items/"+ItemId,body);
  }

  deleteItem(ItemId){
    return this.http.delete(environment.apiUrl+"Items/"+ItemId);
  }


}
