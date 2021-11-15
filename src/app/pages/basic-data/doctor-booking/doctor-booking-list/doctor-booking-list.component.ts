import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatTableDataSource, MatSort, MatPaginator, MatDialogConfig } from '@angular/material';
import { Router } from '@angular/router';
import { DialogService } from '../../../../shared/dialog.service';
import { DoctorBookingService } from '../../../../shared/doctor-booking.service';
import { NotificationService } from '../../../../shared/notification.service';
import { BranchesFormComponent } from '../../branches/branches-form/branches-form.component';
import { DoctorBookingFormComponent } from '../doctor-booking-form/doctor-booking-form.component';

@Component({
  selector: 'ngx-doctor-booking-list',
  templateUrl: './doctor-booking-list.component.html',
  styles: []
})
export class DoctorBookingListComponent implements OnInit {

 
  constructor(private service:DoctorBookingService,
    private route:Router,public dialog: MatDialog,
    private confirm:DialogService,private notify:NotificationService) { }

  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['EndDate','StartDate','ReservationName','DoctorName'];
  @ViewChild(MatSort,{static:true}) sort: MatSort;
  @ViewChild(MatPaginator,{static:true}) paginator: MatPaginator;
  searchKey: string;

  ngOnInit() {
  this.getDoctorBooking();

  }

  getDoctorBooking(){
    this.service.getAllDoctorBooking().subscribe( (res:any)=>{
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

  onCreateOrEdit(){

 const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "70%";
    dialogConfig.data = {  };
    this.dialog.open(DoctorBookingFormComponent, dialogConfig).afterClosed().subscribe(res => {

      this.getDoctorBooking();
    });
  }

}
