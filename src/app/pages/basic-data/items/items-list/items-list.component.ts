import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ItemsService } from '../../../../shared/items.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatTableDataSource, MatSort, MatPaginator, MatDialogConfig } from '@angular/material';
import { DialogService } from '../../../../shared/dialog.service';
import { NotificationService } from '../../../../shared/notification.service';
import { DepartmentsFormComponent } from '../../departments/departments-form/departments-form.component';
import { ItemsFormComponent } from '../items-form/items-form.component';

@Component({
  selector: 'ngx-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.css']
})
export class ItemsListComponent implements OnInit,OnDestroy {
  GroupId;
  GroupDesc;
  constructor(private service:ItemsService,
    private route:Router,public dialog: MatDialog,private activateRoute:ActivatedRoute,
    private confirm:DialogService,private notify:NotificationService,private activeRoute:ActivatedRoute) { }
  ngOnDestroy(): void {
this.sub.unsubscribe();
  }
    sub;
  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['actions','DeptDescr','ItemDesc'];
  @ViewChild(MatSort,{static:true}) sort: MatSort;
  @ViewChild(MatPaginator,{static:true}) paginator: MatPaginator;
  searchKey: string;

  ngOnInit() {
    this.sub=this.activeRoute.params.subscribe(res=>{
      this.GroupId=this.activateRoute.snapshot.paramMap.get('id');
      this.getItems();
    })


  }

  getItems(){

    this.GroupId=this.activateRoute.snapshot.paramMap.get('id');
    this.service.getAllItems(this.GroupId).subscribe( (res:any)=>{
      this.listData = new MatTableDataSource(res.Items);
     this.GroupDesc=res.GroupDesc;
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

  onCreateOrEdit(ItemId){
let GroupId=this.GroupId;
 const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "70%";
    dialogConfig.data = { ItemId ,GroupId};
    this.dialog.open(ItemsFormComponent, dialogConfig).afterClosed().subscribe(res => {

      this.getItems();
    });
  }

  onBuy(){
    /*
    if(this.GroupId==2)
    {
      return null;
    }
    else
    {
      */
      return 'hidden-row';
      /*
    }
    */
  }

  onService(){

    if(this.GroupId==3)
    {
      return null;
    }
    else
    {

      return 'hidden-row';

    }

  }

  onPoints(){
    return 'hidden-row';
  }

  onDelete(ItemId)
  {
    this.confirm.openConfirmDialog('Are you sure about deleting?').afterClosed().subscribe(res=>{
      if(res){
        this.service.deleteItem(ItemId).subscribe(res=>{
          this.notify.error('Deleted successfully');
          this.getItems();
        })
      }
    })
  }

}
