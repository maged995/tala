import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { InvoiceMasterService } from '../../../../../shared/invoice-master.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DialogService } from '../../../../../shared/dialog.service';
import { NotificationService } from '../../../../../shared/notification.service';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { ItemStoresService } from '../../../../../shared/item-stores.service';

@Component({
  selector: 'ngx-inventory-list',
  templateUrl: './inventory-list.component.html',
  styles: []
})
export class InventoryListComponent implements OnInit,OnDestroy {

  DeptId;
  
  constructor(private service:ItemStoresService,
    private route:Router,private activateRoute:ActivatedRoute,
    private confirm:DialogService,private notify:NotificationService,private activeRoute:ActivatedRoute) { }
  ngOnDestroy(): void {
this.sub.unsubscribe();
  }
    sub;
  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['Item','Balance'];
  @ViewChild(MatSort,{static:true}) sort: MatSort;
  @ViewChild(MatPaginator,{static:true}) paginator: MatPaginator;
  searchKey: string;

  ngOnInit() {
    this.sub=this.activeRoute.params.subscribe(res=>{
      this.DeptId=this.activateRoute.snapshot.paramMap.get('id');
      this.getItems();
    })


  }

  getItems(){
    
    this.DeptId=this.activateRoute.snapshot.paramMap.get('id');
    this.service.getByDept(this.DeptId).subscribe( (res:any)=>{
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




  

}
