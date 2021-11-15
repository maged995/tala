import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { BasicDataComponent } from './basic-data.component';
import { AuthGuard } from '../../auth/auth.guard';




import { DepartmentsListComponent } from './departments/departments-list/departments-list.component';
import { GroupsListComponent } from './groups/groups-list/groups-list.component';
import { ItemsListComponent } from './items/items-list/items-list.component';
import { JobsListComponent } from './jobs/jobs-list/jobs-list.component';
import { EmployeesListComponent } from './employees/employees-list/employees-list.component';
import { CustomersListComponent } from './customers/customers-list/customers-list.component';
import { ClinicsListComponent } from './clinics/clinics-list/clinics-list.component';
/*
import { ClinicAppoinmentsComponent } from './clinic-appoinments/clinic-appoinments.component';
*/
import { Path } from 'leaflet';
/*
import { ClinicAppoinmentsListComponent } from './clinic-appoinments/clinic-appoinments-list/clinic-appoinments-list.component';
import { ClinicReservationListComponent } from './clinic-reservation/clinic-reservation-list/clinic-reservation-list.component';
*/
import { ReservationFromComponent } from './reservation/reservation-from/reservation-from.component';
import { ReservationListComponent } from './reservation/reservation-list/reservation-list.component';
import { ReservationTypeListComponent } from './reservation-type/reservation-type-list/reservation-type-list.component';
import { TestFromComponent } from './test/test-from/test-from.component';
import { ItemsComponent } from './items/items.component';
/*
import { ClinicReservationDayComponent } from './clinic-reservation/clinic-reservation-day/clinic-reservation-day.component';
*/
import { CustomerPaymentComponent } from './customer-payment/customer-payment.component';
import { CustomerPaymentListComponent } from './customer-payment/customer-payment-list/customer-payment-list.component';
/*
import { VisitMasterFormComponent } from './visit-master/visit-master-form/visit-master-form.component';
import { VisitMasterReportComponent } from './visit-master/visit-master-report/visit-master-report.component';
*/
import { CustomersFormComponent } from './customers/customers-form/customers-form.component';
import { CustomersAccountReportsComponent } from './customers-account/customers-account-reports/customers-account-reports.component';
import { CustomerPaymentReportsComponent } from './customer-payment/customer-payment-reports/customer-payment-reports.component';
/*
import { ClinicReservationDayListComponent } from './clinic-reservation/clinic-reservation-day-list/clinic-reservation-day-list.component';
import { VisitMedicineReportsComponent } from './clinic-reservation/visit-master/visit-medicine-reports/visit-medicine-reports.component';
*/
import { InvoiceMasterListComponent } from './invoice-master/invoice-master-list/invoice-master-list.component';
import { InvoiceMasterFormComponent } from './invoice-master/invoice-master-form/invoice-master-form.component';
import { InvoiceMasterReportsComponent } from './invoice-master/invoice-master-reports/invoice-master-reports.component';
import { InventoryComponent } from './invoice-master/inventory/inventory.component';
import { InventoryListComponent } from './invoice-master/inventory/inventory-list/inventory-list.component';
import { ShiftsListComponent } from './shifts/shifts-list/shifts-list.component';
import { TreasuryShiftReportComponent } from './treasury/treasury-shift-report/treasury-shift-report.component';
import { CustomerPointsService } from '../../shared/customer-points.service';
/*
import { CustomerPointsListComponent } from './customer-points/customer-points-list/customer-points-list.component';
import { CustomerPointsOneComponent } from './customer-points/customer-points-one/customer-points-one.component';
import { ClinicReservationReportsComponent } from './clinic-reservation/clinic-reservation-reports/clinic-reservation-reports.component';
import { OffersListComponent } from './offers/offers-list/offers-list.component';
*/
import { CustomerReportsComponent } from './customer-reports/customer-reports.component';
import { CustomerVisitReportsComponent } from './customer-reports/customer-visit-reports/customer-visit-reports.component';
import { TreasuryDateComponent } from './treasury/treasury-date/treasury-date.component';
import { TreasuryDateListComponent } from './treasury/treasury-date-list/treasury-date-list.component';
import { DeptCustomerReportsComponent } from './customer-reports/dept-customer-reports/dept-customer-reports.component';
import { CustomerOnlineActiveComponent } from './customer-online/customer-online-active/customer-online-active.component';
import { CustomerOnlineNonActiveComponent } from './customer-online/customer-online-non-active/customer-online-non-active.component';
/*
import { VisitServiceQuantityReportsComponent } from './visit-master/visit-service-quantity-reports/visit-service-quantity-reports.component';
*/
import { BranchesListComponent } from './branches/branches-list/branches-list.component';
import { SafesListComponent } from './safes/safes-list/safes-list.component';
import { BranchDepartmentListComponent } from './branch-department/branch-department-list/branch-department-list.component';
import { ShiftsTimesComponent } from './shifts-times/shifts-times/shifts-times.component';
import { DaysListComponent } from './days/days-list/days-list.component';
import { MiniSafesListComponent } from './days/mini-safes-list/mini-safes-list.component';
import { DaysReportsComponent } from './days/days-list/days-reports/days-reports.component';
import { RunningShiftReportsComponent } from './days/running-shift-reports/running-shift-reports.component';
import { MiniSafesReportsComponent } from './days/mini-safes-list/mini-safes-reports/mini-safes-reports.component';
import { DoctorBookingListComponent } from './doctor-booking/doctor-booking-list/doctor-booking-list.component';

