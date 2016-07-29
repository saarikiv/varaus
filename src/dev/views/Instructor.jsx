import React from 'react'
import { connect } from 'react-redux'

import InstructorHeader from '../components/instructor/InstructorHeader.jsx'
import CoursesList from '../components/instructor/CoursesList.jsx'
import CoursesDetails from '../components/instructor/CourseDetails.jsx'


class Instructor extends React.Component {

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
  if(nextProps.currentUser.roles.instructor === true){
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
          <InstructorHeader />
          <CoursesList />
          <CoursesDetails />
        </div>
      )
    } else {
      return(
        <div>
          <p>Sinun pitää olla ohjaaja, jotta voit nähdä sivun sisällön.</p>
          <p>Ota yhteys järjestelmän valvojaan lisäoikeuksien saamiseksi.</p>
       </div>
      )
    }
  }
}

function mapStateToProps(state) {
  return { auth: state.auth, currentUser: state.currentUser }
}
export default connect(mapStateToProps, null)(Instructor)
