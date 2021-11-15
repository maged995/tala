import { Component, OnInit, ViewChild } from '@angular/core';
import { ShiftsService } from '../../../../shared/shifts.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatTableDataSource, MatSort, MatPaginator, MatDialogConfig } from '@angular/material';
import { DialogService } from '../../../../shared/dialog.service';
import { NotificationService } from '../../../../shared/notification.service';
import { GroupsFormComponent } from '../../groups/groups-form/groups-form.component';

@Component({
  selector: 'ngx-shifts-list',
  templateUrl: './shifts-list.component.html',
  styleUrls: ['./shifts-list.component.css']
})
export class ShiftsListComponent implements OnInit {
  shiftId: number;
  Type: string;
  constructor(private service:ShiftsService,
    private route:Router,public dialog: MatDialog,
    private serviceShifts:ShiftsService,
    private activatedRoute:ActivatedRoute,
    private confirm:DialogService,private notify:NotificationService) { }

  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['OpenDate','OpenTime','CloseDate','CloseTime','EmployeeName','actions'];
  @ViewChild(MatSort,{static:true}) sort: MatSort;
  @ViewChild(MatPaginator,{static:true}) paginator: MatPaginator;
  searchKey: string;
x;
  ngOnInit() {



  this.getShifts();

  }



  getShifts(){
    this.Type=this.activatedRoute.snapshot.url[0].path;
    if(this.Type=="shifts")
    {
    this.service.getAllShifts().subscribe( (res:any)=>{
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

    this.service.getAnyShifts().subscribe((res:number)=>{
     
      if(res){
   
       this.shiftId=0;
      }
    else 
    {
    
      this.shiftId=1;
    }

    })
  }
else if (this.Type=="shiftsAdmin"){
  this.service.getShiftsForAllUser().subscribe( (res:any)=>{
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

  }
  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

  onCreateOrEdit(){
 
    this.serviceShifts.getAnyShifts().subscribe(res=>{
      if(res)
      {
       
        this.confirm.openConfirmDialog('هل انت متاكد من اغلاق الشيفت؟').afterClosed().subscribe(res=>{
          if(res){
            this.serviceShifts.deleteShifts().subscribe(result=>{
              this.notify.success('تم  الاضافه بنجاح');
               this.getShifts();        
            
            })
          }
    
        })
      }
    
      else 
      {
        this.confirm.openConfirmDialog('هل انت متاكد من فتح شيفت؟').afterClosed().subscribe(res=>{
          if(res){
            this.serviceShifts.postShift().subscribe(result=>{
              this.notify.success('تم  الاضافه بنجاح');
               this.getShifts();        
            
            })
          }
    
        })
      }
    })
  }

onShow(shiftId){
  this.route.navigateByUrl('/pages/basicData/treasuryShifts/'+shiftId)
}

showEmployee(){
  if(this.Type=="shiftsAdmin")
  {
    return null;
  }
  else 
  {
    return 'hidden-row';
  }
}
 

}
