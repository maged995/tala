import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicDataComponent } from './basic-data.component';
import { BasicDataRoutingModule } from './basic-data-routing.module';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../material/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { ChartsModule } from 'ng2-charts';

import{NgxPrintModule}from'ngx-print';
import { DepartmentsListComponent } from './departments/departments-list/departments-list.component';
import { DepartmentsFormComponent } from './departments/departments-form/departments-form.component';
import { GroupsListComponent } from './groups/groups-list/groups-list.component';
import { GroupsFormComponent } from './groups/groups-form/groups-form.component';
import { ItemsFormComponent } from './items/items-form/items-form.component';
import { ItemsListComponent } from './items/items-list/items-list.component';
import { JobsFormComponent } from './jobs/jobs-form/jobs-form.component';
import { JobsListComponent } from './jobs/jobs-list/jobs-list.component';
import { EmployeesListComponent } from './employees/employees-list/employees-list.component';
import { EmployeesFormComponent } from './employees/employees-form/employees-form.component';
import { CustomersFormComponent } from './customers/customers-form/customers-form.component';
import { CustomersListComponent } from './customers/customers-list/customers-list.component';
import { ClinicsListComponent } from './clinics/clinics-list/clinics-list.component';
import { ClinicsFormComponent } from './clinics/clinics-form/clinics-form.component';
/*
import { ClinicAppoinmentsComponent } from './clinic-appoinments/clinic-appoinments.component';
import { ClinicAppoinmentsListComponent } from './clinic-appoinments/clinic-appoinments-list/clinic-appoinments-list.component';
import { ClinicAppoinmentsFormComponent } from './clinic-appoinments/clinic-appoinments-form/clinic-appoinments-form.component';


import { ClinicReservationFormComponent } from './clinic-reservation/clinic-reservation-form/clinic-reservation-form.component';
import { ClinicReservationListComponent } from './clinic-reservation/clinic-reservation-list/clinic-reservation-list.component';
*/
import { FlatpickrModule } from 'angularx-flatpickr';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { DemoUtilsModule } from '../../shared/demo-utils/module';
import { ReservationListComponent } from './reservation/reservation-list/reservation-list.component';
import { ReservationFromComponent } from './reservation/reservation-from/reservation-from.component';
import { ReservationTypeFromComponent } from './reservation-type/reservation-type-from/reservation-type-from.component';
import { ReservationTypeListComponent } from './reservation-type/reservation-type-list/reservation-type-list.component';
import { TestFromComponent } from './test/test-from/test-from.component';
import { ItemsComponent } from './items/items.component';
/*
import { ClinicReservationDayComponent } from './clinic-reservation/clinic-reservation-day/clinic-reservation-day.component';
*/
import { CustomerPaymentComponent } from './customer-payment/customer-payment.component';
import { CustomerPaymentListComponent } from './customer-payment/customer-payment-list/customer-payment-list.component';
import { CustomerPaymentFormComponent } from './customer-payment/customer-payment-form/customer-payment-form.component';
/*
import { VisitMasterFormComponent } from './visit-master/visit-master-form/visit-master-form.component';
import { CustomerDiseasesListComponent } from './visit-master/customer-diseases/customer-diseases-list/customer-diseases-list.component';
import { CustomerDiseasesFormComponent } from './visit-master/customer-diseases/customer-diseases-form/customer-diseases-form.component';
import { OldVisitMasterListComponent } from './visit-master/old-visit-master/old-visit-master-list/old-visit-master-list.component';
import { VisitDiagonsisComponent } from './visit-master/visit-diagonsis/visit-diagonsis.component';
import { VisitMedicineComponent } from './visit-master/visit-medicine/visit-medicine.component';
import { VisitServiceComponent } from './visit-master/visit-service/visit-service.component';
import { CustomerTeethVisitComponent } from './visit-master/customer-teeth-visit/customer-teeth-visit.component';
import { CustomerTeethVisitFormComponent } from './visit-master/customer-teeth-visit/customer-teeth-visit-form/customer-teeth-visit-form.component';
import { VisitMasterReportComponent } from './visit-master/visit-master-report/visit-master-report.component';
*/
import { CustomersDetailsComponent } from './customers/customers-details/customers-details.component';
import { CustomersAccountReportsComponent } from './customers-account/customers-account-reports/customers-account-reports.component';
import { CustomerPaymentReportsComponent } from './customer-payment/customer-payment-reports/customer-payment-reports.component';
/*
import { ClinicReservationReportsComponent } from './clinic-reservation/clinic-reservation-reports/clinic-reservation-reports.component';
import { ClinicReservationDayListComponent } from './clinic-reservation/clinic-reservation-day-list/clinic-reservation-day-list.component';
import { ReservationComponent } from './clinic-reservation/clinic-reservation-day-list/reservation/reservation.component';
import { WaitingListComponent } from './clinic-reservation/clinic-reservation-day-list/waiting-list/waiting-list.component';
import { VisitMedicineReportsComponent } from './clinic-reservation/visit-master/visit-medicine-reports/visit-medicine-reports.component';
*/
import { InvoiceMasterListComponent } from './invoice-master/invoice-master-list/invoice-master-list.component';
import { InvoiceMasterFormComponent } from './invoice-master/invoice-master-form/invoice-master-form.component';
import { InvoiceMasterDetailsComponent } from './invoice-master/invoice-master-details/invoice-master-details.component';
import { InvoiceMasterReportsComponent } from './invoice-master/invoice-master-reports/invoice-master-reports.component';
import { InventoryComponent } from './invoice-master/inventory/inventory.component';
import { InventoryListComponent } from './invoice-master/inventory/inventory-list/inventory-list.component';
import { ShiftsListComponent } from './shifts/shifts-list/shifts-list.component';
import { TreasuryShiftReportComponent } from './treasury/treasury-shift-report/treasury-shift-report.component';
/*
import { CustomerPointsListComponent } from './customer-points/customer-points-list/customer-points-list.component';
import { CustomerPointsOneComponent } from './customer-points/customer-points-one/customer-points-one.component';
import { OffersListComponent } from './offers/offers-list/offers-list.component';
import { OffersFormComponent } from './offers/offers-form/offers-form.component';
import { CustomerPointsOffersComponent } from './customer-points/customer-points-offers/customer-points-offers.component';
import { AttendanceComponent } from './clinic-reservation/clinic-reservation-day-list/attendance/attendance.component';
*/
import { CustomerReportsComponent } from './customer-reports/customer-reports.component';
import { CustomerVisitReportsComponent } from './customer-reports/customer-visit-reports/customer-visit-reports.component';
import { TreasuryDateComponent } from './treasury/treasury-date/treasury-date.component';
import { TreasuryDateListComponent } from './treasury/treasury-date-list/treasury-date-list.component';
/*
import { VisitServiceReportsComponent } from './visit-master/visit-service-reports/visit-service-reports.component';
*/
import { DeptCustomerReportsComponent } from './customer-reports/dept-customer-reports/dept-customer-reports.component';
import { CustomerOnlineActiveComponent } from './customer-online/customer-online-active/customer-online-active.component';
import { CustomerOnlineFormComponent } from './customer-online/customer-online-form/customer-online-form.component';
import { CustomerOnlineNonActiveComponent } from './customer-online/customer-online-non-active/customer-online-non-active.component';
/*
import { VisitServiceQuantityReportsComponent } from './visit-master/visit-service-quantity-reports/visit-service-quantity-reports.component';
*/
import { BranchesListComponent } from './branches/branches-list/branches-list.component';
import { SafesListComponent } from './safes/safes-list/safes-list.component';
import { SafesFormComponent } from './safes/safes-form/safes-form.component';
import { BranchesFormComponent } from './branches/branches-form/branches-form.component';
import { BranchDepartmentListComponent } from './branch-department/branch-department-list/branch-department-list.component';
import { BranchDepartmentFormComponent } from './branch-department/branch-department-form/branch-department-form.component';
import { ShiftsTimesComponent } from './shifts-times/shifts-times/shifts-times.component';
import { ShiftsTimesFormComponent } from './shifts-times/shifts-times-form/shifts-times-form.component';
import { DaysListComponent } from './days/days-list/days-list.component';
import { RunningShiftsFormComponent } from './days/running-shifts-form/running-shifts-form.component';
import { MiniSafesListComponent } from './days/mini-safes-list/mini-safes-list.component';
import { DaysReportsComponent } from './days/days-list/days-reports/days-reports.component';
import { RunningShiftReportsComponent } from './days/running-shift-reports/running-shift-reports.component';
import { MiniSafesReportsComponent } from './days/mini-safes-list/mini-safes-reports/mini-safes-reports.component';
import { DoctorBookingFormComponent } from './doctor-booking/doctor-booking-form/doctor-booking-form.component';
import { DoctorBookingListComponent } from './doctor-booking/doctor-booking-list/doctor-booking-list.component';
import { SafesReportsComponent } from './safes/safes-reports/safes-reports.component';


