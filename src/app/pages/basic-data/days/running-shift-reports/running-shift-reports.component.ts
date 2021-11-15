import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../../../../environments/environment.prod';
import { RunningShiftsService } from '../../../../shared/running-shifts.service';

@Component({
  selector: 'ngx-running-shift-reports',
  templateUrl: './running-shift-reports.component.html',
  styles: []
})
export class RunningShiftReportsComponent implements OnInit {


  DetailsList:any[]=[];

    useExistingCss:boolean;
    styleName:string;
  ShiftsTimeName: any;

  
    constructor(public service:RunningShiftsService,private route:Router,
      private activeRoute:ActivatedRoute) { }
      RunningShiftId=this.activeRoute.snapshot.paramMap.get("id");
     
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
  
      this.service.getOneRunningShift(this.RunningShiftId).subscribe((res:any)=>{
    this.ShiftsTimeName=res.Master.ShiftsTimeName;
        this.StartDate=res.Master.StartDate;
        this.EndDate=res.Master.EndDate;
        this.ClosedValue =res.Master.ClosedValue;
      this.DetailsList=res.Details;

      })
  
    }

    onMiniSafeChange(MiniSafeId){
      this.route.navigateByUrl('/pages/basicData/miniSafeReports/'+MiniSafeId);
    }

}
