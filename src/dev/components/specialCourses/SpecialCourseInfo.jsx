import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { removeSpecialCourseInfo } from '../../actions/specialCourses.js'
import * as shopActionCreators from '../../actions/shop.js'
import {getDayStrMs, getTimeStr, getCourseTimeLocal} from '../../helpers/timeHelper.js'

class SpecialCourseInfo extends React.Component {

  constructor(){
    super();
    this.onceOnly = false;
  }

  static contextTypes = {
    router: React.PropTypes.object
  }

  handlePayTrailBuy(){
    const { info } = this.props.specialCourseInfo;
    if(!this.onceOnly){
      this.onceOnly = true;
      this.props.shopActions.addToCart(info);
      this.props.shopActions.initializePayTrailTransaction(info.key, info.type)
      this.props.itemActions.removeSpecialCourseInfo()
      this.context.router.push('checkout');
    }
  }

  cashPurchase(){
    const { info } = this.props.specialCourseInfo;
    if(!this.onceOnly){
      this.onceOnly = true;
      this.props.shopActions.addToCart(info);
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
    if(this.props.currentUser.transactions.details.special.find((item) => {
      return item.shopItemKey === this.props.specialCourseInfo.info.key
    })) {
      return true;
    }
    return false;
 }

 /**
  * this belongs bottom of renderPurchaseButton cashBuyButton
  * <span className="item-row">
      <button className="btn-small btn-blue btn-link mobile-full" onClick={this.handlePayTrailBuy.bind(this)} >Osta</button>
    </span>
  */

  renderPurchaseButtons() {

    const { admin, instructor } = this.props.currentUser.roles;
    const { info } = this.props.specialCourseInfo;

    let cashBuyButton = null;
    if( this.userHasPurchasedThisAlready() === true ){
      return( <p className="text-red">Olet jo ostanut tämän kurssin.</p> );
    }


    if(admin || instructor){
      cashBuyButton = <button className="btn-small btn-blue mobile-full margin-bottom" onClick={this.cashPurchase.bind(this)} >Käteisosto</button>
    }

    if(info.bookings.counter < info.maxCapacity){
      return (
        <div>      
          <span className="item-row">
            {cashBuyButton}
          </span>          
          <span className="item-row">
            <p className="info-cantreserve">Tule paikan päälle tai käy kaupassamme (Holvi) ostamassa kurssi!</p>
            <p className="info-cantreserve">Huomaathan, että ostaessasi Holvi-palvelusta, ostamasi tuote saapuu tilillesi max 24h viiveellä. Kiitos kärsivällisyydestäsi!</p>
            <a className="btn-small btn-blue btn-link mobile-full" href="https://holvi.com/shop/4Z4CW4/" target="_blank">Osta Holvista</a>
          </span>    
        </div>
      )
    } else {
      return (<p className="text-red">Kurssi on täynnä.</p> )
    }
  }

  render() {
    const { info } = this.props.specialCourseInfo

    if(info) {    
      const start = getCourseTimeLocal(0, info.start, 1)
      const startStr = getTimeStr(start)
      const end = getCourseTimeLocal(0, info.end, 1)
      const endStr = getTimeStr(end)

      return (
        <div className="course-info-container">
          <div className="course-info">
            <img src="./assets/error.png" className="exit-btn" onClick={this.exitContainer.bind(this)} />
              <div className="info-info-container">
                <h3>{info.title}</h3>
                <div className="surrounded-border">      
                  <p className="info-line border-bottom">Aika: {getDayStrMs(info.date)} {startStr} - {endStr}</p>
                  <p className="info-line border-bottom">Sijainti: {info.place.name}, {info.place.address}</p>
                  <p className="info-line border-bottom">Joogaopettaja: {info.instructor.firstname} {info.instructor.lastname}</p>
                  <p className="info-line info-time text-bold">Hinta: {info.price}&euro;</p>
                </div>
                <div>
                  <div className="centered">
                    <img className="mini-icon" src="./assets/group.png" />
                    <p className="table-participants margin-bottom">{info.bookings.counter}/{info.maxCapacity}</p>
                  </div>            
                  {this.renderPurchaseButtons()}
                </div>              
                <p className="info-desc pre-wrap">{info.courseType.desc}</p>
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
