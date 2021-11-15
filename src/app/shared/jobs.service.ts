import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class JobsService {

  

  constructor(private http:HttpClient,private fb:FormBuilder) { }
  jobsForm:FormGroup=this.fb.group({
    JobId:["0"],
    JobName:["",Validators.required],
    DeptId:["",Validators.required],
    EmployeeFlagId:["",Validators.required],
    IsActive:[true]
  })
  
  getAllJobs(DeptId){
    return this.http.get(environment.apiUrl+"Jobs/byDeptId?id="+DeptId)
  }

  getAllJobsByFlag(DeptId,EmployeeFlagId){
    return this.http.get(environment.apiUrl+"Jobs/byDeptIdAndFlag?id="+DeptId+"&&flag="+EmployeeFlagId)
  }

  getOneJob(JobId){
    return this.http.get(environment.apiUrl+"Jobs/byId?id="+JobId)
  }

  postJob(body){
    return this.http.post(environment.apiUrl+"Jobs",body)
  }
  putJob(JobId,body){
    return this.http.put(environment.apiUrl+"Jobs/"+JobId,body)
  }
deleteJob(JobId){
return this.http.delete(environment.apiUrl+"Jobs/"+JobId)
}




}
