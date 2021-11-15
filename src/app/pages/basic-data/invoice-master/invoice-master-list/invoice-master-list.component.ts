import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { InvoiceMasterService } from '../../../../shared/invoice-master.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DialogService } from '../../../../shared/dialog.service';
import { NotificationService } from '../../../../shared/notification.service';
import { MatDialog, MatTableDataSource, MatSort, MatPaginator, MatDialogConfig } from '@angular/material';
import { EmployeesFormComponent } from '../../employees/employees-form/employees-form.component';

@Component({
  selector: 'ngx-invoice-master-list',
  templateUrl: './invoice-master-list.component.html',
  styleUrls: ['./invoice-master-list.component.css']
})
export class InvoiceMasterListComponent implements OnInit,OnDestroy {



  constructor(private service:InvoiceMasterService,
    private route:Router,
    private confirm:DialogService,private notify:NotificationService,private activateRoute:ActivatedRoute
    ,public dialog: MatDialog) { }
  ngOnDestroy(): void {
this.sub.unsubscribe();
  }
    sub;
  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['InvoiceMasterCode','DeptDescr','ReceiverDesc','CurrentDate','EmployeeName','Notes','actions'];
  @ViewChild(MatSort,{static:true}) sort: MatSort;
  @ViewChild(MatPaginator,{static:true}) paginator: MatPaginator;
  searchKey: string;
  DocTypeId;

  ngOnInit() {
    this.sub=this.activateRoute.params.subscribe(res=>{
      this.DocTypeId=this.activateRoute.snapshot.paramMap.get('id');
      this.getInvoices();
    })
    
    


  }

  getInvoices(){
    
    this.service.getAllByDocType(this.DocTypeId).subscribe( (res:any)=>{
    
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

  showReceiver(){
    if(this.DocTypeId==9 || this.DocTypeId==10)
    {
      return null;
    }
    else 
    {
      return 'hidden-row';
     
    }
  }
  onShow(InvoiceMasterId){
this.route.navigateByUrl('/pages/basicData/invoiceReports/'+InvoiceMasterId);
  }

  onCreateOrEdit(){
    this.route.navigateByUrl('pages/basicData/invoiceAdd/'+this.DocTypeId);
  }

 

}
