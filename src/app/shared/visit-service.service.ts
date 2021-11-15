import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class VisitServiceService {

  visitServiceForm:FormGroup=this.fb.group({
    VisitServiceId:[0,Validators.required],
    ItemId:["",Validators.required],
    ItemDesc:["",Validators.required],
    Quantity:["",Validators.required],
    Price:["",Validators.required],
    Point:["",Validators.required],
 
    TotalPrice:[""],
    TotalPoint:[""],
    IsActive:[true]
  })

  constructor(private fb:FormBuilder) { }
}
