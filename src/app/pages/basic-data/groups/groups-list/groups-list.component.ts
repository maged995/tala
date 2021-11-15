import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatTableDataSource, MatSort, MatPaginator, MatDialogConfig } from '@angular/material';

import { GroupsFormComponent } from '../groups-form/groups-form.component';
import { GroupsService } from '../../../../shared/groups.service';
import { DialogService } from '../../../../shared/dialog.service';
import { NotificationService } from '../../../../shared/notification.service';


@Component({
  selector: 'ngx-groups-list',
  templateUrl: './groups-list.component.html',
  styleUrls: ['./groups-list.component.scss']
})
export class GroupsListComponent implements OnInit {
  constructor(private service:GroupsService,
    private route:Router,public dialog: MatDialog,
    private confirm:DialogService,private notify:NotificationService) { }

  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['GroupDesc','actions'];
  @ViewChild(MatSort,{static:true}) sort: MatSort;
  @ViewChild(MatPaginator,{static:true}) paginator: MatPaginator;
  searchKey: string;

  ngOnInit() {
  this.getGroups();

  }

  getGroups(){
    this.service.getAllGroups().subscribe( (res:any)=>{
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

  onCreateOrEdit(GroupId){

 const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "70%";
    dialogConfig.data = { GroupId };
    this.dialog.open(GroupsFormComponent, dialogConfig).afterClosed().subscribe(res => {

      this.getGroups();
    });
  }

  onItem(GroupId)
  {
    this.route.navigateByUrl('/pages/basicData/items/'+GroupId)
  }
  onDelete(GroupId)
  {
    this.confirm.openConfirmDialog('هل انت متاكد من الحذف؟').afterClosed().subscribe(res=>{
      if(res){
        this.service.deleteGroup(GroupId).subscribe(res=>{
          this.notify.error('تم الحذف بنجاح');
          this.getGroups();
        })
      }
    })
  }

}
