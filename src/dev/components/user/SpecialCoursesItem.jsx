import React from "react";
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {getDayStrMs, getTimeStrMs} from '../../helpers/timeHelper.js'

import { putSpecialCourseInfo } from '../../actions/specialCourses.js'

class SpecialCoursesItem extends React.Component {

  itemClicked() {
    this.props.actions.putSpecialCourseInfo(this.props.item)
  }

  render() {
    return (
      <li className="special-course-item" onClick={() => this.itemClicked()}>
        <p className="table-nonmargin">{this.props.item.title}</p>
        <p className="table-time">{getDayStrMs(this.props.item.date)}</p>
        <p className="table-time">{getTimeStrMs(this.props.item.start)} - {getTimeStrMs(this.props.item.end)}</p>
        <img className="mini-icon" src="./assets/group.png" />
        <p className="centered table-participants">{this.props.item.bookings}/{this.props.item.maxCapacity}</p>
      </li>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators({putSpecialCourseInfo}, dispatch) }
}

export default connect(null, mapDispatchToProps)(SpecialCoursesItem)