const routes: Routes = [{
  path: '',
  component: BasicDataComponent,
  canActivate:[AuthGuard],
  children: [
    {
path:'doctorBooking',
component:DoctorBookingListComponent
    },
    {
      path:'miniSafeReports/:id',
      component:MiniSafesReportsComponent
    },
    {
path:'runningShiftsReports/:id',
component:RunningShiftReportsComponent
    },
    {
path:'daysReports/:id',
component:DaysReportsComponent
    },
    {
path:'miniSafes',
component:MiniSafesListComponent
    },
    {
path:'days',
component:DaysListComponent
    },
    {
path:'shiftsTimes',
component:ShiftsTimesComponent
    },
    {
path:'branches',
component:BranchesListComponent
    },
    {
path:'safes/:id',
component:SafesListComponent
    },
    {
path:'branchDepartment/:id',
component:BranchDepartmentListComponent
    },
    /*
    {
path:'serviceQuantity',
component:VisitServiceQuantityReportsComponent
    },
    */
    {
      path:'customerOnlineNonActive/:id',
component:CustomerOnlineNonActiveComponent
    },
    {
path:'customerOnlineActive/:id',
component:CustomerOnlineActiveComponent,

    },
    {
      path:'DeptCustomer/:DeptId',
      component:DeptCustomerReportsComponent,
      canActivate:[AuthGuard],
    },
    {
path:'DeptCustomerReports',
component:CustomerReportsComponent,
canActivate:[AuthGuard],
    },
    {
path:'treasuryDateList/:CompareDate',
component:TreasuryDateListComponent,
canActivate:[AuthGuard],
    },
    {
      path:"treasuryDate",
      component:TreasuryDateComponent,
      canActivate:[AuthGuard],
    },
    {
path:'customerVisitByDept/:CustomerId/:DeptId',
component:CustomerVisitReportsComponent,
canActivate:[AuthGuard],

    },

    {
path:'customerReports',
component:CustomerReportsComponent,
canActivate:[AuthGuard],
    },
    /*
{
path:'offers',
component:OffersListComponent,
canActivate:[AuthGuard],
},

    {
      path:'clinicrReservationReports/:id',
      component:ClinicReservationReportsComponent,
      canActivate:[AuthGuard],
    },
    
    {
      path:'customerPoint/:id',
      component:CustomerPointsOneComponent,
      canActivate:[AuthGuard],
    },
    
    {
      path:'customerPoints',
      component:CustomerPointsListComponent,
      canActivate:[AuthGuard],
    },
 */
    {
path:'treasuryShifts/:id',
component:TreasuryShiftReportComponent,
canActivate:[AuthGuard],
    },
    {
path:'shiftsAdmin',
component:ShiftsListComponent,
canActivate:[AuthGuard],
    },
    {
path:'shifts',
component:ShiftsListComponent,
canActivate:[AuthGuard],
    },
    {
path:'invoiceReports/:id',
component:InvoiceMasterReportsComponent,
canActivate:[AuthGuard],
    },
    {
path:"invoiceAdd/:id",
component:InvoiceMasterFormComponent,
canActivate:[AuthGuard],
  },
    {
path:'invoiceMaster/:id',
component:InvoiceMasterListComponent,
canActivate:[AuthGuard],
    },
    {
      path:'customerPaymnentReport/:id',
      component:CustomerPaymentReportsComponent,
      canActivate:[AuthGuard],
    },
    {
path:'customerAccountReports/:CustomerId/:DeptId',
component:CustomersAccountReportsComponent,
canActivate:[AuthGuard],
    },
    {
path:'CustomersAdd',
component:CustomersFormComponent,
canActivate:[AuthGuard],
    },
    {
      path:'CustomersEdit/:id',
      component:CustomersFormComponent,
      canActivate:[AuthGuard],
    },
    /*
    {
path:'visitReport/:id',
component:VisitMasterReportComponent,
canActivate:[AuthGuard],
    },
    {
path:'visitForm',
component:VisitMasterFormComponent,
canActivate:[AuthGuard],
    },
    {
      path:'visitMediciceReports/:id',
      component:VisitMedicineReportsComponent,
      canActivate:[AuthGuard],
        },
        */
    {
path:'customerPayment',
component:CustomerPaymentComponent,
canActivate:[AuthGuard],
children:[
  
  {
    path:":id",
    component:CustomerPaymentListComponent,
    canActivate:[AuthGuard],
  }
]
    },
    /*
    {
      path:'toReservation',
      component:ClinicReservationDayComponent,
      canActivate:[AuthGuard],
    },
    {
      path:'Reservation/:ClinicAppoinmentId/:CheckDate',
      component:ClinicReservationDayListComponent,
      canActivate:[AuthGuard],
    },
*/
    {
path:'reservationType/:id',
component:ReservationTypeListComponent,
canActivate:[AuthGuard]
    },
    
    {
path:'reservations',
component:ReservationListComponent,
canActivate:[AuthGuard]
    },
    /*
    {
      path:'clinicReservation/:id',
      component:ClinicReservationListComponent,
      canActivate:[AuthGuard]
    },
  
*/
   
    {
      path:'departments',
      component:DepartmentsListComponent,
      canActivate:[AuthGuard]
    },
    {
      path:'groups',
      component:GroupsListComponent,
      canActivate:[AuthGuard]
    },
    {
      path:'items',
      component:ItemsComponent,
      canActivate:[AuthGuard],
      children:[
        {
          path:':id',
          component:ItemsListComponent,
          canActivate:[AuthGuard]
        }
      ]
    },
    {
      path:'inventory',
      component:InventoryComponent,
      canActivate:[AuthGuard],
      children:[
        {
          path:':id',
          component:InventoryListComponent,
          canActivate:[AuthGuard]
        }
      ]
    },
    {
      path:'jobs/:id',
      component:JobsListComponent,
      canActivate:[AuthGuard]
    },
    {
path:'clinics/:id',
component:ClinicsListComponent,
canActivate:[AuthGuard]
    },
    /*
    {
      path:'clinicAppoinment/:id',
      component:ClinicAppoinmentsListComponent,
      canActivate:[AuthGuard],
     
    
      

    },
    */
    {
      path:'employees/:id',
      component:EmployeesListComponent,
      canActivate:[AuthGuard],
    },
    {
      path:'customers',
      component:CustomersListComponent,
      canActivate:[AuthGuard],

    }
  
 
   
  
  ],
}];


@NgModule({
  imports: [RouterModule.forChild(routes) ],
  exports: [RouterModule],
})
export class BasicDataRoutingModule { }
