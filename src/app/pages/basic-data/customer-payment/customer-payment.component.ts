import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-customer-payment',
  templateUrl: './customer-payment.component.html',
  styles: []
})
export class CustomerPaymentComponent  {

  title = 'الدفعات وانواعها';  
  navLinks: any[];
  activeLinkIndex = -1; 
  constructor(private router: Router) {
    this.navLinks = [
        {
            label: 'دفعه من عميل',
            link: '/pages/basicData/customerPayment/3',
            index: 0,
            
            
        },
        {
            label: 'دفعه لعميل',
            link: '/pages/basicData/customerPayment/4',
            index: 1
        },
    
     
  
    ];
}
ngOnInit(): void {
  this.router.events.subscribe((res) => {
      this.activeLinkIndex = this.navLinks.indexOf(this.navLinks.find(tab => tab.link === '.' + this.router.url));
  });
}

}