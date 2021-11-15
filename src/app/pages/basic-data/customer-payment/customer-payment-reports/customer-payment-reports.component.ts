import { Component, OnInit } from '@angular/core';
import { CustomerPaymentService } from '../../../../shared/customer-payment.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../../../environments/environment.prod';

@Component({
  selector: 'ngx-customer-payment-reports',
  templateUrl: './customer-payment-reports.component.html',
  styles: []
})
export class CustomerPaymentReportsComponent implements OnInit {
  CustomerPaymentId;
  CustomerPaymentCode;
  CustomerId;
  CustomerName;
  PayMentValue;
  PaymentReceiptDate;
  DocTypeName;
  DocTypeId;
  useExistingCss:boolean;
  styleName:string;
  ClinicDesc: any;
  DeptDescr: any;
  constructor(private service:CustomerPaymentService,private activateRoute:ActivatedRoute) { }

  ngOnInit() {
    this.useExistingCss = true;
    if (environment.production ) {
          this.useExistingCss = false;
          const elements = document.getElementsByTagName('link');
          for (let index = 0; index < elements.length; index++) {
            if (elements[index].href.startsWith(document.baseURI)) {
              this.styleName += elements[index].href + ',';
            }
          }
          this.styleName = this.styleName.slice(0, -1);
        }
    this.CustomerPaymentId=this.activateRoute.snapshot.paramMap.get('id');
this.service.getCustomerPaymentReport(this.CustomerPaymentId).subscribe((res:any)=>{
  this.CustomerPaymentCode=res.CustomerPaymentCode;
  this.CustomerId=res.CustomerId;
  this.CustomerName=res.CustomerName;
  this.PayMentValue=res.PayMentValue;
  this.PaymentReceiptDate=res.PaymentReceiptDate;
  this.DocTypeName=res.DocTypeName;
  this.DocTypeId=res.DocTypeId;
  this.ClinicDesc=res.ClinicDesc;
  this.DeptDescr=res.DeptDescr;

})

  }

}
