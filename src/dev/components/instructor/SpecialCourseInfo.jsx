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


  exitContainer() {
    this.props.itemActions.removeSpecialCourseInfo()
    this.onceOnly = false;
  }

  renderUser(user){
    return(
      <li>{user}</li>
    )
  }

  renderParticipants(){
    const { bookings } = this.props.specialCourseInfo.info
    if(bookings.counter > 0){
      return(
        <div>
          <h3>Kurssille ilmoittautuneet:</h3>
          <ul className="wide-list">
              {bookings.userList.map(this.renderUser)}
          </ul>
        </div>
      )
    }

    return(
      <div>
          <h3>Kurssille ei ole vielä ilmoittauduttu.</h3>
      </div>
    )

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
                  <p className="info-line info-time text-bold">Hinta: {info.price}&euro;</p>
                </div>
                <div>
                  <div className="centered">
                    <img className="mini-icon" src="./assets/group.png" />
                    <p className="table-participants margin-bottom">{info.bookings.counter}/{info.maxCapacity}</p>
                  </div>
                  {this.renderParticipants()}
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
