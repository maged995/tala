import { Component, OnInit, ViewChild } from '@angular/core';
import { ReservationsService } from '../../../../shared/reservations.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatTableDataSource, MatSort, MatPaginator, MatDialogConfig } from '@angular/material';
import { DialogService } from '../../../../shared/dialog.service';
import { NotificationService } from '../../../../shared/notification.service';
import { ItemsFormComponent } from '../../items/items-form/items-form.component';
import { ReservationFromComponent } from '../reservation-from/reservation-from.component';

@Component({
  selector: 'ngx-reservation-list',
  templateUrl: './reservation-list.component.html',
  styles: []
})
export class ReservationListComponent implements OnInit {


  constructor(private service:ReservationsService,
    private route:Router,public dialog: MatDialog,private activateRoute:ActivatedRoute,
    private confirm:DialogService,private notify:NotificationService) { }

  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['actions','ReservationDesc'];
  @ViewChild(MatSort,{static:true}) sort: MatSort;
  @ViewChild(MatPaginator,{static:true}) paginator: MatPaginator;
  searchKey: string;

  ngOnInit() {
  this.getReservation();

  }

  getReservation(){


    this.service.getAllReservations().subscribe( (res:any)=>{
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

  onCreateOrEdit(ReservationId){

 const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "70%";
    dialogConfig.data = { ReservationId };
    this.dialog.open(ReservationFromComponent, dialogConfig).afterClosed().subscribe(res => {

      this.getReservation();
    });
  }

  onDelete(ReservationId)
  {
    this.confirm.openConfirmDialog('Are you sure about deleting?').afterClosed().subscribe(res=>{
      if(res){
        this.service.deleteReservation(ReservationId).subscribe(res=>{
          this.notify.error('Deleted successfully');
          this.getReservation();
        })
      }
    })
  }

}
