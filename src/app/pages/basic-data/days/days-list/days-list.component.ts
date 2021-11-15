import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatTableDataSource, MatSort, MatPaginator, MatDialogConfig } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { DaysService } from '../../../../shared/days.service';
import { DialogService } from '../../../../shared/dialog.service';
import { NotificationService } from '../../../../shared/notification.service';
import { RunningShiftsService } from '../../../../shared/running-shifts.service';
import { RunningShiftsFormComponent } from '../running-shifts-form/running-shifts-form.component';

@Component({
  selector: 'ngx-days-list',
  templateUrl: './days-list.component.html',
  styleUrls: ['./days-list.component.css']
})
export class DaysListComponent implements OnInit {

  DayId: number;
  Type: string;
  runningShift: number;
  constructor(private service:DaysService,
    private serviceRunningShifts:RunningShiftsService,
    private route:Router,public dialog: MatDialog,

    private activatedRoute:ActivatedRoute,
    private confirm:DialogService,private notify:NotificationService) { }

  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['actions','EmployeeEnd','EmployeeStart','EndTime','EndDate','StartTime','StartDate','DayCode'];
  @ViewChild(MatSort,{static:true}) sort: MatSort;
  @ViewChild(MatPaginator,{static:true}) paginator: MatPaginator;
  searchKey: string;

  ngOnInit() {
  this.getDays();
  }



  getDays(){
    this.Type=this.activatedRoute.snapshot.url[0].path;

    this.service.getAllDays().subscribe( (res:any)=>{
      this.listData = new MatTableDataSource(res);
      this.listData.sort = this.sort;
      this.listData.paginator = this.paginator;

      this.listData.filterPredicate = (data, filter) => {

        return this.displayedColumns.some(ele => {
          if(typeof data[ele]==="string")
          {
          return ele != 'actions' && data[ele].toLowerCase().indexOf(filter) != -1;
          }
        });
      };
    });

    this.service.getAnyDayOpened().subscribe((res:number)=>{

      if(res){

       this.DayId=0;
      }
    else
    {

      this.DayId=1;
    }

    })

    this.serviceRunningShifts.checkRunningShifts().subscribe(res=>{
      if(res)
      {
this.runningShift=0;
      }
      else
      {
        this.runningShift=1;
      }
    })
  }



  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

  onCreateOrEdit(){

    this.service.getAnyDayOpened().subscribe(res=>{
      if(res)
      {

        this.confirm.openConfirmDialog('Are you sure about closing?').afterClosed().subscribe(res=>{
          if(res){
          this.service.deleteDay().subscribe(suc=>{
     this.notify.error('Successfully closed');

               this.getDays();
          })


          }

        })
      }

      else
      {
        this.confirm.openConfirmDialog('Are you sure about opening?').afterClosed().subscribe(res=>{
          if(res){
            this.service.PostDay().subscribe(result=>{
              this.notify.success('Successfully opened');
               this.getDays();

            })
          }

        })
      }
    })
  }

  onCreateRunningShifts(runningShift){

    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "70%";
    dialogConfig.data={runningShift};
    this.dialog.open(RunningShiftsFormComponent, dialogConfig).afterClosed().subscribe(res => {

      this.getDays();
    });
    /*
   }

   else if(ctrl==0)
   {
    this.confirm.openConfirmDialog('هل انت متاكد من  اغلاق الورديه؟').afterClosed().subscribe(res=>{
      if(res){
        this.serviceRunningShifts.deleteRunningShifts().subscribe(result=>{
if(result==0)
{
  this.notify.error('لايمكن اغلاق الورديه قبل اغلاق جميع الخزن');
  this.getDays();
}
else if(result==1)
{
          this.notify.error('تم  اغلاق الورديه  بنجاح');
           this.getDays();
}

        })
      }
    })
   }
*/
  }


  checkRunningShifts(){
    this.serviceRunningShifts.checkRunningShifts().subscribe(res=>{
      return res;
    })
  }


  onCreateOrEditRunningShifts(){

  }
  onMouseOver(ctrl)
  {
    this.serviceRunningShifts.checkRunningShifts().subscribe(res=>{
      if(res){
        ctrl.target.style.backgroundColor="red";
        ctrl.target.innerText="shift closure";
      }
      else
      {
        ctrl.target.style.backgroundColor="green";
        ctrl.target.innerText="open shift";
      }
    })

  }

  checkOpen(IsActive):number{
    if(IsActive==true)
{
      this.serviceRunningShifts.checkRunningShifts().subscribe(res=>{
        if(res)
        {
return 1;
        }
        else
        {
          return 0;
        }
      })
    }
    else
    {
      return 2;
    }
  }


  onDayDetails(DayId){
    this.route.navigateByUrl('/pages/basicData/daysReports/'+DayId);
  }

}
