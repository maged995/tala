import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class VisitMedicineService {
  visitMedicineForm:FormGroup=this.fb.group({
    VisitMedicineId:["0",Validators.required],
    ItemId:["",Validators.required],
    ItemDesc:["",Validators.required],
    DosesId:[""],
    DosesDesc:[""],
    DosesEatingId:[""],
    DosesEatingDesc:[""],
    Notes:[""],
    IsActive:[true]
  })

  constructor(private fb:FormBuilder) { }
}
