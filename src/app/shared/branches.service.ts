import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class BranchesService {
  branchForm:FormGroup=this.fb.group({
    BranchId:["0"],
    BranchDesc:["",Validators.required],
    BranchAddress:["",Validators.required],
    BranchPhone:[""],
    BranchIsActive:[true],
  })

  constructor(private http:HttpClient,private fb:FormBuilder) { }

  getAllBranches(){
    return this.http.get(environment.apiUrl+"Branches");
  }

  getOneBranch(BranchId){
    return this.http.get(environment.apiUrl+"Branches/"+BranchId)
  }

  postBranch(body){
return this.http.post(environment.apiUrl+"Branches",body);
  }
  putBranch(BranchId,body){
return this.http.put(environment.apiUrl+"Branches/"+BranchId,body);
  }

  deleteBranch(BranchId){
    return this.http.delete(environment.apiUrl+"Branches/"+BranchId)
  }
}
