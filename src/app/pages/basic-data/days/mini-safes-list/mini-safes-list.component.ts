import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { DialogService } from '../../../../shared/dialog.service';
import { MiniSafesService } from '../../../../shared/mini-safes.service';
import { NotificationService } from '../../../../shared/notification.service';

@Component({
  selector: 'ngx-mini-safes-list',
  templateUrl: './mini-safes-list.component.html',
  styles: []
})
export class MiniSafesListComponent implements OnInit {
  MiniSafeId: number;
  Type: string;
  constructor(private service:MiniSafesService,
    private route:Router,public dialog: MatDialog,
   
    private activatedRoute:ActivatedRoute,
    private confirm:DialogService,private notify:NotificationService) { }

  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['MiniSafeCode','StartDate','StartTime','EndDate','EndTime','actions'];
  @ViewChild(MatSort,{static:true}) sort: MatSort;
  @ViewChild(MatPaginator,{static:true}) paginator: MatPaginator;
  searchKey: string;
x;
  ngOnInit() {
  this.getMiniSafes();
  }



  getMiniSafes(){
   

    this.service.getMiniSafesForEmployee().subscribe( (res:any)=>{
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

    this.service.checkSafes().subscribe((res:number)=>{
     
     this.MiniSafeId=res;

    })
 

  }
  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

  onCreateOrEdit(){
 
    this.service.checkSafes().subscribe((res:number)=>{
      if(res==1)
      {
       
        this.confirm.openConfirmDialog('هل انت متاكد من اغلاق الخزنه؟').afterClosed().subscribe(res=>{
          if(res){
            this.service.endSafes().subscribe(result=>{
              if(result==0)
              {
this.notify.error("لايمكن اغلاق الشيفت هناك فواتير خاضعه للاعتماد")
              }
              else 
              {
              this.notify.error('تم  الاغلاق بنجاح');
              }
               this.getMiniSafes();        
            
            })
          }
    
        })
      }
    
      else 
      {
        this.confirm.openConfirmDialog('هل انت متاكد من فتح الخزنه؟').afterClosed().subscribe(res=>{
          if(res){
            this.service.postMiniSafes().subscribe(result=>{
              this.notify.success('تم  فتح الخزنه بنجاح');
               this.getMiniSafes();        
            
            })
          }
    
        })
      }
    })
  }

onShow(MiniSafeId){
  this.route.navigateByUrl('/pages/basicData/miniSafeReports/'+MiniSafeId)
}


 

}
