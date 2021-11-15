import { Component, OnInit, ViewChild } from '@angular/core';
import { TreasuryService } from '../../../../shared/treasury.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DialogService } from '../../../../shared/dialog.service';
import { NotificationService } from '../../../../shared/notification.service';
import { MatDialog, MatTableDataSource, MatSort, MatPaginator, MatDialogConfig } from '@angular/material';
import { ClinicsFormComponent } from '../../clinics/clinics-form/clinics-form.component';

@Component({
  selector: 'ngx-treasury-date-list',
  templateUrl: './treasury-date-list.component.html',
  styles: []
})
export class TreasuryDateListComponent implements OnInit {

  constructor(private service:TreasuryService,
    private route:Router,private activateRoute:ActivatedRoute,
    private confirm:DialogService,private notify:NotificationService,public dialog: MatDialog) { }
    CompareDate;
  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['TreasuryCode','CustomerName',
  'DocTypeName','CurrentDate','CurrentTime'
  ,'DebitValue','CreditValue','DeptDescr','ClinicDesc','DoctorName','ShiftCode','EmployeeName','actions'];
  @ViewChild(MatSort,{static:true}) sort: MatSort;
  @ViewChild(MatPaginator,{static:true}) paginator: MatPaginator;
  searchKey: string;
 
  ngOnInit() {
  this.getTreasury();

  }

  getTreasury(){
    this.CompareDate=this.activateRoute.snapshot.paramMap.get('CompareDate');

    this.service.getTreasuryByDate(this.CompareDate).subscribe( (res:any)=>{
      
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
