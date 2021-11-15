import { Component, OnInit, ViewChild } from '@angular/core';
import { BranchesService } from '../../../../shared/branches.service';
import { Router } from '@angular/router';
import { MatDialog, MatTableDataSource, MatSort, MatPaginator, MatDialogConfig } from '@angular/material';
import { DialogService } from '../../../../shared/dialog.service';
import { NotificationService } from '../../../../shared/notification.service';
import { BranchesFormComponent } from '../branches-form/branches-form.component';


@Component({
  selector: 'ngx-branches-list',
  templateUrl: './branches-list.component.html',
  styles: []
})
export class BranchesListComponent implements OnInit {


  constructor(private service:BranchesService,
    private route:Router,public dialog: MatDialog,
    private confirm:DialogService,private notify:NotificationService) { }

  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['anothers','another','anotherActions','actions','BranchPhone','BranchAddress','BranchDesc'];
  @ViewChild(MatSort,{static:true}) sort: MatSort;
  @ViewChild(MatPaginator,{static:true}) paginator: MatPaginator;
  searchKey: string;

  ngOnInit() {
  this.getBranches();

  }

  getBranches(){
    this.service.getAllBranches().subscribe( (res:any)=>{
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

  onCreateOrEdit(BranchId){

 const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "70%";
    dialogConfig.data = { BranchId };
    this.dialog.open(BranchesFormComponent, dialogConfig).afterClosed().subscribe(res => {

      this.getBranches();
    });
  }

  onDelete(BranchId)
  {
    this.confirm.openConfirmDialog('Are you sure about deleting?').afterClosed().subscribe(res=>{
      if(res){
        this.service.deleteBranch(BranchId).subscribe(res=>{
          this.notify.error('Deleted successfully');
          this.getBranches();
        })
      }
    })
  }

  onSafes(BranchId){
this.route.navigateByUrl('/pages/basicData/safes/'+BranchId)
  }

  onDepartment(BranchId){
    this.route.navigateByUrl('/pages/basicData/branchDepartment/'+BranchId)
  }

  onClinics(BranchId)
  {
    this.route.navigateByUrl('/pages/basicData/clinics/'+BranchId)
  }

}
