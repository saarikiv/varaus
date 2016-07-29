import React from "react";
import { Link } from "react-router"
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as courseActions from '../../actions/courses.js'
import Course from './Course.jsx'

class CoursesList extends React.Component {

  componentWillMount(){
    this.props.cActions.fetchTimetable();
  }

  componentWillUnmount(){
    this.props.cActions.stopFetchTimetable();
  }


  render() {
    const { bookings, courses } = this.props.timetable;
    const { currentUser } = this.props;

    return (
      
      <div class="container timetable-container bordered-container centered">
        <div className="content-container">
          <h2>Aikataulu</h2>
          <small>Klikkaa joogatuntia avataksesi lisätiedot ja peruuttaaksesi tunnin</small>
          <table>
            <tbody>
              <tr>
                <th>Maanantai</th>
                {
                  courses.map(function(item) {
                    if (item.day === 1 && item.instructor.key === currentUser.key) {
                      return (
                        <Course key={item.key} item={item} booking={bookings[item.key]}/>
                      )
                    }
                  })
                }
              </tr>
              <tr>
                <th>Tiistai</th>
                  {
                    courses.map(function(item) {
                      if (item.day === 2 && item.instructor.key === currentUser.key) {
                        return (
                          <Course key={item.key} item={item} booking={bookings[item.key]}/>
                        )
                      }
                    })
                  }
              </tr>
              <tr>
                <th>Keskiviikko</th>
                  {
                    courses.map(function(item) {
                      if (item.day === 3 && item.instructor.key === currentUser.key) {
                        return (
                          <Course key={item.key} item={item} booking={bookings[item.key]}/>
                        )
                      }
                    })
                  }
              </tr>
              <tr>
                <th>Torstai</th>
                  {
                    courses.map(function(item) {
                      if (item.day === 4 && item.instructor.key === currentUser.key) {
                        return (
                          <Course key={item.key} item={item} booking={bookings[item.key]}/>
                        )
                      }
                    })
                  }
              </tr>
              <tr>
                <th>Perjantai</th>
                  {
                    courses.map(function(item) {
                      if (item.day === 5 && item.instructor.key === currentUser.key) {
                        return (
                          <Course key={item.key} item={item} booking={bookings[item.key]}/>
                        )
                      }
                    })
                  }
              </tr>
              <tr>
                <th>Lauantai</th>
                  {
                    courses.map(function(item) {
                      if (item.day === 6 && item.instructor.key === currentUser.key) {
                        return (
                          <Course key={item.key} item={item} booking={bookings[item.key]}/>
                        )
                      }
                    })
                  }
              </tr>
              <tr>
                <th>Sunnuntai</th>
                  {
                    courses.map(function(item) {
                      if (item.day === 7 && item.instructor.key === currentUser.key) {
                        return (
                          <Course key={item.key} item={item} booking={bookings[item.key]} />
                        )
                      }
                    })
                  }
              </tr>
            </tbody>
          </table>
        </div>
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
