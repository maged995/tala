import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { MatConfirmDialogComponent } from '../pages/mat-confirm-dialog/mat-confirm-dialog.component';
import { MatContentDialogComponent } from '../pages/mat-content-dialog/mat-content-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  openConfirmDialog(msg){
   return this.dialog.open(MatConfirmDialogComponent,{
      width: '390px',
      panelClass: 'confirm-dialog-container',
      disableClose: true,
      position: { top: "20px" },
      data :{
        message : msg
      }
    });
  }


  openContentDialog(msg){
    return this.dialog.open(MatContentDialogComponent,{
      width: '390px',
      panelClass: 'confirm-dialog-container',
      disableClose: true,
      position: { top: "20px" },
      data :{
        message : msg
      }
    });
  }
}
