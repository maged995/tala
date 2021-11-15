import { NbMenuItem } from '@nebular/theme';
import { roleMatch } from '../shared/roleMatch.roles';
import { NbMenuItemWithPermissions } from './pagesClass';

export const MENU_ITEMS: NbMenuItemWithPermissions[] = [

{
title:'basic information',
icon:'shopping-cart-outline',
children:[

  {
    title:'Sections and Functions',
    link:'/pages/basicData/departments',

  },
  {
    title:'Branches, clinics and storage',
    link:'/pages/basicData/branches'
  },

  {
    title:'Medicines and services',
    link:'/pages/basicData/items/1',
    hidden:!roleMatch(['PharmaAndServicsAndSupplies'])

  },
  {
    title:'employees',
    hidden:!roleMatch(['Employees']),
    children:[
      {
        title:'Doctor',
        link:'/pages/basicData/employees/1',


      },
      {
        title:'nurse',
        link:'/pages/basicData/employees/2',

      },
      {
        title:'Administrative',
        link:'/pages/basicData/employees/3',

      }
    ]
  },


  /*
  {
title:'الشيفتات اليومية',
link:'/pages/basicData/shifts',
hidden:!roleMatch(['Shifts'])
  },
*/
  {
    title:'customers',
    link:'/pages/basicData/customers',
    hidden:!roleMatch(['Customers'])
  },

  {
    title:'Reservation types',
    link:'/pages/basicData/reservations',
    hidden:!roleMatch(['ReservationType'])
  }
]
},
{
  title:'Today and the shift',
  icon: 'shopping-cart-outline',
children:[
  {
    title:'shift names',
    link:'/pages/basicData/shiftsTimes'
  },
  {
    title:'Daily opening and closing',
    link:'/pages/basicData/days'
  },
  {
    title:'Opening and closing a safe',
    link:'/pages/basicData/miniSafes'
  }
]
},
{
title:'Doctors reservation',
icon: 'shopping-cart-outline',
link:'/pages/basicData/doctorBooking',
},
  {
    title:'النقاط',
  icon: 'shopping-cart-outline',
  //hidden:!roleMatch(["CustomerPoints","OffersPoints"]),
hidden:true,
  children:[
    {
    title:'نقاط العملاء',
    link:'/pages/basicData/customerPoints',
    hidden:!roleMatch(["CustomerPoints"]),
    },
    {
      title:'عروض النقاط',
      link:'/pages/basicData/offers',
      hidden:!roleMatch(["OffersPoints"]),
    }
  ]
  },

{
  title:'الحجز',
  icon: 'shopping-cart-outline',
  //hidden:!roleMatch(["ReservationAndPayment","CustomerEntry"]),
  hidden:true,
  children:[
{
  title:'بداية الحجز',
  link:'/pages/basicData/toReservation',
  hidden:!roleMatch(["ReservationAndPayment"])
},
{
  title:'دفعات العملاء',
  link:'/pages/basicData/customerPayment/3',
  hidden:!roleMatch(["ReservationAndPayment"])
},
{
  title:'دخول العميل',
  link:'/pages/basicData/visitForm',
  hidden:!roleMatch(["CustomerEntry"])
}
  ]
},
{
  title:'اذون استلام وصرف وتحويل',
  icon: 'shopping-cart-outline',
 // hidden:!roleMatch(["AllInvoice","Inventory"]),
 hidden:true,
  children:[
{
  title:'اذن استلام',
  link:'/pages/basicData//invoiceMaster/8',
  hidden:!roleMatch(["AllInvoice"])
},
{
  title:'اذن صرف',
  link:'/pages/basicData//invoiceMaster/9',
  hidden:!roleMatch(["AllInvoice"])
},
{
  title:'اذن تحويل',
  link:'/pages/basicData//invoiceMaster/10',
  hidden:!roleMatch(["AllInvoice"])
},
{
  title:'المخزون',
  link:'/pages/basicData/inventory/2',
  hidden:!roleMatch(["Inventory"])
}
  ]
},

{
  title:'تقارير',
  icon: 'shopping-cart-outline',

  //hidden:!roleMatch(["CreditDeptCustomers","ShiftsAdmin","TreasuryDate"]),
  hidden:true,
  children:[
    {
title:'تقارير  القسم',
link:'/pages/basicData/DeptCustomerReports',
hidden:!roleMatch(["CreditDeptCustomers"]),
    },

{
  title:'تقارير العملاء',
  link:'/pages/basicData/customerReports',
  hidden:!roleMatch(["CreditDeptCustomers"]),
},

{


  title:'تقارير بالشيفتات اليوميه',
  link:'/pages/basicData/shiftsAdmin',
  hidden:!roleMatch(["ShiftsAdmin"]),
},
{
  title:'تقرير يوميه خزنه',
  link:'/pages/basicData/treasuryDate',
  hidden:!roleMatch(["TreasuryDate"]),
},
{
  title:'تقرير بدخل الخدمه خلال فتره معينه',
  link:'/pages/basicData/serviceQuantity',
  hidden:!roleMatch(["ServiceQuantity"])
}
  ]
},


  {
    title: 'الامان',
    icon: 'shopping-cart-outline',
  //hidden:!roleMatch(["UserRoles","Roles","RegisterNewUser"]),
  hidden:true,
    children: [
      {
title:"تغيير صلاحية المستخدمين",
link:'/pages/security/userRolesList',
hidden:!roleMatch(["UserRoles"])

      },
      {
      title:'رتب الامان',
      link:'/pages/security/roles',
    hidden:!roleMatch(["Roles"])
      },
      {
        title:'اضافة مستخدم جديد',
        link:'/users/register',
  hidden:!roleMatch(["RegisterNewUser"])
      }
    ],
  },




];




