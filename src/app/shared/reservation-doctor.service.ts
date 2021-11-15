import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ReservationDoctorService {

  constructor(private http:HttpClient) { }
  getAllReservationDoctor(){
    return this.http.get(environment.apiUrl+"ReservationDoctors")
  }
}
