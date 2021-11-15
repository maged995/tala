import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ShiftsService {

  constructor(private http:HttpClient) { }

  getAnyShifts(){
return this.http.get(environment.apiUrl+"Shifts/checkShifts");
  }

  getAllShifts(){
    return this.http.get(environment.apiUrl+"Shifts/getShifts")
  }

  getShiftsForAllUser(){
    return this.http.get(environment.apiUrl+"Shifts/getShiftsForAllUser")
  }

  postShift()
  {
    return this.http.post(environment.apiUrl+"Shifts",null)
  }

  deleteShifts(){
    return this.http.delete(environment.apiUrl+"Shifts/")
  }
}
