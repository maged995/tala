import { Component, OnInit, ViewChild } from '@angular/core';
import { CustomersService } from '../../../../shared/customers.service';
import { Router } from '@angular/router';
import { MatDialog, MatTableDataSource, MatSort, MatPaginator, MatDialogConfig } from '@angular/material';
import { DialogService } from '../../../../shared/dialog.service';
import { NotificationService } from '../../../../shared/notification.service';
import { DepartmentsFormComponent } from '../../departments/departments-form/departments-form.component';
import { CustomersFormComponent } from '../customers-form/customers-form.component';

@Component({
  selector: 'ngx-customers-list',
  templateUrl: './customers-list.component.html',
  styles: []
})
export class CustomersListComponent implements OnInit {

  constructor(private service:CustomersService,
    private route:Router,public dialog: MatDialog,
    private confirm:DialogService,private notify:NotificationService) { }

  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['actions','FirstPerioudBalance','CustomerAddress','CustomerPhone1','GenderDesc','CustomerAge','CustomerName'];
  @ViewChild(MatSort,{static:true}) sort: MatSort;
  @ViewChild(MatPaginator,{static:true}) paginator: MatPaginator;
  searchKey: string;

  ngOnInit() {
  this.getCustomers();

  }

  getCustomers(){
    this.service.getAllCustomers().subscribe( (res:any)=>{
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

  onCreateOrEdit(CustomerId){
    if(CustomerId==null)
    {
    this.route.navigate(['/pages/basicData/CustomersAdd'])
    }
    else
    {
      this.route.navigate(['/pages/basicData/CustomersEdit/'+CustomerId])
    }
  }

  onDelete(CustomerId)
  {
    this.confirm.openConfirmDialog('Are you sure about deleting?').afterClosed().subscribe(res=>{
      if(res){
        this.service.deleteCustomer(CustomerId).subscribe(res=>{
          this.notify.error('Deleted successfully');
          this.getCustomers();
        })
      }
    })
  }

}
