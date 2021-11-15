import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class OffersService {

  offersForm:FormGroup=this.fb.group({
    OffersId:["0",Validators.required],
    OffersName:["",Validators.required],
    MinPoints:["",[Validators.required,Validators.min(1)]],
    MaxPoints:["",[Validators.required,Validators.min(1)]],
    IsActive:[true]
  })

  constructor(private http:HttpClient,private fb:FormBuilder) { }


  getAllOffers(){
    return this.http.get(environment.apiUrl+"Offers");
  }

  getOneOffer(OffersId){
return this.http.get(environment.apiUrl+"Offers/byId?id="+OffersId);
  }

  getOffersByPoints(Points){
    return this.http.get(environment.apiUrl+"Offers/getbyCustomerPoints?Points="+Points);
  }

  postOffer(body){
return this.http.post(environment.apiUrl+"Offers/",body)
  }

  putOffer(OffersId,body){
return this.http.put(environment.apiUrl+"Offers/"+OffersId,body);
  }

  deleteOffer(OffersId){
    return this.http.delete(environment.apiUrl+"Offers/"+OffersId);
  }
}
