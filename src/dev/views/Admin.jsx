import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import AdminHeader from '../components/admin/AdminHeader.jsx'
import ShopItemTimeForm from '../components/admin/ShopItemTimeForm.jsx'
import ShopItemCountForm from '../components/admin/ShopItemCountForm.jsx'
import UserList from '../components/admin/UserList.jsx'
import AdminList from '../components/admin/AdminList.jsx'
import CourseTypeList from '../components/admin/CourseTypeList.jsx'
import CourseList from '../components/admin/CourseList.jsx'
import InstructorList from '../components/admin/InstructorList.jsx'
import ShopList from '../components/admin/ShopList.jsx'
import SpecialCourseList from '../components/admin/SpecialCourseList.jsx'
import PlaceList from '../components/admin/PlaceList.jsx'
import InfoList from '../components/admin/InfoList.jsx'


class Admin extends React.Component {

 constructor(){
   super()
   this.allowShow = false;
 }

 static contextTypes = {
    router: React.PropTypes.object
  }

componentWillMount(){
}

componentWillUnmount(){
}

componentWillReceiveProps(nextProps){
  if(nextProps.currentUser.roles.admin === true){
    this.allowShow = true;
  }
}

  render() {
    if(this.props.currentUser.key === "0"){
      return <div/>
    }
    if(this.allowShow){
      return (
        <div>
          <AdminHeader />
          <AdminList />
          <InstructorList />
          <UserList />
          <InfoList />
          <ShopList />
          <PlaceList />
          <CourseTypeList />
          <CourseList />
          <SpecialCourseList />
        </div>
      )
    } else {
      return(
        <div>
          <p>Sinun pitää olla järjestelmän pääkäyttäjä.</p>
          <p>Ota yhteys järjestelmän valvojaan lisäoikeuksien saamiseksi.</p>
       </div>
      )
    }
  }
}

function mapStateToProps(state) {
  return { auth: state.auth, currentUser: state.currentUser }
}
export default connect(mapStateToProps, null)(Admin)
