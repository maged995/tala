import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { NOTFOUND } from 'dns';

@Injectable({
  providedIn: 'root'
})
export class ChartsService {

  constructor(private http:HttpClient) { }

  getCharts(Type){
    if(Type=="quality")
    {
    return this.http.get(environment.apiUrl+"Charts/GetforQuantity")
    }
    else if(Type=="admin")
    {
      return this.http.get(environment.apiUrl+"Charts/GetforAdmin")
    }
    else if(Type=="wharehouse")
    {
      return this.http.get(environment.apiUrl+"Charts/GetforWharehouse")
    }
    else if(Type=="accounter")
    {
      return this.http.get(environment.apiUrl+"Charts/GetforAccounter")
    }
    else if(Type=="receiver")
    {
      return this.http.get(environment.apiUrl+"Charts/GetforReceiver")
    }

  }
}
