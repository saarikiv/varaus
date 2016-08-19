import React from "react";
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {getDayStrMs, getTimeStr, getCourseTimeLocal} from '../../helpers/timeHelper.js'

import { putSpecialCourseInfo } from '../../actions/specialCourses.js'

class SpecialCoursesItem extends React.Component {

  itemClicked() {
    this.props.actions.putSpecialCourseInfo(this.props.item)
  }

  renderBookings(item) {
    if (item.bookings.counter === item.maxCapacity) {
      return <p className="centered table-participants text-red text-bold table-alert">TÄYNNÄ</p>
    }
    return (
      <span >
        <img className="mini-icon tiny-icon" src="./assets/group.png" />
        <p className="centered table-participants">{item.bookings.counter}/{item.maxCapacity}</p>
      </span>
    )
  }

  render() {
    const { item } = this.props;

    const start = getCourseTimeLocal(0, item.start, 1)
    const startStr = getTimeStr(start)
    const end = getCourseTimeLocal(0, item.end, 1)
    const endStr = getTimeStr(end)

    return (
      <li className="special-course-item" onClick={() => this.itemClicked()}>
        <p className="table-nonmargin">{item.title}</p>
        <p className="table-time">{getDayStrMs(item.date)}</p>
        <p className="table-time">{startStr} - {endStr}</p>        
        {this.renderBookings(item)}
      </li>
    );
  }
}

function mapStateToProps(state) {
  return { currentUser: state.currentUser }
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators({putSpecialCourseInfo}, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(SpecialCoursesItem)
