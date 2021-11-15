import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class DosesService {

  constructor(private http:HttpClient) { }

  getAllDoses(){
    return this.http.get(environment.apiUrl+"Doses")
  }
}
