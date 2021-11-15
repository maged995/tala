import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ShiftsTimeService {

  constructor(private http:HttpClient,private fb:FormBuilder) { }

  shiftsTimeForm:FormGroup=this.fb.group({
    ShiftsTimeId:[""],
    ShiftsTimeName:["",Validators.required],
    StartTime:["",Validators.required],
    EndTime:["",Validators.required],
    IsActive:[""]
  })

  getAllShiftsTime(){
    return this.http.get(environment.apiUrl+"ShiftsTimes")
  }

  getOneShiftsTime(ShiftsTimeId){
    return this.http.get(environment.apiUrl+"ShiftsTimes/"+ShiftsTimeId)
  }

  postShift(body){
return this.http.post(environment.apiUrl+"ShiftsTimes",body);
  }
  putShift(ShiftsTimeId,body){
    return this.http.put(environment.apiUrl+"ShiftsTimes/"+ShiftsTimeId,body);
  }

  deleteShift(ShiftsTimeId){
    return this.http.delete(environment.apiUrl+"ShiftsTimes/"+ShiftsTimeId)
  }
}
