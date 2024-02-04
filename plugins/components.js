
import Vue from 'vue'
import Toolbar from '~/components/global/Toolbar'
import ToolbarLanding from '~/components/global/ToolbarLanding'
import ChatBox from '~/components/global/ChatBox'

//login / registration
import DialogLogin from '~/components/global/DialogLogin'

//driver
import DriverRecords from '~/components/driver/records/records'
import DriverRecordsTable from '~/components/driver/records/table'
import DriverRecordsFilter from '~/components/driver/records/filter'
import DriverRecordsView from '~/components/driver/records/view'
import DriverRecordsChange from '~/components/driver/records/change'
import DriverRecordsReschedule from '~/components/driver/records/reschedule'

//customer
import CustomerBooking from '~/components/customer/booking/booking'
import CustomerBookingCreate from '~/components/customer/booking/createBooking'

import CustomerRecords from '~/components/customer/records/records'
import CustomerRecordFilter from '~/components/customer/records/recordFilter'
import CustomerRecordTable from '~/components/customer/records/recordTable'

import BusinessRegistration from '~/components/registration/businessRegistration'
import CustomerRegistration from '~/components/registration/customerRegistration'
import DriverRegistration from '~/components/registration/driverRegistration'

import Profile from '~/components/profile/profile'
import ProfileNavbar from '~/components/profile/profileNavbar'
import ProfileData from '~/components/profile/profileData'
import { Icon } from '@iconify/vue2';

const components = {
  //Global
  Toolbar,
  ToolbarLanding,
  ChatBox,

  DialogLogin,

  DriverRecords,
  DriverRecordsTable,
  DriverRecordsFilter,
  DriverRecordsView,
  DriverRecordsChange,
  DriverRecordsReschedule,

  CustomerBooking,
  CustomerBookingCreate,

  CustomerRecords,
  CustomerRecordFilter,
  CustomerRecordTable,

  BusinessRegistration,
  CustomerRegistration,
  DriverRegistration,

  Profile,
  ProfileNavbar,
  ProfileData,
  //Plugins
  Icon
}


Object.entries(components).forEach(([name, component]) => {
  Vue.component(name, component)
})
