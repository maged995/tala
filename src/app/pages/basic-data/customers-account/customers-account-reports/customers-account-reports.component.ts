import { Component, OnInit, ViewChild } from '@angular/core';
import { CustomerReportsService } from '../../../../shared/customer-reports.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogService } from '../../../../shared/dialog.service';
import { NotificationService } from '../../../../shared/notification.service';
import { MatDialog, MatTableDataSource, MatSort, MatPaginator, MatDialogConfig } from '@angular/material';
import { EmployeesFormComponent } from '../../employees/employees-form/employees-form.component';
import { CustomersService } from '../../../../shared/customers.service';

@Component({
  selector: 'ngx-customers-account-reports',
  templateUrl: './customers-account-reports.component.html',
  styles: []
})
export class CustomersAccountReportsComponent implements OnInit {
  CustomerId;
  CustomerName;
  DeptId;
constructor(private service:CustomerReportsService,private serviceCusomer:CustomersService,
 private route:Router,
  private confirm:DialogService,private notify:NotificationService,private activateRoute:ActivatedRoute
  ,public dialog: MatDialog) { }

  sub;
listData: MatTableDataSource<any>;
displayedColumns: string[] = ['Row','Code','ClinicDesc','DocTypeName','CurrentDate','CurrentTime','DepitValue','CreditValue','Balance','actions'];
@ViewChild(MatSort,{static:true}) sort: MatSort;
@ViewChild(MatPaginator,{static:true}) paginator: MatPaginator;
searchKey: string;
EmployeeFlagId;

ngOnInit() {
 
  this.CustomerId=this.activateRoute.snapshot.paramMap.get('CustomerId');
  
  this.DeptId=this.activateRoute.snapshot.paramMap.get('DeptId');
    this.getEmployees();

}

getEmployees(){
 this.serviceCusomer.getOneCustomer(this.CustomerId).subscribe((result:any)=>{
   
   this.CustomerName=result.Master.CustomerName
 })
  this.service.getAllAboutAccountAndPayment(this.CustomerId,this.DeptId).subscribe( (res:any)=>{
  
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


onShow(InvoiceId,DocTypeId){
  if(DocTypeId==4 || DocTypeId==3)
  {
    this.route.navigateByUrl('/pages/basicData/customerPaymnentReport/'+InvoiceId);
  }
  else if(DocTypeId==1|| DocTypeId==2){
    this.route.navigateByUrl('/pages/basicData/clinicrReservationReports/'+InvoiceId)
  }
  else if(DocTypeId==5)
  {
    this.route.navigateByUrl('/pages/basicData/visitReport/'+InvoiceId)
  }

}


}
