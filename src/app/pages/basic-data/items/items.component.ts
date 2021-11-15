import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngx-items',
  templateUrl: './items.component.html',
  styles: []
})
export class ItemsComponent implements OnInit {

  navLinks: any[];
  activeLinkIndex = -1;
  constructor(private router: Router,private activateRoute:ActivatedRoute) {

}
ngOnInit(): void {

    this.navLinks = [
      {
          label: 'Medicine',
          link: '/pages/basicData/items/1',
          index: 0
      }
      /*
      ,
       {
          label: 'المستلزمات',
          link: '/pages/basicData/items/2',
          index: 1
      },
      */
      ,{
        label: 'Services',
        link: '/pages/basicData/items/3',
        index: 1
      },



    ];


  this.router.events.subscribe((res) => {
      this.activeLinkIndex = this.navLinks.indexOf(this.navLinks.find(tab => tab.link === '.' + this.router.url));
  });
}

}
