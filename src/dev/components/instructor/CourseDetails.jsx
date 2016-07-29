import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getCourseTimeLocal, sameDay, hasDayPassed, hasTimePassed, timeToMoment, getDayStrMs, getTimeStrMs, getDayStr, getTimeStr } from '../../helpers/timeHelper.js'
import UserItem from './UserItem.jsx'
import * as instructoractions from '../../actions/instructor.js'

class CourseDetails extends React.Component {

  constructor() {
    super();
    this.confirmation = false;
    this.timeoutId = 0;
  }

  cancelCourse(){
     const { course, booking, visible } = this.props.instructor;
     if(this.confirmation){
      this.props.actions.postCanceCourse(course, booking[0]);
      this.exitContainer();
    } else {
      this.confirmation = true;
      this.forceUpdate();
      this.timeoutId = setTimeout( () => {
        this.confirmation = false;
        this.forceUpdate();
      }, 2000)
    }
  }


  activateCourse(){
     const { course, booking, visible } = this.props.instructor;
     if(this.confirmation){
      this.props.actions.activateCourse(course);
      this.exitContainer();
    } else {
      this.confirmation = true;
      this.forceUpdate();
      this.timeoutId = setTimeout( () => {
        this.confirmation = false;
        this.forceUpdate();
      }, 2000)
    }
  }

  componentWillUnmount(){
    if(this.timeoutId !== 0){
      clearTimeout(this.timeoutId);
    }
  }

  exitContainer() {
    this.props.actions.clearInstructorData()
  }

  renderuser(item) {
      return (
        <UserItem item={item} key={item.key}/>
      )
  }

  renderUserList(){
    if(this.props.instructor.booking.length > 0)
    {
      return (
        <ul className="wide-list">
            {this.props.instructor.booking[0].participants.map(this.renderuser)}
        </ul>
      );
    } else {
      return(
        <h3>Kurssille ei ole ilmoittautuneita.</h3>
      )
    }
                            
  }

  renderButton(){
    const { course, booking } = this.props.instructor;
    var cancelButton = null;
    if(course.cancelled){
      cancelButton = (this.confirmation)? "Vahvista aktivoiminen" : "Aktivoi kurssi"
      return(
        <span className="item-row">
          <button className="btn-small btn-red" onClick={() => {this.activateCourse()}}>{cancelButton}</button>
        </span>
      );
    } else {
      cancelButton = (this.confirmation)? "Vahvista peruminen" : "Peru"
      return(
        <span className="item-row">
          <button className="btn-small btn-red" onClick={() => {this.cancelCourse()}}>{cancelButton}</button>
        </span>
      );
    }
  }
  
  render() {
    const { course, booking, visible } = this.props.instructor;

    let courseCancelled = null;
    if(course.cancelled){
      courseCancelled = <h2>Kurssi on peruttu!</h2>
    }

    let weekIndex = 0;
    if (hasTimePassed(course.day, course.start)) {
      weekIndex = 1;
    } else {
      weekIndex = 0;
    }
    let day = getCourseTimeLocal(weekIndex, course.start, course.day);
    let dayStr = getDayStr(day) + " " + getTimeStr(day);

    let bookingPerCapacity = "0/" + course.maxCapacity;
    if(booking.length > 0){
      bookingPerCapacity = booking[0].reservations + "/" + course.maxCapacity;
    }

    if(visible){
      return (
        <div className="course-info-container">
          <div className="course-info">
            <button className="exit-btn" onClick={this.exitContainer.bind(this)}>x</button>
            <div className="info-info-container">
              <h2>{course.courseType.name}</h2>
              <h3>{dayStr}    ( {bookingPerCapacity} )</h3>
              {courseCancelled}
              {this.renderUserList()}
              {this.renderButton()}
            </div>
          </div>
        </div>
      )
    } else {
      return ( <div></div>)
    }
  }
}

function mapStateToProps(state) {
  return {  instructor: state.instructor }
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(instructoractions, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(CourseDetails)
