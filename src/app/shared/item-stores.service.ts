import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ItemStoresService {

  constructor(private http:HttpClient) { }

  getbyItemAndDept(ItemId,DeptId){
return this.http.get(environment.apiUrl+"ItemStores/byItemAndDept?ItemId="+ItemId+"&&DeptId="+DeptId);
  }

  getByDept(DeptId){
    return this.http.get(environment.apiUrl+"ItemStores/byDept?DeptId="+DeptId);

  }

}
