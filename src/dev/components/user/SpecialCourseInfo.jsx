import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { removeSpecialCourseInfo } from '../../actions/specialCourses.js'
import * as shopActionCreators from '../../actions/shop.js'
import {getDayStrMs, getTimeStrMs} from '../../helpers/timeHelper.js'

class SpecialCourseInfo extends React.Component {

  constructor(){
    super();
    this.onceOnly = false;
  }

  static contextTypes = {
    router: React.PropTypes.object
  }

  handleClickToBuy(){
    if(!this.onceOnly){
      this.onceOnly = true;
      this.props.shopActions.addToCart(this.props.specialCourseInfo.info);
      this.props.shopActions.getClientTokenFromBraintree()
      this.props.itemActions.removeSpecialCourseInfo()
      this.context.router.push('checkout');
    }
  }

  cashPurchase(){
    if(!this.onceOnly){
      this.onceOnly = true;
      this.props.shopActions.addToCart(this.props.specialCourseInfo.info);
      this.props.shopActions.buyWithCash();
      this.props.itemActions.removeSpecialCourseInfo()
      this.context.router.push('checkout');
    }
  }

  exitContainer() {
    this.props.itemActions.removeSpecialCourseInfo()
    this.onceOnly = false;
  }

  userHasPurchasedThisAlready(){
    var returnValue = false;
    this.props.currentUser.transactions.details.special.forEach((item, index) => {
      if(item.shopItemKey === this.props.specialCourseInfo.info.key){
        returnValue = true;
      }
    })
    return returnValue;
  }

  renderPurchaseButtons() {

    let admin = null;
    if( this.userHasPurchasedThisAlready() === true ){
      return( <h4>Olet jo ostanut tämän kurssin.</h4> );
    }


    if(this.props.currentUser.roles.admin){
      admin = <button className="btn-small btn-blue margin-left" onClick={this.cashPurchase.bind(this)} >Käteisosto</button>
    }

    if(this.props.specialCourseInfo.info.bookings < this.props.specialCourseInfo.info.maxCapacity){
      return (
        <div>
          <span className="item-row">
            <button className="btn-small btn-blue btn-link" onClick={this.handleClickToBuy.bind(this)} >Osta</button>
          </span>
          <span className="item-row">
            {admin}
          </span>
        </div>
      )
    } else {
      return (<h2>Kurssi on täynnä.</h2> )
    }
  }

  render() {
    const { info } = this.props.specialCourseInfo


    if(info) {
      return (
        <div className="course-info-container">
          <div className="course-info">
            <button className="exit-btn" onClick={this.exitContainer.bind(this)}>x</button>
              <div className="info-info-container">
                <h3>{info.title}</h3>                
                <h3 className="info-time text-bold">{info.price}&euro;</h3>
                <p className="info-time">{getDayStrMs(info.date)}</p>
                <p className="info-place text-blue">Klo {getTimeStrMs(info.start)} - {getTimeStrMs(info.end)}</p>
                <p className="info-place">Sijainti: {info.place.name}, {info.place.address}</p>
                <p className="info-instructor">Joogaopettaja: {info.instructor.firstname} {info.instructor.lastname}</p>
                <div>
                  <img className="mini-icon" src="./assets/group.png" />
                  <p className="table-participants margin-bottom">{info.bookings}/{info.maxCapacity}</p>            
                  {this.renderPurchaseButtons()}
                </div>              
                <p className="info-desc">{info.courseType.desc}</p>
              </div>
          </div>
        </div>
      )
    } else {
      return (
        <div></div>
      )
    }
  }
}

function mapStateToProps(state) {
  return {  specialCourseInfo: state.specialCourseInfo, currentUser: state.currentUser }
}

function mapDispatchToProps(dispatch) {
  return {
    shopActions: bindActionCreators(shopActionCreators, dispatch),
    itemActions: bindActionCreators({removeSpecialCourseInfo}, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SpecialCourseInfo)
