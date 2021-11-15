import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { CustomerPaymentService } from '../../../../shared/customer-payment.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatTableDataSource, MatSort, MatPaginator, MatDialogConfig } from '@angular/material';
import { DialogService } from '../../../../shared/dialog.service';
import { NotificationService } from '../../../../shared/notification.service';
import { CustomerPaymentFormComponent } from '../customer-payment-form/customer-payment-form.component';
import { ShiftsService } from '../../../../shared/shifts.service';

@Component({
  selector: 'ngx-customer-payment-list',
  templateUrl: './customer-payment-list.component.html',
  styles: []
})
export class CustomerPaymentListComponent implements OnInit,OnDestroy {

  constructor(private service:CustomerPaymentService  ,
    private route:Router,public dialog: MatDialog,
    private serviceShifts:ShiftsService,
    private activateRoute:ActivatedRoute,
    private confirm:DialogService,private notify:NotificationService) {

     }

  listData: MatTableDataSource<any>;
  Type;
  DocTypeId;
  sub
  displayedColumns: string[] = ['PaymentReceiptNo','CustomerName',"PaymentReceiptDate",'CurrentTime','DeptDescr','ClinicDesc','PayMentValue','actions'];
  @ViewChild(MatSort,{static:true}) sort: MatSort;
  @ViewChild(MatPaginator,{static:true}) paginator: MatPaginator;
  searchKey: string;
  ngOnDestroy(){
    if(this.sub)
    {
      this.sub.unsubscribe();
    }
      }

  ngOnInit() {
  
    this.sub = this.activateRoute.params
    .subscribe(params => {
       // get id from params
       let id = +params['id'];
       this.DocTypeId=id;
       this.getPaymentTypes(this.DocTypeId);

     });

  }

  getPaymentTypes(DocTypeId){

    this.service.getAllCustomerPayment(DocTypeId).subscribe( (res:any)=>{
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

  onCreate(){
    this.serviceShifts.getAnyShifts().subscribe((res:number)=>{
    
      if(res){
let DocTypeId=this.DocTypeId;
 const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "70%";
    dialogConfig.data = { DocTypeId };
    this.dialog.open(CustomerPaymentFormComponent, dialogConfig).afterClosed().subscribe(res => {

      this.getPaymentTypes(this.DocTypeId);
    });
  }
  else 
  {
   this.notify.error("من فضلك  قم بفتح شيفت من فضلك اولا") 
  }
})
  }

  onReport(CustomerPaymentId){
this.route.navigateByUrl('/pages/basicData/customerPaymnentReport/'+CustomerPaymentId);
  }



}
