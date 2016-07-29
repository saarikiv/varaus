import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {getTimeStrMsBeginnignOfDay} from '../../helpers/timeHelper.js'
import { putCourseInfo } from '../../actions/courses.js'
import * as bookingsActionCreators from '../../actions/bookings.js'

class TimeTableItem extends React.Component {

  componentWillReceiveProps(nextProps){
    if(this.props.courseInfo.key !== "0"){ //Pop-up is active and CI-props need to be updated
      //But only if bookings information has changed.
      if(this.props.booking !== nextProps.booking){
        this.props.courseActions.putCourseInfo(nextProps.item, nextProps.booking)
      }
    }
  }

  componentWillMount(){
    this.props.bookingsActions.fetchCourseBookings(this.props.item.key, this.props.currentUser.uid)
  }

  componentWillUnmount(){
    this.props.bookingsActions.stopfetchCourseBookings(this.props.item.key)
  }

  itemClicked() {
    this.props.courseActions.putCourseInfo(this.props.item, this.props.booking)
  }

  render() {
    const { booking, item } = this.props;
    var courseCancelled = null;
    if(item.cancelled){
      courseCancelled = <p>PERUTTU</p>
    }
    var userBooked = null;
    if(booking){
      if(booking.user.length > 0){
         userBooked = <img className="mini-icon margin-left" src="./assets/booked.png" />
      }
    }
    if(booking){
      var allBooked = <p className="table-participants margin-left">0/{item.maxCapacity}</p>
      if(booking.all.length > 0){
        allBooked = <p className="table-participants margin-left">{booking.all[0].reservations}/{item.maxCapacity}</p>
      }
    }
    return (
      <td onClick={() => this.itemClicked()}>
        <p className="table-course">{item.courseType.name}</p>
        <p className="table-time">{getTimeStrMsBeginnignOfDay(item.start)} - {getTimeStrMsBeginnignOfDay(item.end)}</p>
        <img className="mini-icon" src="./assets/group.png" />
        {allBooked}
        {userBooked}
        {courseCancelled}
      </td>
    );
  }
}

function mapStateToProps(state) {
  return {  courseInfo: state.courseInfo, currentUser: state.currentUser }
}

function mapDispatchToProps(dispatch) {
  return { courseActions: bindActionCreators({putCourseInfo}, dispatch),
           bookingsActions: bindActionCreators(bookingsActionCreators, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(TimeTableItem)
