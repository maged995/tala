import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../../../../../environments/environment.prod';
import { DaysService } from '../../../../../shared/days.service';

@Component({
  selector: 'ngx-days-reports',
  templateUrl: './days-reports.component.html',
  styles: []
})
export class DaysReportsComponent implements OnInit {

 
  DetailsList:any[]=[];

    useExistingCss:boolean;
    styleName:string;

  
    constructor(public service:DaysService,private route:Router,
      private activeRoute:ActivatedRoute) { }
      DayId=this.activeRoute.snapshot.paramMap.get("id");
     
      StartDate:Date;
      EndDate:Date;
      
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
  
      this.service.getOneDay(this.DayId).subscribe((res:any)=>{
    
        this.StartDate=res.Master.StartDate;
        this.EndDate=res.Master.EndDate;
        this.ClosedValue =res.Master.ClosedValue;
      this.DetailsList=res.Details;

  
      })
  
    }
    onChangeRunningShifts(RunningShiftId){
      this.route.navigateByUrl('/pages/basicData/runningShiftsReports/'+RunningShiftId)
    }


}
