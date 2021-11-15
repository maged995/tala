import { Component, OnInit, Inject } from '@angular/core';
import { UsersService } from '../../../../shared/users.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NotificationService } from '../../../../shared/notification.service';
import { Observable } from 'rxjs';
import { RolesService } from '../../../../shared/roles.service';

@Component({
  selector: 'ngx-users-roles-form',
  templateUrl: './users-roles-form.component.html',
  styleUrls: ['./users-roles-form.component.scss']
})
export class UsersRolesFormComponent implements OnInit {

roleList$:Observable<any>;
  submitted:boolean=false;

    constructor(
      public service:UsersService,public dialogRef: MatDialogRef<UsersRolesFormComponent>,
      @Inject(MAT_DIALOG_DATA) public data,private serviceRoles:RolesService,
      private notify:NotificationService) { }
  
    ngOnInit() {
     

this.service.userRolesForm;
this.service.userRolesForm.controls['UserId'].setValue(this.data.UserId);
this.roleList$=this.serviceRoles.getAllRoles();
  
  
    }
  
    get f(){
      return this.service.userRolesForm.controls;
    }
  
  
    onClose(){
      this.service.userRolesForm.reset();
      this.dialogRef.close();
    }
  
    onSubmit(){
     
  this.submitted=true;
  if(this.service.userRolesForm.invalid)
  {
  return;
  }
  else
  {
  var body={
  ...this.service.userRolesForm.value 
  }

console.log(body);    

    this.service.putRoles(body).subscribe(res=>{
    this.notify.success('تم التعديل بنجاح');
    this.service.userRolesForm.reset();
    this.dialogRef.close();
    })
  }
  }
    }


