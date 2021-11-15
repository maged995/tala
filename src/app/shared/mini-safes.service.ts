import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class MiniSafesService {

  constructor(private http:HttpClient) { }

  getActive(){
    return this.http.get(environment.apiUrl+"MiniSafes/getActive")
  }
  getMiniSafesForEmployee(){
    return this.http.get(environment.apiUrl+"MiniSafes/forEmployee")
  }

  getOneMiniSafes(MiniSafeId){
return this.http.get(environment.apiUrl+"MiniSafes/"+MiniSafeId);
  }

  checkSafes(){
    return this.http.get(environment.apiUrl+"MiniSafes/checkSafes")
  }

  endSafes(){
    return this.http.delete(environment.apiUrl+"MiniSafes")
  }

  postMiniSafes(){
    return this.http.post(environment.apiUrl+"MiniSafes",null)
  }

  getMiniSafeValue(MiniSafeId){
    return this.http.get(environment.apiUrl+"MiniSafes/getValueofMiniSafes?MiniSafeId="+MiniSafeId)
  }
}
