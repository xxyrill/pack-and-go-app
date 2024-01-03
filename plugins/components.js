
import Vue from 'vue'
import Toolbar from '~/components/global/Toolbar'
import ToolbarLanding from '~/components/global/ToolbarLanding'

//login / registration
import DialogLogin from '~/components/global/DialogLogin'

//driver
import DriverRecordsTable from '~/components/driver/records/table'
import DriverRecordsFilter from '~/components/driver/records/filter'

//customer
import CustomerBooking from '~/components/customer/booking/booking'
import CustomerBookingCreate from '~/components/customer/booking/createBooking'

import CustomerRecords from '~/components/customer/records/records'
import CustomerRecordFilter from '~/components/customer/records/recordFilter'
import CustomerRecordTable from '~/components/customer/records/recordTable'

import CustomerProfile from '~/components/customer/profile/profile'
import CustomerProfileNavbar from '~/components/customer/profile/profileNavbar'
import { Icon } from '@iconify/vue2';

const components = {
  //Global
  Toolbar,
  ToolbarLanding,

  DialogLogin,

  DriverRecordsTable,
  DriverRecordsFilter,

  CustomerBooking,
  CustomerBookingCreate,

  CustomerRecords,
  CustomerRecordFilter,
  CustomerRecordTable,

  CustomerProfile,
  CustomerProfileNavbar,

  //Plugins
  Icon
}


Object.entries(components).forEach(([name, component]) => {
  Vue.component(name, component)
})
