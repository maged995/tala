import { Component, OnInit, ViewChild } from '@angular/core';
import { ClinicsService } from '../../../../shared/clinics.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DialogService } from '../../../../shared/dialog.service';
import { NotificationService } from '../../../../shared/notification.service';
import { MatDialog, MatTableDataSource, MatSort, MatPaginator, MatDialogConfig } from '@angular/material';
import { ClinicsFormComponent } from '../clinics-form/clinics-form.component';


@Component({
  selector: 'ngx-clinics-list',
  templateUrl: './clinics-list.component.html',
  styles: []
})
export class ClinicsListComponent implements OnInit {

  constructor(private service:ClinicsService,
    private route:Router,private activateRoute:ActivatedRoute,
    private confirm:DialogService,private notify:NotificationService,public dialog: MatDialog) { }
    BranchId;
  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['actions','ClinicDesc'];
  @ViewChild(MatSort,{static:true}) sort: MatSort;
  @ViewChild(MatPaginator,{static:true}) paginator: MatPaginator;
  searchKey: string;
  BranchDesc;
  ngOnInit() {
  this.getClinics();

  }

  getClinics(){
    this.BranchId=this.activateRoute.snapshot.paramMap.get('id');

    this.service.getAllClinicsByDept(this.BranchId).subscribe( (res:any)=>{
      this.BranchDesc=res.BranchDesc;
      this.listData = new MatTableDataSource(res.clinics);

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

  onCreateOrEdit(ClinicId){
    let BranchId=this.BranchId;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "70%";
    dialogConfig.data = { ClinicId,BranchId };
    this.dialog.open(ClinicsFormComponent, dialogConfig).afterClosed().subscribe(res => {

      this.getClinics();
    });
  }

  onClinicReservation(ClinicId)
  {
    this.route.navigateByUrl('pages/basicData/clinicReservation/'+ ClinicId);
  }

  onDelete(ClinicId)
  {
    this.confirm.openConfirmDialog('Are you sure about deleting?').afterClosed().subscribe(res=>{
      if(res){
        this.service.deleteClinic(ClinicId).subscribe(res=>{
          this.notify.error('Deleted successfully');
          this.getClinics();
        })
      }
    })
  }

  onClinicAppoinments(ClinicId)
  {
    this.route.navigateByUrl('pages/basicData/clinicAppoinment/'+ ClinicId)
  }


}
