import React from "react";
import { Link } from "react-router"
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { mapDay } from '../../helpers/timeHelper.js'

import * as courseActions from '../../actions/courses.js'
import Course from './Course.jsx'

class CoursesList extends React.Component {

  componentWillMount(){
    this.props.cActions.fetchTimetable();
  }

  componentWillUnmount(){
    this.props.cActions.stopFetchTimetable();
  }

  renderTR(dayname, dayNumber){
    const { bookings, courses } = this.props.timetable;
    const { currentUser } = this.props;
    let day = new Date();
    let today = (dayNumber === mapDay(day.getDay()))? true: false;
    if(today){
    return(
      <tr className="glowing">
        <th className="text-bold text-blue">{dayname}</th>
        {
          courses.map(function(item) {
            if (item.day === dayNumber && item.instructor.key === currentUser.key) {
              return (
                <Course key={item.key} item={item} booking={bookings[item.key]}/>
              )
            }
          })
        }
      </tr>
    )
    }
    return(
      <tr>
        <th>{dayname}</th>
        {
          courses.map(function(item) {
            if (item.day === dayNumber && item.instructor.key === currentUser.key) {
              return (
                <Course key={item.key} item={item} booking={bookings[item.key]}/>
              )
            }
          })
        }
      </tr>
    )
  }


  render() {
    const { bookings, courses } = this.props.timetable;
    const { currentUser } = this.props;

    return (
      
      <div class="container timetable-container">
        <div className="content-container align-left">
          <h2>Aikataulu</h2>
          <small className="text-fade margin-top margin-bottom small-info">Klikkaa tuntia avataksesi lisätiedot ja peruuttaaksesi tunnin</small>
        </div>
        <table className="centered">
          <tbody>
          {this.renderTR("Maanantai", 1)}
          {this.renderTR("Tiistai", 2)}
          {this.renderTR("Keskiviikko", 3)}
          {this.renderTR("Torstai", 4)}
          {this.renderTR("Perjantai", 5)}
          {this.renderTR("Lauantai", 6)}
          {this.renderTR("Sunnuntai", 7)}
          </tbody>
        </table>        
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { currentUser: state.currentUser,  timetable: state.timetable }
}

function mapDispatchToProps(dispatch) {
  return { cActions: bindActionCreators(courseActions, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursesList)
