import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as adminActionCreators from '../../actions/admin.js'
import * as shopActionCreators from '../../actions/shop.js'
import * as courseActionCreators from '../../actions/courses.js'
import * as bookingActionCreators from '../../actions/bookings.js'

class UserItem extends React.Component {

  constructor(){
    super();
    this.paymentOngoing = false;
    this.lateReservationOngoing = false;
  }

  executeCashBuy(){
    if(!this.paymentOngoing){
      this.paymentOngoing = true;
      this.props.shopActions.executeCashPurchase(this.props.item.uid, this.props.shopItems.cart.key, this.props.shopItems.cart.type)
    }
  }

  executeLateReservation(){
    if(!this.lateReservationOngoing){
      this.lateReservationOngoing = true;
      this.props.bookingActions.postLateReservation(this.props.item.uid, 0, this.props.courseInfo)
      this.props.courseActions.flagCourseInfoToExit()
    }
  }

  renderButtons() {
    //TODO: fix according !user.locked
    //TODO: add button functionality

    if (this.props.item.locked) {
      return (
        <span className="item-row">
          <button className="btn-small btn-green" onClick={() => this.props.adminActions.unlockUser(this.props.item.uid)}>Aktivoi</button>
        </span>
      )
    }
    if(this.props.courseInfo.key !== "0") {
      return (
        <span className="item-row">
          <button className="btn-small btn-blue" onClick={() => this.executeLateReservation()}>Varaus</button>
        </span>
      )      
    }
    if(this.props.shopItems.phase === "cashPayment"){
      return (
        <span className="item-row">
          <button className="btn-small btn-blue" onClick={() => this.executeCashBuy()}>Osto</button>
        </span>
      )
    }
      return (
        <div>
          <span className="item-row">
            <button className="btn-small btn-red" onClick={() => this.props.adminActions.lockUser(this.props.item.uid)}>Lukitse</button>
          </span>
          <span className="item-row">
            <button className="btn-small btn-blue" onClick={() => this.props.adminActions.makeInstructor(this.props.item.uid)}>Joogaopettajaksi</button>
          </span>
        </div>
      )
  }

  render() {
    const {item} = this.props

    //TODO: Render functionality for admin

    return (
      <li className="text-list-item">
        <span className="item-row">{item.firstname} {item.lastname}</span>
        <span className="item-row">{item.email}</span>
        <span className="item-row">{item.uid}</span>
        {this.renderButtons()}
      </li>
    )
  }
}

function mapStateToProps(state) {
  return { shopItems: state.shopItems, courseInfo: state.courseInfo }
}

function mapDispatchToProps(dispatch) {
  return {
    adminActions: bindActionCreators(adminActionCreators, dispatch),
    shopActions: bindActionCreators(shopActionCreators,dispatch),
    courseActions: bindActionCreators(courseActionCreators,dispatch),
    bookingActions: bindActionCreators(bookingActionCreators, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserItem)
