import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class RunningShiftsService {

  constructor(private http:HttpClient,private fb:FormBuilder) { }

  runningShiftForm:FormGroup=this.fb.group({
    RunningShiftId:[""],
    ShiftsTimeId:[""],
    SafeId:[""]
  })

  getOneRunningShift(RunningShiftId){
    return this.http.get(environment.apiUrl+"RunningShifts/"+RunningShiftId)
  }

checkRunningShifts(){
  return this.http.get(environment.apiUrl+"RunningShifts/checkRunningShifts")
}

postRunningShifts(body){
  return this.http.post(environment.apiUrl+"RunningShifts/",body)
}

deleteRunningShifts(SafeId){
return this.http.delete(environment.apiUrl+"RunningShifts/"+SafeId);
}






}
