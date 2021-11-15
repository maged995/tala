import { Component, OnInit } from '@angular/core';
import { TreasuryService } from '../../../../shared/treasury.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DeprecatedI18NPipesModule } from '@angular/common';
import { map } from 'rxjs/operators';
import { environment } from '../../../../../environments/environment.prod';

@Component({
  selector: 'ngx-treasury-shift-report',
  templateUrl: './treasury-shift-report.component.html',
  styles: []
})
export class TreasuryShiftReportComponent implements OnInit {
  Balance: any;
ReservationList:any[]=[];
CancelReservationList:any[]=[];
  Debit: any;
  Credit: any;
  Dental: number;
  Teeth: number;
  Skin: any;
  CancelReservationListSkin: any[]=[];
  ReservationListSkin: any[]=[];
  ReservationListTeeth:any[]=[];
  CancelReservationListTeeth:any[]=[];
  Dept4Debit: any;
  Dept4Credit: any;
  Dept3Credit: any;
  Dept3Debit: any;
  useExistingCss:boolean;
  styleName:string;

  constructor(public service:TreasuryService,private route:Router,
    private activeRoute:ActivatedRoute) { }
    ShiftId=this.activeRoute.snapshot.paramMap.get("id");
    OpenDate:Date;
    CloseDate:Date;
    EmployeeName:string;
    IsActive:boolean;
    
 
  ngOnInit() {

    this.useExistingCss = true;
    if (environment.production) {
          this.useExistingCss = false;
          const elements = document.getElementsByTagName('link');
          for (let index = 0; index < elements.length; index++) {
            if (elements[index].href.startsWith(document.baseURI)) {
              this.styleName += elements[index].href + ',';
            }
          }
          this.styleName = this.styleName.slice(0, -1);
        }

    this.service.getTreasuryByShift(this.ShiftId).subscribe((res:any)=>{
     
      this.OpenDate=res.Master.OpenDate;
      this.CloseDate=res.Master.CloseDate;
      this.EmployeeName=res.Master.EmployeeName;
      this.IsActive =res.Master.IsActive;
    this.service.treasuryList=res.Details;
    this.ReservationListSkin=res.Details.filter((a:any)=>a.DocTypeId==3 && a.DeptId==3);
    this.CancelReservationListSkin=res.Details.filter((a:any)=>a.DocTypeId==4 && a.DeptId==3);

    this.ReservationListTeeth=res.Details.filter((a:any)=>a.DocTypeId==3 && a.DeptId==4);
    this.CancelReservationListTeeth=res.Details.filter((a:any)=>a.DocTypeId==4 && a.DeptId==4);


    this.Debit =res.Details.filter((a:any)=>a.DocTypeId==4).reduce((prev,curr)=>{
      return prev+curr.DebitValue
    },0);

    

    this.Credit=res.Details.filter((a:any)=>a.DocTypeId==3).reduce((prev,curr)=>{
      return prev+curr.CreditValue
    },0);

    this.Dept3Debit =res.Details.filter((a:any)=>a.DeptId==3).reduce((prev,curr)=>{
      return prev+curr.DebitValue
    },0);

    this.Dept3Credit=res.Details.filter((a:any)=>a.DeptId==3).reduce((prev,curr)=>{
      return prev+curr.CreditValue
    },0);

    this.Dept4Debit =res.Details.filter((a:any)=>a.DeptId==4).reduce((prev,curr)=>{
      return prev+curr.DebitValue
    },0);

    this.Dept4Credit=res.Details.filter((a:any)=>a.DeptId==4).reduce((prev,curr)=>{
      return prev+curr.CreditValue
    },0);

    this.Skin=this.Dept3Credit-this.Dept3Debit;
  this.Teeth=this.Dept4Credit-this.Dept4Debit;

    this.Balance=this.Credit-this.Debit;

    })

  }




}
