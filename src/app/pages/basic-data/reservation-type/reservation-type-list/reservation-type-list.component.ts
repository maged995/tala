import { Component, OnInit, ViewChild } from '@angular/core';
import { ReservationTypesService } from '../../../../shared/reservation-types.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DialogService } from '../../../../shared/dialog.service';
import { NotificationService } from '../../../../shared/notification.service';
import { MatDialog, MatTableDataSource, MatSort, MatPaginator, MatDialogConfig } from '@angular/material';

import { ReservationFromComponent } from '../../reservation/reservation-from/reservation-from.component';
import { ReservationTypeFromComponent } from '../reservation-type-from/reservation-type-from.component';

@Component({
  selector: 'ngx-reservation-type-list',
  templateUrl: './reservation-type-list.component.html',
  styles: []
})
export class ReservationTypeListComponent implements OnInit {

  constructor(private service:ReservationTypesService,
    private route:Router,private activateRoute:ActivatedRoute,
    private confirm:DialogService,private notify:NotificationService,public dialog: MatDialog) { }
    DeptId;
  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['ReservationDesc','Price','actions'];
  @ViewChild(MatSort,{static:true}) sort: MatSort;
  @ViewChild(MatPaginator,{static:true}) paginator: MatPaginator;
  searchKey: string;
  DeptDescr;
  ngOnInit() {
  this.getStores();

  }

  getStores(){
    this.DeptId=this.activateRoute.snapshot.paramMap.get('id');

    this.service.getAllReservationsByDept(this.DeptId).subscribe( (res:any)=>{
      this.DeptDescr=res.DeptDescr;
      this.listData = new MatTableDataSource(res.ReservationTypes);
     
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

  onCreateOrEdit(ReservationTypeId){
    let DeptId=this.DeptId;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "70%";
    dialogConfig.data = { ReservationTypeId,DeptId };
    this.dialog.open(ReservationTypeFromComponent, dialogConfig).afterClosed().subscribe(res => {

      this.getStores();
    });
  }

  onDelete(ReservationTypeId)
  {
    this.confirm.openConfirmDialog('هل انت متاكد من الحذف؟').afterClosed().subscribe(res=>{
      if(res){
        this.service.deleteReservation(ReservationTypeId).subscribe(res=>{
          this.notify.error('تم الحذف بنجاح');
          this.getStores();
        })
      }
    })
  }


}
