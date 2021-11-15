import { Component, OnInit, ViewChild } from '@angular/core';
import { CustomerReportsService } from '../../../../shared/customer-reports.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { DialogService } from '../../../../shared/dialog.service';
import { NotificationService } from '../../../../shared/notification.service';
import { CustomersService } from '../../../../shared/customers.service';

@Component({
  selector: 'ngx-customer-visit-reports',
  templateUrl: './customer-visit-reports.component.html',
  styles: []
})
export class CustomerVisitReportsComponent implements OnInit {
  CustomerId: any;
  DeptId: any;
  CustomerName: any;


  constructor(private service:CustomerReportsService,private serviceCusomer:CustomersService,
    private route:Router,public dialog: MatDialog,private activateRoute:ActivatedRoute,
    private confirm:DialogService,private notify:NotificationService) { }

  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['VisitMasterCode','VisitDate','ClinicDesc','EmployeeName','Notes','actions'];
  @ViewChild(MatSort,{static:true}) sort: MatSort;
  @ViewChild(MatPaginator,{static:true}) paginator: MatPaginator;
  searchKey: string;

  ngOnInit() {
  this.getOldMaster();

  }

  getOldMaster(){
     
  this.CustomerId=this.activateRoute.snapshot.paramMap.get('CustomerId');
  
  this.DeptId=this.activateRoute.snapshot.paramMap.get('DeptId');

  this.serviceCusomer.getOneCustomer(this.CustomerId).subscribe((result:any)=>{
   
    this.CustomerName=result.Master.CustomerName
  })

    this.service.getAllVisit(this.CustomerId,this.DeptId).subscribe( (res:any)=>{
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

  onShow(VisitMasterId){
this.route.navigateByUrl('/pages/basicData/visitReport/'+VisitMasterId)
  }


  onMedicine(VisitMasterId){
    
    this.route.navigateByUrl('/pages/basicData/visitMediciceReports/'+VisitMasterId)
  }

}
