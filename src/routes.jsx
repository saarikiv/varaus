import React from 'react'
import { Route, IndexRoute  } from 'react-router'

// Views
import Instructor from './dev/views/Instructor.jsx'
import Diagnostics from './dev/views/Diagnostics.jsx'
import Admin from './dev/views/Admin.jsx'
import Checkout from './dev/views/Checkout.jsx'
import PaytrailReturn from './dev/views/PaytrailReturn.jsx'
import PaytrailCancel from './dev/views/PaytrailCancel.jsx'
import Home from './dev/views/Home.jsx'
import Info from './dev/views/Info.jsx'
import Layout from './dev/views/Layout.jsx'
import Register from './dev/views/Register.jsx'
import Shop from './dev/views/Shop.jsx'
import SpecialCourses from './dev/views/SpecialCourses.jsx'
import User from './dev/views/User.jsx'
import Tests from './dev/views/Tests.jsx'
import UserProfile from './dev/views/UserProfile.jsx'
import ForgotPassword from './dev/views/ForgotPassword.jsx'
import Feedback from './dev/views/Feedback.jsx'
import UserOverview from './dev/views/UserOverview.jsx'
import LockedUser from './dev/views/LockedUser.jsx'

export default (
  <Route path="/" component={Layout}>
    <IndexRoute component={Home}></IndexRoute>
    <Route path="admin" component={Admin} />
    <Route path="instructor" component={Instructor} />
    <Route path="info" component={Info} />
    <Route path="shop" component={Shop} />
    <Route path="user" component={User} />
    <Route path="tests" component={Tests} />
    <Route path="register" component={Register} />
    <Route path="checkout" component={Checkout} />
    <Route path="paytrailreturn" component={PaytrailReturn} />
    <Route path="paytrailcancel" component={PaytrailCancel} />
    <Route path="specialCourses" component={SpecialCourses} />
    <Route path="userProfile" component={UserProfile} />
    <Route path="forgotPassword" component={ForgotPassword} />
    <Route path="diagnostics" component={Diagnostics} />
    <Route path="feedback" component={Feedback} />
    <Route path="useroverview" component={UserOverview} />
    <Route path="lockeduser" component={LockedUser} />
  </Route>
)
