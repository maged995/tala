import { Component, OnInit } from '@angular/core';

import { InvoiceMasterService } from '../../../../shared/invoice-master.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../../../environments/environment.prod';

@Component({
  selector: 'ngx-invoice-master-reports',
  templateUrl: './invoice-master-reports.component.html',
  styles: []
})
export class InvoiceMasterReportsComponent implements OnInit {

  InvoiceMasterId;
  InvoiceMasterCode;
  CurrentDate;
  EmployeeName;
  DeptDescr;
  Notes;
  DocTypeName;
  ReceiverDesc;
  DocTypeId;
  useExistingCss:boolean;
  styleName:string;
  
  constructor(public service:InvoiceMasterService,private activateRoute:ActivatedRoute) { }

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
    this.InvoiceMasterId=this.activateRoute.snapshot.paramMap.get('id');
this.service.getForReport(this.InvoiceMasterId).subscribe((res:any)=>{
  this.InvoiceMasterCode=res.Master.InvoiceMasterCode;
  this.DeptDescr=res.Master.DeptDescr;
  this.Notes=res.Master.Notes;
  this.CurrentDate=res.Master.CurrentDate,
  this.DocTypeName=res.Master.DocTypeName;
  this.ReceiverDesc=res.Master.ReceiverDesc;
  this.EmployeeName=res.Master.EmployeeName;
  this.DocTypeId=res.Master.DocTypeId;
  this.Notes=res.Master.Notes
this.service.InvoiceDetailsList=res.Details;
})

  }

}
