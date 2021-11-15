import { Component, OnInit, ViewChild } from '@angular/core';
import { CustomerOnlineService } from '../../../../shared/customer-online.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DialogService } from '../../../../shared/dialog.service';
import { NotificationService } from '../../../../shared/notification.service';
import { MatDialog, MatTableDataSource, MatSort, MatPaginator } from '@angular/material';

@Component({
  selector: 'ngx-customer-online-non-active',
  templateUrl: './customer-online-non-active.component.html',
  styles: []
})
export class CustomerOnlineNonActiveComponent implements OnInit {

  constructor(private service:CustomerOnlineService,
    private route:Router,private activateRoute:ActivatedRoute,
    private confirm:DialogService,private notify:NotificationService,public dialog: MatDialog) { }
    DeptId;
  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['CustomerOnlineCode','CustomerName','CustomerPhone','ReservationDay','ReservationTime','DoctorName','ClinicDesc','Notes','EmployeeName'];
  @ViewChild(MatSort,{static:true}) sort: MatSort;
  @ViewChild(MatPaginator,{static:true}) paginator: MatPaginator;
  searchKey: string;
  DeptDescr;
  ngOnInit() {
  this.getClinics();

  }

  getClinics(){
    this.DeptId=this.activateRoute.snapshot.paramMap.get('id');

    this.service.getNonActive(this.DeptId).subscribe( (res:any)=>{
      
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

}
