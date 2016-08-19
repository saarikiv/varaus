import React from 'react'
import {getDayStrMs, getTimeStrMs} from '../../helpers/timeHelper.js'

export default class UserSpecialCourse extends React.Component {

  render() {
    const { shopItem } = this.props.item; 
    return (
        <li className="booking-container">
          <span className="item-row">
            <p className="header-collapse onerow-item">{shopItem.title} {getDayStrMs(shopItem.date)} {getTimeStrMs(shopItem.date)}</p>
          </span>
        </li>
    )
  }
}
