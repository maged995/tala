import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class EmployeeFlagService {

  constructor(private http:HttpClient) { }
  getAllEmployeeFlag(){
    return this.http.get(environment.apiUrl+"EmployeeFlags")
  }
}
