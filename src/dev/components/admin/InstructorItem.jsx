import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as actionCreators from '../../actions/admin.js'

class InstructorItem extends React.Component {

  constructor() {
    super();
    this.confirmed = false;
  }

  unmakeInstructor(uid){
    if(this.confirmed){
      this.props.actions.unmakeInstructor(uid)
      this.confirmed = false;
    } else {
      this.confirmed = true;
      this.forceUpdate()
      setTimeout(() => {
        this.confirmed = false;
        this.forceUpdate()        
      }, 2000)
    }
  }

  renderButtons() {

    var buttonName = (this.confirmed)? "Vahvista poisto" : "Poista Joogaopettaja"
    
    return(
      <span className="item-row">
        <button className="btn-small btn-red" onClick={() => this.unmakeInstructor(this.props.item.uid) }>{buttonName}</button> 
      </span>
    )
  }
  
  render() {
    const {item} = this.props

    //TODO: Render functionality for admin

    return (
      <li className="text-list-item">
        <span className="item-row">{item.firstname} {item.lastname}</span>
        <span className="item-row">{item.email}</span>
        {this.renderButtons()}
      </li>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actionCreators, dispatch)}
}

export default connect(null, mapDispatchToProps)(InstructorItem)
