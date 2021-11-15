import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatTableDataSource, MatSort, MatPaginator, MatDialogConfig } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { BranchDepartmentService } from '../../../../shared/branch-department.service';
import { DialogService } from '../../../../shared/dialog.service';
import { NotificationService } from '../../../../shared/notification.service';
import { SafesFormComponent } from '../../safes/safes-form/safes-form.component';
import { BranchDepartmentFormComponent } from '../branch-department-form/branch-department-form.component';

@Component({
  selector: 'ngx-branch-department-list',
  templateUrl: './branch-department-list.component.html',
  styles: []
})
export class BranchDepartmentListComponent implements OnInit {


  constructor(private service:BranchDepartmentService,
    private route:Router,
    private confirm:DialogService,private notify:NotificationService,private activateRoute:ActivatedRoute
    ,public dialog: MatDialog) { }

  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['actions','DeptDescr'];
  @ViewChild(MatSort,{static:true}) sort: MatSort;
  @ViewChild(MatPaginator,{static:true}) paginator: MatPaginator;
  searchKey: string;
  BranchId;
  BranchDesc
  ngOnInit() {
  this.getBranchDepartment();

  }

  getBranchDepartment(){
    this.BranchId=this.activateRoute.snapshot.paramMap.get('id');
    this.service.getAllBranchDepartment(this.BranchId).subscribe( (res:any)=>{

      this.BranchDesc=res.BranchDesc;
      this.listData = new MatTableDataSource(res.Departmnts);

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

  onCreateOrEdit(BranchDeptId){
    let BranchId=this.BranchId;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "70%";
    dialogConfig.data = { BranchDeptId ,BranchId};
    this.dialog.open(BranchDepartmentFormComponent, dialogConfig).afterClosed().subscribe(res => {

      this.getBranchDepartment();
    });
  }

  onDelete(BranchDeptId)
  {
    this.confirm.openConfirmDialog('Are you sure about deleting?').afterClosed().subscribe(res=>{
      if(res){
        this.service.deleteDepartment(BranchDeptId).subscribe(res=>{
          this.notify.error('Deleted successfully');
          this.getBranchDepartment();
        })
      }
    })
  }




}
