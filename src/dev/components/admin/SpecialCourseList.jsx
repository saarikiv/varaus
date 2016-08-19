import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Form from '../../components/admin/SpecialSlotForm.jsx'
import Item from './SpecialSlotItem.jsx'
import * as actionCreators from '../../actions/admin.js'

class SlotList extends React.Component {

  constructor(){
    super()
    this.toggleForm = false
  }
  
  componentWillMount() {
    this.props.actions.fetchSpecialSlotList()
  }

  componentWillUnmount() {
    this.props.actions.stopFetchSpecialSlotList()
  }

  componentWillReceiveProps(nextProps){
      if(nextProps.cmp.expanded && nextProps.cmp.expander === "addNew"){
        this.toggleForm = true;
      } else {
        this.toggleForm = false;
      }
  }



  renderList(item) {
    return <Item key={item.key} item={item}/>
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

 renderForm(){
    if(this.toggleForm){
      return <Form mode="addNew"/>
    } else {
      return <div></div>
    }
              
  }

  toggleAdd(){
  if(this.toggleForm){
      this.props.actions.minimizeSpecialSlotForm()
    } else {
      this.props.actions.expandSpecialSlotForm("addNew")
    }    
  }

  renderExpandButton() {
    var buttonText = (this.toggleForm)? "Peru lisäys" : "Lisää uusi"
    if(this.props.list.expanded) {
      return (
        <div>
        <button className="expand-btn" onClick={() => this.props.actions.minimizeSpecialSlotList()}>Piilota</button>
        <button className="expand-btn" onClick={() => this.toggleAdd()}>{buttonText}</button>
        </div>
      )
    }
    else {
      return <button className="expand-btn" onClick={() => this.props.actions.expandSpecialSlotList()}>Avaa</button>
    }
  }

  render() {
    return (
      <div className="container bordered-container">
        <div className="content-container align-left">
          <h2 className="header-collapse">Kurssit</h2>
          {this.renderExpandButton()}
          {this.renderForm()}
          {this.renderContent()}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { list: state.specialSlotList, cmp: state.specialSlotForm }
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actionCreators, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(SlotList)
