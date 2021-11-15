import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatTableDataSource, MatSort, MatPaginator, MatDialogConfig } from '@angular/material';
import { Router } from '@angular/router';
import { DialogService } from '../../../../shared/dialog.service';

import { NotificationService } from '../../../../shared/notification.service';
import { ShiftsTimeService } from '../../../../shared/shifts-time.service';
import { ShiftsTimesFormComponent } from '../shifts-times-form/shifts-times-form.component';

@Component({
  selector: 'ngx-shifts-times',
  templateUrl: './shifts-times.component.html',
  styles: []
})
export class ShiftsTimesComponent implements OnInit {
  constructor(private service:ShiftsTimeService,
    private route:Router,public dialog: MatDialog,
    private confirm:DialogService,private notify:NotificationService) { }

  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['actions','EndTime','StartTime','ShiftsTimeName'];
  @ViewChild(MatSort,{static:true}) sort: MatSort;
  @ViewChild(MatPaginator,{static:true}) paginator: MatPaginator;
  searchKey: string;

  ngOnInit() {
  this.getShiftsTime();

  }

  getShiftsTime(){
    this.service.getAllShiftsTime().subscribe( (res:any)=>{
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

  onCreateOrEdit(ShiftsTimeId){

 const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "70%";
    dialogConfig.data = { ShiftsTimeId };
    this.dialog.open(ShiftsTimesFormComponent, dialogConfig).afterClosed().subscribe(res => {

      this.getShiftsTime();
    });
  }

  onDelete(ShiftsTimeId)
  {
    this.confirm.openConfirmDialog('Are you sure about deleting?').afterClosed().subscribe(res=>{
      if(res){
        this.service.deleteShift(ShiftsTimeId).subscribe(res=>{
          this.notify.error('Deleted successfully');
          this.getShiftsTime();
        })
      }
    })
  }

}
