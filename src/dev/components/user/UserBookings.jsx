import React from 'react'
import { connect } from 'react-redux'
import UserBooking from './UserBooking.jsx'
import UserSpecialCourse from './UserSpecialCourse.jsx'

class UserBookings extends React.Component {

  static contextTypes = {
    router: React.PropTypes.object
  }

  renderSpecialCources(item){
    return(<UserSpecialCourse key={item.transactionReference} item={item}/>)
  }

  renderBookings(item){
    return(<UserBooking key={item.courseInfo.key} item={item}/>)
  }

  render() {
    const { specialCourses, bookings } = this.props.currentUser;
    if(bookings.length > 0 || specialCourses.length ){
      return (
        <div className="container bordered-container">
          <div className="content-container">
            <h2 className="header-collapse">Tulevat varauksesi</h2>
              <ul className="wide-list">
                {specialCourses.map(this.renderSpecialCources)}
                {bookings.map(this.renderBookings)}
              </ul>
          </div>
        </div>
      )
    } else{
      return(<div></div>)
    }
  }
}


function mapStateToProps(state) {
  return { auth: state.auth, currentUser: state.currentUser }
}

export default connect(mapStateToProps, null)(UserBookings)
