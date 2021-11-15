import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngx-inventory',
  templateUrl: './inventory.component.html',
  styles: []
})
export class InventoryComponent implements OnInit {

  navLinks: any[];
  activeLinkIndex = -1; 
  constructor(private router: Router,private activateRoute:ActivatedRoute) {

}
ngOnInit(): void {

    this.navLinks = [
      {
          label: 'قسم اداري',
          link: '/pages/basicData/inventory/2',
          index: 0
      },
       {
          label: 'قسم الجلديه ',
          link: '/pages/basicData/inventory/3',
          index: 1
      },
      {
        label: 'قسم الاسنان',
        link: '/pages/basicData/inventory/4',
        index: 2
      },
    

   
    ];
  

  this.router.events.subscribe((res) => {
      this.activeLinkIndex = this.navLinks.indexOf(this.navLinks.find(tab => tab.link === '.' + this.router.url));
  });
}

}
