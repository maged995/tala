import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class DaysService {

  constructor(private http:HttpClient) { }

  getAllDays(){
    return this.http.get(environment.apiUrl+"Days/getALL")
  }

  getOneDay(DayId){
    return this.http.get(environment.apiUrl+"Days/"+DayId)
  }

  getAnyDayOpened(){
    return this.http.get(environment.apiUrl+"Days/checkDays")
  }
  deleteDay(){
    return this.http.delete(environment.apiUrl+"Days")
  }

  PostDay(){
return this.http.post(environment.apiUrl+"Days/",null);
  }


}
