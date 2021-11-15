import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class BranchDepartmentService {

  constructor(private http:HttpClient,private fb:FormBuilder) { }


  branchDepartmentForm:FormGroup=this.fb.group({
    BranchDeptId:["0"],
    DeptId:["",Validators.required],
    BranchId:["",Validators.required],
    IsActive:[true]
  })

getActiveDepartment(BranchId,BranchDeptId){
return this.http.get(environment.apiUrl+"BranchDepartments/getActiveDepartment?BranchId="+BranchId+"&&BranchDeptId="+BranchDeptId)
}

  getAllBranchDepartment(BranchId){
return this.http.get(environment.apiUrl+"BranchDepartments/ByBranchId?BranchId="+BranchId)
  }

  getOneBranchDepartment(BranchDeptId){
    return this.http.get(environment.apiUrl+"BranchDepartments/byId?id="+BranchDeptId)
  }

  postDepartment(body){
return this.http.post(environment.apiUrl+"BranchDepartments",body)
  }

  putDepartment(BranchDeptId,body){
    return this.http.put(environment.apiUrl+"BranchDepartments/"+BranchDeptId,body)
  }

  deleteDepartment(BranchDeptId){
    return this.http.delete(environment.apiUrl+"BranchDepartments/"+BranchDeptId)
  }
}
