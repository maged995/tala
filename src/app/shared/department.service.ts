import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class Departmentservice {

  constructor(private http:HttpClient,private fb:FormBuilder) { }
departmentForm:FormGroup=this.fb.group({
  DeptId:["0"],
  DeptDescr:["",Validators.required],
  IsActive:[true]
})
getAuthGuard(roleClaim){
  var payload=JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
  var UserRole=payload.role;
  return this.http.get(environment.apiUrl+"ManageRoleClaims/getOnlyTrue?RoleId="+UserRole+"&&roleClaim="+roleClaim)
}

  getAllDepartments(){
    return this.http.get(environment.apiUrl+"Departments/getALL");
  }

  GetAllExceptOneDept(){
    return this.http.get(environment.apiUrl+"Departments/GetAllExceptOneDept")
  }

  GetActiveExceptOneDept(){
    return this.http.get(environment.apiUrl+"Departments/GetActiveExceptOneDept")
  }
  

  getActiveDepartments(){
    return this.http.get(environment.apiUrl+"Departments/getActive");
  }

  getDepartmentsByEmployeeFlag(EmployeeFlagId,BranchId){
return this.http.get(environment.apiUrl+"Departments/getByEmployeeFlag?id="+EmployeeFlagId+"&&BranchId="+BranchId)
  }
  
  
  getOneDepartment(DeptId){
    return this.http.get(environment.apiUrl+"Departments/byId?id="+DeptId);
  }

  postDepartment(body){
    return this.http.post(environment.apiUrl+"Departments/",body);
  }

  putDepartment(DeptId,body){
    return this.http.put(environment.apiUrl+"Departments/"+DeptId,body);
  }

  deleteDepartment(DeptId){
    return this.http.delete(environment.apiUrl+"Departments/"+DeptId);
  }

}
