
import Vue from 'vue'
import Toolbar from '~/components/global/Toolbar'
import ToolbarLanding from '~/components/global/ToolbarLanding'
import ChatBox from '~/components/global/ChatBox'
import GlobalProfile from '~/components/global/GlobalProfile'

//login / registration
import DialogLogin from '~/components/global/DialogLogin'

//driver
import DriverRecords from '~/components/driver/records/records'
import DriverRecordsTable from '~/components/driver/records/table'
import DriverRecordsFilter from '~/components/driver/records/filter'
import DriverRecordsView from '~/components/driver/records/view'
import DriverRecordsChange from '~/components/driver/records/change'
import DriverRecordsReschedule from '~/components/driver/records/reschedule'

//buiness
import BusinessRecords from '~/components/business/records/records'
import BusinessRecordsTable from '~/components/business/records/table'
import BusinessRecordsFilter from '~/components/business/records/filter'
import BusinessRecordsView from '~/components/business/records/view'
import BusinessRecordsChange from '~/components/business/records/change'
import BusinessRecordsReschedule from '~/components/business/records/reschedule'

//customer
import CustomerBooking from '~/components/customer/booking/booking'
import CustomerBookingCreate from '~/components/customer/booking/createBooking'

import CustomerRecords from '~/components/customer/records/records'
import CustomerRecordsTable from '~/components/customer/records/table'
import CustomerRecordsFilter from '~/components/customer/records/filter'
import CustomerRecordsView from '~/components/customer/records/view'
import CustomerRecordsPrice from '~/components/customer/records/price'
import CustomerRecordsRate from '~/components/customer/records/rate'

import BusinessRegistration from '~/components/registration/businessRegistration'
import CustomerRegistration from '~/components/registration/customerRegistration'
import DriverRegistration from '~/components/registration/driverRegistration'

import ProfileNavbar from '~/components/profile/profileNavbar'
//profile
import Profile from '~/components/profile/profile'
import ProfileProfile from '~/components/profile/profile/profileProfile'
import ProfileUpdateLicense from '~/components/profile/profile/updateLicensePicture'
import ProfileUpdateEmail from '~/components/profile/profile/updateEmail'
import ProfileUpdateContactNumber from '~/components/profile/profile/updateContactNumber'
//profile view
import ProfileView from '~/components/profile/viewProfile'

//security
import SecurityMain from '~/components/profile/security-main'
import ProfileSecurity from '~/components/profile/security/profileSecurity'
import DialogPassword from '~/components/profile/security/dialogPassword'
//vehicles
import VehiclesMain from '~/components/profile/vehicles-main'
import ProfileVehicle from '~/components/profile/vehicles/profileVehicles'
import DialogAddVehicle from '~/components/profile/vehicles/dialogAddVehicle'
import DialogEditVehicle from '~/components/profile/vehicles/dialogEditVehicle'
//subscription
import SubscriptionMain from '~/components/profile/subscription-main'
import ProfileSubscription from '~/components/profile/subscription/profileSubscription'
import ProfileSubscriptionChoices from '~/components/profile/subscription/profileSubscriptionChoices'
//ratings
import RatingsMain from '~/components/profile/ratings-main'
import ProfileRatings from '~/components/profile/ratings/profileRatings'
import ProfileRatingCommentStoreDialog from '~/components/profile/ratings/profileRatingCommentStoreDialog'
import ProfileRatingCommentUpdateDialog from '~/components/profile/ratings/profileRatingCommentUpdateDialog'
import { Icon } from '@iconify/vue2';

const components = {
  //Global
  Toolbar,
  ToolbarLanding,
  ChatBox,
  GlobalProfile,

  DialogLogin,

  DriverRecords,
  DriverRecordsTable,
  DriverRecordsFilter,
  DriverRecordsView,
  DriverRecordsChange,
  DriverRecordsReschedule,

  BusinessRecords,
  BusinessRecordsTable,
  BusinessRecordsFilter,
  BusinessRecordsView,
  BusinessRecordsChange,
  BusinessRecordsReschedule,

  CustomerBooking,
  CustomerBookingCreate,

  CustomerRecords,
  CustomerRecordsTable,
  CustomerRecordsFilter,
  CustomerRecordsView,
  CustomerRecordsPrice,
  CustomerRecordsRate,

  BusinessRegistration,
  CustomerRegistration,
  DriverRegistration,

  Profile,
  ProfileNavbar,
  ProfileProfile,
  ProfileUpdateLicense,
  ProfileUpdateEmail,
  ProfileUpdateContactNumber,

  ProfileView,

  SecurityMain,
  ProfileSecurity,
  DialogPassword,

  VehiclesMain,
  DialogAddVehicle,
  ProfileVehicle,
  DialogEditVehicle,

  SubscriptionMain,
  ProfileSubscription,
  ProfileSubscriptionChoices,
  
  RatingsMain,
  ProfileRatings,
  ProfileRatingCommentStoreDialog,
  ProfileRatingCommentUpdateDialog,
  //Plugins
  Icon
}


Object.entries(components).forEach(([name, component]) => {
  Vue.component(name, component)
})
