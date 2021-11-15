import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {

  constructor(private http:HttpClient,private fb:FormBuilder) { }

  groupsForm:FormGroup=this.fb.group({
    GroupId:["0"],
    GroupDesc:["",Validators.required],
 
    IsActive:[true],
 
  })

  getAllGroups(){
    return this.http.get(environment.apiUrl+"Groups")
  }



  getOneGroup(GroupId){
    return this.http.get(environment.apiUrl+"Groups/"+GroupId)
  }


  postGroup(body){
    return this.http.post(environment.apiUrl+"Groups",body)
  }

  putGroup(GroupId,body){
    return this.http.put(environment.apiUrl+"Groups/"+GroupId,body)
  }

  deleteGroup(GroupId){
    return this.http.delete(environment.apiUrl+"Groups/"+GroupId)
  }
}
