import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from "react-router"

import { getCourseTimeLocal, sameDay, hasDayPassed, hasTimePassed, timeToMoment, getDayStrMs, getTimeStrMs, getDayStr, getTimeStr } from '../../helpers/timeHelper.js'
import {removeCourseInfo} from '../../actions/courses.js'
import * as bookingsActionCreators from '../../actions/bookings.js'
import UserList from '../admin/UserList.jsx'

class CourseInfo extends React.Component {

  constructor(){
    super();
    this.fetchStarted = false;
    this.reservationRequestOngoing = false;
    this.lateReservationRequestOngoing = false;
    this.cancellationOngoing = false;
    this.confirmation = false;
    this.timeoutId = 0;
  }

  componentWillReceiveProps(nextProps){
    this.cancellationOngoing = false;
    if(nextProps.courseInfo.closeInfo){
      this.exitContainer()
    }
  }

  componentWillUnmount(){
    if(this.timeoutId !== 0){
      clearTimeout(this.timeoutId);
    }
  }

  cancelReservation(forward){
    const { courseInfo } = this.props;
    if(this.confirmation){
      if(!this.cancellationOngoing){
        this.cancellationOngoing = true;
        this.props.bookingsActions.postCancellation(
          courseInfo.bookings.user[0].item, 
          courseInfo.bookings.user[0].txRef, 
          courseInfo);
          this.exitContainer();
      }
    } else {
      this.confirmation = true;
      this.forceUpdate();
      this.timeoutId = setTimeout( () => {
        this.confirmation = false;
        this.forceUpdate();
      }, 2000)
    }
    

  }

  makeReservation(forward) {
    if(!this.reservationRequestOngoing){
      this.reservationRequestOngoing = true;
      this.props.bookingsActions.postReservation(forward, this.props.courseInfo)
      this.exitContainer()
    }
  }

  makeLateReservation(forward) {
    if(!this.lateReservationRequestOngoing){
      this.lateReservationRequestOngoing = true;
      this.forceUpdate()
    }
  }


  exitContainer() {
    this.props.courseActions.removeCourseInfo()
    this.reservationRequestOngoing = false;
    this.lateReservationRequestOngoing = false;
    this.cancellationOngoing = false;
    this.confirmation = false;
  }

  userCanBook(day){
    const { transactions } = this.props.currentUser;
    return (transactions.count > 0 || transactions.time > day.getTime()) ? true : false;
  }

  courseIsFull(){
    const { bookings, maxCapacity } = this.props.courseInfo;
    if(bookings.all.length > 0){
      return (bookings.all[0].reservations < maxCapacity)? false : true;
    } else {
      return false; // No bookings for the course yet.
    }
  }

  //========================================================================
  //========================================================================
  //========================================================================
  renderParticipants(){
    const { bookings, maxCapacity } = this.props.courseInfo;

    if(bookings.all.length > 0){
        return(
            <p className="table-participants margin-bottom"> {bookings.all[0].reservations}/{maxCapacity}</p>
        );
      }
      else {
        return(
            <p className="table-participants margin-bottom"> 0/{maxCapacity}</p>
        )
      }
  }

