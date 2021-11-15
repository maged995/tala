import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { DialogService } from '../../../../shared/dialog.service';
import { NotificationService } from '../../../../shared/notification.service';
import { MatDialog, MatTableDataSource, MatSort, MatPaginator, MatDialogConfig } from '@angular/material';

import { EmployeesFormComponent } from '../employees-form/employees-form.component';
import { EmployeesService } from '../../../../shared/employees.service';

@Component({
  selector: 'ngx-employees-list',
  templateUrl: './employees-list.component.html',
  styles: []
})
export class EmployeesListComponent implements OnInit,OnDestroy {


  constructor(private service:EmployeesService,
    private route:Router,
    private confirm:DialogService,private notify:NotificationService,private activateRoute:ActivatedRoute
    ,public dialog: MatDialog) { }
  ngOnDestroy(): void {
this.sub.unsubscribe();
  }
    sub;
  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['actions','IsLogIn','EmployeeAge','GenderDesc','EmpAddress','EmpPhone','JobName','DeptDescr','BranchDesc','UserName','EmployeeName'];
  @ViewChild(MatSort,{static:true}) sort: MatSort;
  @ViewChild(MatPaginator,{static:true}) paginator: MatPaginator;
  searchKey: string;
  EmployeeFlagId;

  ngOnInit() {
    this.sub=this.activateRoute.params.subscribe(res=>{
      this.EmployeeFlagId=this.activateRoute.snapshot.paramMap.get('id');
      this.getEmployees();
    })




  }

  getEmployees(){
    this.EmployeeFlagId=this.activateRoute.snapshot.paramMap.get('id');
    this.service.getAllEmployeesByFlagId(this.EmployeeFlagId).subscribe( (res:any)=>{

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

  onCreateOrEdit(EmployeeId){
    let EmployeeFlagId=this.EmployeeFlagId;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "70%";
    dialogConfig.data = { EmployeeId,EmployeeFlagId};
    this.dialog.open(EmployeesFormComponent, dialogConfig).afterClosed().subscribe(res => {

      this.getEmployees();
    });
  }

  onDelete(EmployeeId)
  {
    this.confirm.openConfirmDialog('Are you sure about deleting?').afterClosed().subscribe(res=>{
      if(res){
        this.service.deleteEmployee(EmployeeId).subscribe(res=>{
          this.notify.error('Deleted successfully');
          this.getEmployees();
        })
      }
    })
  }


}
