import React from 'react'
import { Route, IndexRoute  } from 'react-router'

// Views
import Admin from './dev/views/Admin.jsx'
import Checkout from './dev/views/Checkout.jsx'
import Home from './dev/views/Home.jsx'
import Info from './dev/views/Info.jsx'
import Layout from './dev/views/Layout.jsx'
import Register from './dev/views/Register.jsx'
import Shop from './dev/views/Shop.jsx'
import User from './dev/views/User.jsx'
import UserProfile from './dev/views/UserProfile.jsx'
import ForgotPassword from './dev/views/ForgotPassword.jsx'

export default (
  <Route path="/" component={Layout}>
    <IndexRoute component={Home}></IndexRoute>
    <Route path="admin" component={Admin}></Route>
    <Route path="instructor" component={Instructor}></Route>
    <Route path="info" component={Info}></Route>
    <Route path="shop" component={Shop}></Route>
    <Route path="user" component={User}></Route>
    <Route path="userInformation" component={ChangeInformation}></Route>
    <Route path="register" component={Register}> </Route>
    <Route path="checkout" component={Checkout}> </Route>
    <Route path="specialCourses" component={SpecialCourses}></Route>
    <Route path="userProfile" component={UserProfile}></Route>
    <Route path="forgotPassword" component={ForgotPassword}></Route>
  </Route>
)
