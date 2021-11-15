import { Component, OnInit, ViewChild } from '@angular/core';
import { SafesService } from '../../../../shared/safes.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DialogService } from '../../../../shared/dialog.service';
import { NotificationService } from '../../../../shared/notification.service';
import { MatDialog, MatTableDataSource, MatSort, MatPaginator, MatDialogConfig } from '@angular/material';
import { SafesFormComponent } from '../safes-form/safes-form.component';


@Component({
  selector: 'ngx-safes-list',
  templateUrl: './safes-list.component.html',
  styles: []
})
export class SafesListComponent implements OnInit {

  constructor(private service:SafesService,
    private route:Router,
    private confirm:DialogService,private notify:NotificationService,private activateRoute:ActivatedRoute
    ,public dialog: MatDialog) { }

  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['actions','SafeName'];
  @ViewChild(MatSort,{static:true}) sort: MatSort;
  @ViewChild(MatPaginator,{static:true}) paginator: MatPaginator;
  searchKey: string;
  BranchId;
  BranchDesc
  ngOnInit() {
  this.getSafes();

  }

  getSafes(){
    this.BranchId=this.activateRoute.snapshot.paramMap.get('id');
    this.service.getAllSafes(this.BranchId).subscribe( (res:any)=>{
      this.BranchDesc=res.branchDesc;
      this.listData = new MatTableDataSource(res.safes);

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

  onCreateOrEdit(SafeId){
    let BranchId=this.BranchId;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "70%";
    dialogConfig.data = { SafeId ,BranchId};
    this.dialog.open(SafesFormComponent, dialogConfig).afterClosed().subscribe(res => {

      this.getSafes();
    });
  }

  onDelete(SafeId)
  {
    this.confirm.openConfirmDialog('Are you sure about deleting?').afterClosed().subscribe(res=>{
      if(res){
        this.service.deleteSafe(SafeId).subscribe(res=>{
          this.notify.error('Deleted successfully');
          this.getSafes();
        })
      }
    })
  }



}
