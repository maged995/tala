import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { format, startOfMonth, startOfWeek, startOfDay, endOfMonth, endOfWeek, endOfDay } from 'date-fns';
import { CalendarView } from 'angular-calendar';
import { map } from 'rxjs/operators';
import { Film } from './demo-utils/Film';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

function getTimezoneOffsetString(date: Date): string {
  const timezoneOffset = date.getTimezoneOffset();
  const hoursOffset = String(
    Math.floor(Math.abs(timezoneOffset / 60))
  ).padStart(2, '0');
  const minutesOffset = String(Math.abs(timezoneOffset % 60)).padEnd(2, '0');
  const direction = timezoneOffset > 0 ? '-' : '+';

  return `T00:00:00${direction}${hoursOffset}:${minutesOffset}`;
}
@Injectable({
  providedIn: 'root'
})



export class ClinicReservationsService {

clinicForm:FormGroup=this.fb.group({
  DeptId:["",Validators.required],
  DeptDescr:["",Validators.required],
  ClinicId:["",Validators.required],
  ClinicDesc:["",Validators.required],
  DoctorId:["",Validators.required],
  DoctorName:["",Validators.required],
  ClinicAppoinmentId:["",Validators.required],
  appoinment:["",Validators.required],
  DayId:["",Validators.required],
  CheckDate:["",Validators.required],
})


  clinicReservationForm:FormGroup=this.fb.group({
    ClinicReservationId:["0"],
    ClinicReservationCode:[""],
   ClinicAppoinmentId:["",Validators.required],
    DoctorId:["",Validators.required],
    ClinicId:["",Validators.required],
    DayId:["",Validators.required],
    CustomerId:["",Validators.required],
    ReservationDate:["",Validators.required],
    ReservationTypeId:["",Validators.required],
    ReservationTimeFrom:["",Validators.required],
    ReservationTimeTo:["",Validators.required],
    Price:["",[Validators.required,Validators.min(0)]],
    PayedValue:["",[Validators.required,Validators.min(0)]],
    IsActive:[true,[Validators.required]],
    IsVisited:[false,Validators.required],
    IsContract:[false,[Validators.required]],
    IsAttendance:[false,Validators.required]
  })
  view: CalendarView = CalendarView.Month;
  viewDate: Date = new Date();
   getStart: any = {
    month: startOfMonth,
  week: startOfWeek,
   day: startOfDay,
  }[this.view];
   getEnd: any = {
    month: endOfMonth,
   week: endOfWeek,
  day: endOfDay,
  }[this.view];
 params = new HttpParams()
  .set(
    'primary_release_date.gte',
    format(this.getStart(this.viewDate), 'yyyy-MM-dd')
  )
  .set(
    'primary_release_date.lte',
    format(this.getEnd(this.viewDate), 'yyyy-MM-dd')
  )
  .set('api_key', '0ec33936a68018857d727958dca1424f');

  constructor(private http:HttpClient,private fb:FormBuilder) { }


  getAllClinicReservation(ClinicId){
    let params=this.params;
    let viewDate=this.viewDate;

  return  this.http
    .get(environment.apiUrl+"ClinicReservations/ByClinicId?id="+ClinicId, { params })
    .pipe(
      map( (results: Film[]) => {
       return results.map((film: Film) => ({
         title: film.title,
         start: new Date(film.release_date + getTimezoneOffsetString(viewDate)),
         from: film.of,
         to: film.to,
         period:film.period,
         DoctorName:film.DoctorName,
         //color: colors.yellow,
         allDay: true,
         meta: {
           film,
         },
       }));
     })
   );
  }

  getReports(ClinicReservationId){
return this.http.get(environment.apiUrl+"ClinicReservations/getReports?ClinicReservationId="+ClinicReservationId);
  }

  getByClinicAppoinmentAndDate(ClinicAppoinmentId,ReservationDate)
  {
    return this.http.get(environment.apiUrl+"ClinicReservations/getByClinicAppoinmentAndDate?ClinicAppoinmentId="+ClinicAppoinmentId+"&&ReservationDate="+ReservationDate)
  }


  getAttendanceByClinicAppoinmentAndDate(ClinicAppoinmentId,ReservationDate)
  {
    return this.http.get(environment.apiUrl+"ClinicReservations/getAttendanceByClinicAppoinmentAndDate?ClinicAppoinmentId="+ClinicAppoinmentId+"&&ReservationDate="+ReservationDate)
  }




  getOneClinicReservation(ClinicReservationId){
    return this.http.get(environment.apiUrl+"ClinicReservations/ById?id="+ClinicReservationId)
  }

  postClinicReservation(body)
{
  return this.http.post(environment.apiUrl+"ClinicReservations/",body)
}

putClinicReservation(ClinicReservationId,body){
  return this.http.put(environment.apiUrl+"ClinicReservations/"+ClinicReservationId,body);
}
deleteClinicReservation(ClinicReservationId)
{
  return this.http.delete(environment.apiUrl+"ClinicReservations/delteReversation?id="+ClinicReservationId);
}

attendancePatient(ClinicReservationId){
  return this.http.delete(environment.apiUrl+"ClinicReservations/attendancePatient?id="+ClinicReservationId)
}

entryPatient(ClinicReservationId){
return this.http.delete(environment.apiUrl+"ClinicReservations/entryPatient?id="+ClinicReservationId)
}
  


  
}
