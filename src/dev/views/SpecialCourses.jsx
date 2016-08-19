import React from 'react'
import { connect } from 'react-redux'

import SpecialCoursesList from '../components/specialCourses/SpecialCourses.jsx'
import SpecialCourseInfo from '../components/specialCourses/SpecialCourseInfo.jsx'
import SpecialCoursesHeader from '../components/specialCourses/SpecialCoursesHeader.jsx'

class SpecialCourses extends React.Component {

  static contextTypes = {
    router: React.PropTypes.object
  }

  componentWillMount(){
      if(this.props.currentUser.locked){
        this.context.router.push('lockeduser')
      }
  }

  componentWillUnmount(){
  }


  componentWillReceiveProps(nextProps){
      if(nextProps.currentUser.locked){
        this.context.router.push('lockeduser')
      }
  }

  render() {
    return (
      <div>
        <SpecialCoursesHeader />
        <SpecialCoursesList />
        <SpecialCourseInfo />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { auth: state.auth, currentUser: state.currentUser }
}

export default connect(mapStateToProps, null)(SpecialCourses)
