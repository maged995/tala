import { Component, OnInit, ViewChild } from '@angular/core';
import { ClinicAppoinmentsService } from '../../../../shared/clinic-appoinments.service';
import { ClinicsService } from '../../../../shared/clinics.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DialogService } from '../../../../shared/dialog.service';
import { NotificationService } from '../../../../shared/notification.service';
import { MatDialog, MatTableDataSource, MatSort, MatPaginator, MatDialogConfig } from '@angular/material';
/*
import { ClinicAppoinmentsFormComponent } from '../../clinic-appoinments/clinic-appoinments-form/clinic-appoinments-form.component';
*/
import { TodayService } from '../../../../shared/today.service';

@Component({
  selector: 'ngx-test-from',
  templateUrl: './test-from.component.html',
  styles: []
})
export class TestFromComponent implements OnInit {

  daysList;
  ClinicId;
  DayId;
  DeptId;
  sub;
  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['DoctorName','AppoinmentTimeFrom','AppoinmentTimeTo','actions'];
  @ViewChild(MatSort,{static:true}) sort: MatSort;
  @ViewChild(MatPaginator,{static:true}) paginator: MatPaginator;
  searchKey: string;
  DeptDescr;
  
  constructor(private serviceDays:TodayService,private service:ClinicAppoinmentsService,
    private serviceClinic:ClinicsService,
    private route:Router,private activateRoute:ActivatedRoute,
    private confirm:DialogService,private notify:NotificationService,public dialog: MatDialog) { }

  ngOnInit() {
    this.serviceDays.getAllDays().subscribe(res=>{
this.daysList=res;
    });
  }
  openGroup(DayId){

    this.getClinics(DayId);
  }
  getClinics(DayId){
    this.ClinicId=this.activateRoute.snapshot.paramMap.get('id');

      this.DayId=DayId;
 
      this.serviceClinic.getOneClinic(this.ClinicId).subscribe((res:any)=>{
        this.DeptId=res.DeptId
      })
  
      this.service.getAllClinicAppoinments(this.ClinicId,this.DayId).subscribe( (res:any)=>{
       
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
    }


    onSearchClear() {
      this.searchKey = "";
      this.applyFilter();
    }
  
    applyFilter() {
      this.listData.filter = this.searchKey.trim().toLowerCase();
    }
  
    onCreateOrEdit(ClinicAppoinmentId){
      let ClinicId=this.ClinicId;
      let DayId=this.DayId;
      let DeptId=this.DeptId;
      const dialogConfig = new MatDialogConfig();
      dialogConfig.autoFocus = true;
      dialogConfig.disableClose = true;
      dialogConfig.width = "70%";
      dialogConfig.data = { ClinicAppoinmentId,ClinicId,DayId,DeptId };
/*
      this.dialog.open(ClinicAppoinmentsFormComponent, dialogConfig).afterClosed().subscribe(res => {
  
        this.getClinics(this.DayId);
      });
      */
    }
  
    onDelete(ClinicAppoinmentId)
    {
      this.confirm.openConfirmDialog('هل انت متاكد من الحذف؟').afterClosed().subscribe(res=>{
        if(res){
          this.service.deleteClinicAppoinments(ClinicAppoinmentId).subscribe(res=>{
            this.notify.error('تم الحذف بنجاح');
            this.getClinics(this.DayId);
          })
        }
      })
    }

}
