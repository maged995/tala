import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class TeethService {

  constructor(private http:HttpClient) { }

  getAllTeethActive(CustomerId){
    return this.http.get(environment.apiUrl+"Teeth/byCustomerId?CustomerId="+CustomerId);
  }

  getAllTeeth(TeethPalmId){
return this.http.get(environment.apiUrl+"Teeth/ByTeethPalm?id="+TeethPalmId);
  }

  getOneTeeth(TeethId)
  {
    return this.http.get(environment.apiUrl+"Teeth/byId?id="+TeethId); 
  }
  
}
