import { Component, OnInit, ViewChild } from '@angular/core';
import { CustomerReportsService } from '../../../../shared/customer-reports.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DialogService } from '../../../../shared/dialog.service';
import { NotificationService } from '../../../../shared/notification.service';
import { MatDialog, MatTableDataSource, MatSort, MatPaginator, MatDialogConfig } from '@angular/material';
import { ClinicsFormComponent } from '../../clinics/clinics-form/clinics-form.component';

@Component({
  selector: 'ngx-dept-customer-reports',
  templateUrl: './dept-customer-reports.component.html',
  styles: []
})
export class DeptCustomerReportsComponent implements OnInit {


  constructor(private service:CustomerReportsService,
    private router:Router,private activateRoute:ActivatedRoute,
    private confirm:DialogService,private notify:NotificationService,public dialog: MatDialog) { }
    DeptId;
  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['CustomerName','CustomerPhone1','Balance','actions'];
  @ViewChild(MatSort,{static:true}) sort: MatSort;
  @ViewChild(MatPaginator,{static:true}) paginator: MatPaginator;
  searchKey: string;
  DeptDescr;
  ngOnInit() {
  this.getClinics();

  }

  getClinics(){
    this.DeptId=this.activateRoute.snapshot.paramMap.get('DeptId');

    this.service.getCustomersByDept(this.DeptId).subscribe( (res:any)=>{
 
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

  onReport(CustomerId){
    this.router.navigateByUrl('/pages/basicData/customerAccountReports/'+CustomerId+"/"+this.DeptId)
     }

}
