import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PlaceForm from '../../components/admin/PlaceForm.jsx'

import Item from './PlaceItem.jsx'
import * as actionCreators from '../../actions/admin.js'

class PlaceList extends React.Component {

  constructor(){
    super()
    this.toggleForm = false
  }

  componentWillMount() {
    this.props.actions.fetchPlaceList()
  }
  
  componentWillUnmount() {
    this.props.actions.stopFetchPlaceList()
  }

  componentWillReceiveProps(nextProps){
      if(nextProps.cmp.expanded && nextProps.cmp.expander === "addNew"){
        this.toggleForm = true;
      } else {
        this.toggleForm = false;
      }
  }

  renderList(item) {
    return (
      <Item key={item.key} item={item} />
    )
  }

  renderForm(){
    if(this.toggleForm){
      return(<PlaceForm mode="addNew"/>)
    } else {
      return(<div></div>)
    }
              
  }

  toggleAdd(){
  if(this.toggleForm){
      this.props.actions.minimizePlaceForm()
    } else {
      this.props.actions.expandPlaceForm("addNew")
    }    
  }

  renderContent() {
    if (this.props.list.expanded) {
      return (
        <ul className="wide-list">
          {this.props.list.list.map(this.renderList)}
        </ul>
      )
    }
    else {
      return <div></div>
    }
  }

  renderExpandButton() {

    var buttonText = (this.toggleForm)? "Peru lisäys" : "Lisää uusi"


    if(this.props.list.expanded) {
      return ( <div>
      <button className="expand-btn" onClick={() => this.props.actions.minimizePlaceList()}>Piilota</button>
      <button className="expand-btn" onClick={() => this.toggleAdd()}>{buttonText}</button>
      </div>)
   }
    else {
      return <button className="expand-btn" onClick={() => this.props.actions.expandPlaceList()}>Avaa</button>
    }
  }

  render() {
    return (
      <div className="container bordered-container">
        <div className="content-container align-left">
          <h2 className="header-collapse">Paikat</h2>
          {this.renderExpandButton()}
          {this.renderForm()}
          {this.renderContent()}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { list: state.placeList, cmp: state.placeForm }
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actionCreators, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaceList)
