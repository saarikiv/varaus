import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Form from '../../components/admin/SpecialCourseForm.jsx'
import Item from './SpecialCourseItem.jsx'
import * as actionCreators from '../../actions/admin.js'

class CourseList extends React.Component {

  constructor(){
    super()
    this.toggleForm = false
  }
  
  componentWillMount() {
    this.props.actions.fetchSpecialCourseList()
  }

  componentWillUnmount() {
    this.props.actions.stopFetchSpecialCourseList()
  }

  componentWillReceiveProps(nextProps){
    console.log("CMPPROPS", nextProps)
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
      this.props.actions.minimizeSpecialCourseForm()
    } else {
      this.props.actions.expandSpecialCourseForm("addNew")
    }    
  }

  renderExpandButton() {
    var buttonText = (this.toggleForm)? "Peru lisäys" : "Lisää uusi"
    if(this.props.list.expanded) {
      return (
        <div>
        <button className="expand-btn" onClick={() => this.props.actions.minimizeSpecialCourseList()}>Piilota</button>
        <button className="expand-btn" onClick={() => this.toggleAdd()}>{buttonText}</button>
        </div>
      )
    }
    else {
      return <button className="expand-btn" onClick={() => this.props.actions.expandSpecialCourseList()}>Avaa</button>
    }
  }

  render() {
    return (
      <div className="container bordered-container">
        <div className="content-container align-left">
          <h2 className="header-collapse">Erikoiskurssit</h2>
          {this.renderExpandButton()}
          {this.renderForm()}
          {this.renderContent()}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { list: state.specialCourseList, cmp: state.specialCourseForm }
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actionCreators, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(CourseList)
