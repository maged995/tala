import { Component, OnInit, ViewChild } from '@angular/core';

import { DepartmentsFormComponent } from '../departments-form/departments-form.component';
import { Router } from '@angular/router';
import { DialogService } from '../../../../shared/dialog.service';
import { NotificationService } from '../../../../shared/notification.service';
import { MatDialog, MatTableDataSource, MatSort, MatPaginator, MatDialogConfig } from '@angular/material';
import { Departmentservice } from '../../../../shared/department.service';


@Component({
  selector: 'ngx-departments-list',
  templateUrl: './departments-list.component.html',
  styles: []
})
export class DepartmentsListComponent implements OnInit {
  constructor(private service:Departmentservice,
    private route:Router,public dialog: MatDialog,
    private confirm:DialogService,private notify:NotificationService) { }

  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['anotherActions','actions','DeptDescr'];
  @ViewChild(MatSort,{static:true}) sort: MatSort;
  @ViewChild(MatPaginator,{static:true}) paginator: MatPaginator;
  searchKey: string;

  ngOnInit() {
  this.getdepartemts();

  }

  getdepartemts(){
    this.service.getActiveDepartments().subscribe( (res:any)=>{
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

  onCreateOrEdit(DeptId){

 const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "70%";
    dialogConfig.data = { DeptId };
    this.dialog.open(DepartmentsFormComponent, dialogConfig).afterClosed().subscribe(res => {

      this.getdepartemts();
    });
  }

  onDelete(DeptId)
  {
    this.confirm.openConfirmDialog('Are you sure about deleting?').afterClosed().subscribe(res=>{
      if(res){
        this.service.deleteDepartment(DeptId).subscribe(res=>{
          this.notify.error('Deleted successfully');
          this.getdepartemts();
        })
      }
    })
  }

  onJobs(DeptId){
this.route.navigateByUrl('/pages/basicData/jobs/'+DeptId)
  }


onReservationType(DeptId)
{
  this.route.navigateByUrl('/pages/basicData/reservationType/'+DeptId);
}

}
