import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {postCancellation} from '../../actions/bookings.js'

import * as loadingScreenActions from '../../actions/loadingScreen.js'

import {getDayStrMs, getTimeStrMs} from '../../helpers/timeHelper.js'

class UserBooking extends React.Component {

  constructor(){
    super();
    this.cancellationOngoing = false;
  }

  static contextTypes = {
    router: React.PropTypes.object
  }

  cancelReservation(item){
    if(!this.cancellationOngoing){
      this.cancellationOngoing = true;
      this.props.actions.postCancellation(item.courseTime, item.transactionReference, item.courseInfo);
    }
  }

  render() {
    let day = new Date()
    var cancelButton = null;
    //Show cancel button if course starts more than 3 hours from now.
    if(this.props.item.courseTime > day.getTime()+3*60*60*1000){
      cancelButton = <button className="btn-small btn-blue btn-right" onClick={() => this.cancelReservation(this.props.item)}>Peru</button>
    } else {
      cancelButton = <p>Tunnin alkuun alle 3 tuntia.</p>
    }

    return (
        <li className="booking-container">
          <span className="item-row">
            <p className="header-collapse onerow-item">{this.props.item.courseName} {getDayStrMs(this.props.item.courseTime)} {getTimeStrMs(this.props.item.courseTime)}</p>
            {cancelButton}
          </span>
        </li>
    )
  }
}


function mapStateToProps(state) {
  return { auth: state.auth }
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators({postCancellation}, dispatch),
          lsActions: bindActionCreators(loadingScreenActions, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserBooking)