  //========================================================================
  //========================================================================
  //========================================================================
  renderReservationButton(courseInfo, day, dayStr, weekIndex){

    var notificationText = null;


    if(courseInfo.cancelled){
        return(
                <p className="text-red">Tunti on peruttu!</p>
              );
    }

    if(courseInfo.bookings){
    if(courseInfo.bookings.user.length > 0){
      if(day.getTime() < (Date.now() + 3*60*60*1000)){ // Course starts less than 3 hours from now.
        return( <div>
                  <p className="text-blue"> Sinä olet ilmoittautunut tälle tunnille.</p>
                  <p className="text-red"> Kurssin alkuun aikaa alle 3 tuntia. Valitettavasti et voi enää peruuttaa varausta.</p>
                </div>
              );
      } else {
        let cancelButton = (this.confirmation)? "Vahvista peruutus" : "Peru"
        return( <div>
                  <p className="text-blue"> Sinä olet ilmoittautunut tälle tunnille.</p>
                  <button className="btn-small btn-red mobile-full" onClick={() => this.cancelReservation(weekIndex)} > {cancelButton} </button>
                </div>
              );
      }
    }}

    if(this.courseIsFull()){
      return(
        <p className="text-red"> Tunti on jo täyteen varattu!</p>
      );
    }

    if(!this.userCanBook(day)){
      return(<div>
              <p className="info-cantreserve">Sinulla ei ole varausoikeutta. Tule paikan päälle tai käy kaupassamme (Holvi) ostamassa tuntioikeuksia!</p>
              <p className="info-cantreserve">Huomaathan, että ostaessasi Holvi-palvelusta, ostamasi tuote saapuu tilillesi max 24h viiveellä. Kiitos kärsivällisyydestäsi!</p>
              <a className="text-link text-link-white" href="https://holvi.com/shop/4Z4CW4/" target="_blank">Osta Holvista</a>
            </div>
      );
    }
    

    if(
      hasTimePassed(courseInfo.day, courseInfo.start) && 
      !hasTimePassed(courseInfo.day, courseInfo.end)){
        notificationText = <p className="text-red"> Tämän viikon tunti on alkanut. Varaus on seuraavalle viikolle. </p>
    }

    return(
          <div>
            {notificationText}
            <button className="btn-small btn-blue mobile-full" onClick={() => this.makeReservation(weekIndex)} >
              Varaa: { dayStr }
            </button>
          </div>
        );
  }

  renderLateBooking(weekIndex){
    if(weekIndex === 0){
      return(<div></div>)  //Course booking is still open.
    }
    const { courseInfo } = this.props;
    const { instructor, admin } = this.props.currentUser.roles

    let day = getCourseTimeLocal(0, courseInfo.start, courseInfo.day);
    let dayStr = getDayStr(day) + " " + getTimeStr(day);

    if(instructor || admin){
      if(!this.lateReservationRequestOngoing){
        return(
          <div className="content-container">
            <button className="btn-small btn-blue mobile-full" onClick={() => this.makeLateReservation(0)} >
                Myöhäinen varaus: { dayStr }
            </button>
          </div>
        )      
      } else {
        return(
          <div>
            <div className="content-container">
              <h3> Valitse käyttäjä, jolle varaus suoritetaan.</h3>
            </div>
            <UserList />
          </div>
        )
      }
    }
  }


  render() {
    const { courseInfo } = this.props;

    let weekIndex = 0;
    if (hasTimePassed(courseInfo.day, courseInfo.start)) {
      weekIndex = 1;
    }

    let day = getCourseTimeLocal(weekIndex, courseInfo.start, courseInfo.day);
    let dayStr = getDayStr(day) + " " + getTimeStr(day);
    let end = getCourseTimeLocal(weekIndex, courseInfo.end, courseInfo.day);
    let endStr = getTimeStr(end);

    if(this.props.courseInfo.key !== "0"){
      return (
        <div className="course-info-container">
          <div className="course-info">
            <img src="./assets/error.png" className="exit-btn" onClick={this.exitContainer.bind(this)} />
            <div className="info-info-container">
              <h3>{courseInfo.courseType.name}</h3>
              <div className="surrounded-border">
                <p className="info-line border-bottom">Aika: {dayStr} - {endStr}</p>
                <p className="info-line border-bottom">Sijainti: {courseInfo.place.name}, {courseInfo.place.address}</p>
                <p className="info-line">Joogaopettaja: {courseInfo.instructor.firstname} {courseInfo.instructor.lastname}</p>
              </div>
              <div>
                <div className="centered">
                  <img className="mini-icon" src="./assets/group.png" />
                  {this.renderParticipants()}
                </div>
                {this.renderReservationButton(courseInfo, day, dayStr, weekIndex)}
              </div>
              <p className="info-desc pre-wrap">{courseInfo.courseType.desc}</p>
            </div>
              {this.renderLateBooking(weekIndex)}
          </div>
        </div>
      )
    } else {
      return ( <div></div>)
    }
  }
}

function mapStateToProps(state) {
  return {  courseInfo: state.courseInfo, currentUser: state.currentUser }
}

function mapDispatchToProps(dispatch) {
  return { courseActions: bindActionCreators({removeCourseInfo}, dispatch),
           bookingsActions: bindActionCreators(bookingsActionCreators, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(CourseInfo)