@NgModule({
  declarations: [BasicDataComponent,
DepartmentsListComponent,DepartmentsFormComponent, GroupsListComponent, GroupsFormComponent, ItemsFormComponent, ItemsListComponent, JobsFormComponent, JobsListComponent, EmployeesListComponent, EmployeesFormComponent, CustomersFormComponent, CustomersListComponent, 
ClinicsListComponent, ClinicsFormComponent,
/*
ClinicAppoinmentsComponent, 
ClinicAppoinmentsListComponent, ClinicAppoinmentsFormComponent, ClinicReservationFormComponent,
 ClinicReservationListComponent,
 */
 ReservationListComponent, ReservationFromComponent, 
 ReservationTypeFromComponent, ReservationTypeListComponent, TestFromComponent, ItemsComponent
 /*
 , ClinicReservationDayComponent, 
 */
 ,CustomerPaymentComponent, 
 CustomerPaymentListComponent, CustomerPaymentFormComponent,
/*
  VisitMasterFormComponent, CustomerDiseasesListComponent, 
  CustomerDiseasesFormComponent, OldVisitMasterListComponent, VisitDiagonsisComponent, 
  VisitMedicineComponent, VisitServiceComponent, CustomerTeethVisitComponent, 
  CustomerTeethVisitFormComponent, VisitMasterReportComponent, 
  */
  CustomersDetailsComponent, 
  CustomersAccountReportsComponent, CustomerPaymentReportsComponent,
/*
   ClinicReservationReportsComponent, ClinicReservationDayListComponent, 
   ReservationComponent, WaitingListComponent, VisitMedicineReportsComponent,
   */
   BranchesListComponent,BranchesFormComponent,SafesListComponent,SafesFormComponent,
     InvoiceMasterListComponent, InvoiceMasterFormComponent, InvoiceMasterDetailsComponent, InvoiceMasterReportsComponent, InventoryComponent, InventoryListComponent,
       ShiftsListComponent, TreasuryShiftReportComponent,
       /*
       CustomerPointsListComponent, CustomerPointsOneComponent, OffersListComponent, OffersFormComponent,
       stomerPointsOffersComponent, AttendanceComponent,
       */
       CustomerReportsComponent, CustomerVisitReportsComponent, TreasuryDateComponent, TreasuryDateListComponent, 
       /*VisitServiceReportsComponent,
       */
       DeptCustomerReportsComponent, CustomerOnlineActiveComponent, CustomerOnlineFormComponent, CustomerOnlineNonActiveComponent, 
       /*
       VisitServiceQuantityReportsComponent,
       */
       BranchDepartmentListComponent, BranchDepartmentFormComponent
      ,ShiftsTimesComponent,ShiftsTimesFormComponent,DaysListComponent,RunningShiftsFormComponent,
      MiniSafesListComponent,DaysReportsComponent,RunningShiftReportsComponent,
      MiniSafesReportsComponent,
      DoctorBookingFormComponent,
      SafesReportsComponent,
      DoctorBookingListComponent
         ],
  imports: [
    DemoUtilsModule,
    CommonModule,
    BasicDataRoutingModule,
   ChartsModule,
    RouterModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    NgSelectModule,
    NgxPrintModule,
    NgbModule,
    FlatpickrModule.forRoot(),
    
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    
    
    

  ],
  entryComponents:[
   DepartmentsFormComponent,GroupsFormComponent,ItemsFormComponent,JobsFormComponent,EmployeesFormComponent,
   ClinicsFormComponent,
   /*
   ClinicAppoinmentsFormComponent,ClinicReservationFormComponent,
   */
   ReservationFromComponent,ReservationTypeFromComponent,CustomerPaymentFormComponent
   
   ,
   /*
   CustomerDiseasesFormComponent
,VisitDiagonsisComponent,VisitMedicineComponent,VisitServiceComponent,
CustomerTeethVisitComponent,CustomerTeethVisitFormComponent,
*/
BranchDepartmentFormComponent,
CustomersDetailsComponent,InvoiceMasterDetailsComponent,
/*
OffersFormComponent
,CustomerPointsOffersComponent,
*/
CustomerOnlineFormComponent,BranchesFormComponent,SafesFormComponent,
ShiftsTimesFormComponent,RunningShiftsFormComponent,DoctorBookingFormComponent
  ]
})
export class BasicDataModule { }
