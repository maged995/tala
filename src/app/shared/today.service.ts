import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class TodayService {

  constructor(private http:HttpClient) { }

  getAllDays(){
    return this.http.get(environment.apiUrl+"Todays")
  }
}
