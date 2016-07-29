import React from 'react'
import {getDayStrMs, getTimeStrMs} from '../../helpers/timeHelper.js'

export default class UserSpecialCourse extends React.Component {

  render() {
    return (
        <li className="booking-container">
          <span className="item-row">
            <p className="header-collapse onerow-item">{this.props.item.shopItem.title} {getDayStrMs(this.props.item.shopItem.date)} {getTimeStrMs(this.props.item.shopItem.date)}</p>
          </span>
        </li>
    )
  }
}
