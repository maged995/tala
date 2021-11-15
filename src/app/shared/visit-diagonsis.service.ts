import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class VisitDiagonsisService {

  visitDiagonsisForm:FormGroup=this.fb.group({
    DiagnosisId:["0",Validators.required],
    DiagnosisDescr:["",Validators.required],
    IsActive:[true,Validators.required]
  })
  constructor(private fb:FormBuilder) { }

  
}
