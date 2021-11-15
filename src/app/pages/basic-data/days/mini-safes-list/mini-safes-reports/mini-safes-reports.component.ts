import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../../../../../environments/environment.prod';
import { MiniSafesService } from '../../../../../shared/mini-safes.service';

@Component({
  selector: 'ngx-mini-safes-reports',
  templateUrl: './mini-safes-reports.component.html',
  styles: []
})
export class MiniSafesReportsComponent implements OnInit {


  DetailsList:any[]=[];

    useExistingCss:boolean;
    styleName:string;

  
    constructor(public service:MiniSafesService,private route:Router,
      private activeRoute:ActivatedRoute) { }
      MiniSafeId=this.activeRoute.snapshot.paramMap.get("id");
      MiniSafeCode:number;
      StartDate:Date;
      EndDate:Date;
      EmployeeName:string;
      ClosedValue:number;
    
      
   
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
  
      this.service.getOneMiniSafes(this.MiniSafeId).subscribe((res:any)=>{
    
        this.StartDate=res.Master.StartDate;
        this.EndDate=res.Master.EndDate;
        this.MiniSafeCode=res.Master.MiniSafeCode;
        this.EmployeeName=res.Master.EmployeeName;
        this.ClosedValue =res.Master.ClosedValue;
      this.DetailsList=res.Details;

  
      })
  
    }

}
