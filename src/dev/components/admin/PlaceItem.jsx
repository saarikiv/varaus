import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PlaceForm from '../../components/admin/PlaceForm.jsx'

import * as actionCreators from '../../actions/admin.js'

class PlaceItem extends React.Component {

  constructor(){
    super()
    this.toggleForm = false
    this.confirmation = false
    this.timeoutId = 0;
  }

  componentWillUnmount(){
    if(this.timeoutId !== 0){
      clearTimeout(this.timeoutId);
    }
  }

  componentWillReceiveProps(nextProps){
      if(nextProps.cmp.expanded && nextProps.cmp.expander === this.props.item.key){
        this.toggleForm = true;
      } else {
        this.toggleForm = false;
      }
  }

  remove(item){
    if(this.confirmation){
      this.props.actions.removePlaceItem(item);
      this.confirmation = false; 
    } else {
      this.confirmation = true;
      this.forceUpdate();
      this.timeoutId = setTimeout(() => {
        this.confirmation = false;
        this.forceUpdate();
      }, 2000)
    }
  }

  toggleModify(item){
    if(this.toggleForm){
      this.props.actions.minimizePlaceForm()
    } else {
      this.props.actions.expandPlaceForm(item.key)
    }    
  }


  renderForm(){
    if(this.toggleForm){
      return(<PlaceForm mode="modify" initialValues={this.props.item}/>)
    } else {
      return(<div></div>)
    }
              
  }


  render() {

    var modifyButtonText = (this.toggleForm)? "Peru Muokkaus" : "Muokkaa"
    var removeButtonText = (this.confirmation)? "Vahvista poisto" : "Poista"

    const {item} = this.props
    return (
      <li className="text-list-item">
        <span className="item-row">{this.props.item.name}</span>
        <span className="item-row">{this.props.item.address}</span>
        <span className="item-row">
          <button className="btn-small btn-blue" onClick={() => {this.toggleModify(item)}}>{modifyButtonText}</button>
        </span>
        <span className="item-row">
          <button className="btn-small btn-red" onClick={() => {this.remove(item)}}>{removeButtonText}</button>
        </span>
        {this.renderForm(item)}
      </li>
    )
  }
}

function mapStateToProps(state) {
  return { cmp: state.placeForm }
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actionCreators, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaceItem)
