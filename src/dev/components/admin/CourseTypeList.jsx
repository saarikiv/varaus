import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import CourseTypeForm from '../../components/admin/CourseTypeForm.jsx'

import Item from './CourseTypeItem.jsx'
import * as actionCreators from '../../actions/admin.js'

class CourseTypeList extends React.Component {
  
  constructor(){
    super()
    this.toggleForm = false
  }

  componentWillMount() {
    this.props.actions.fetchCourseTypeList()
  }

  componentWillUnmount() {
    this.props.actions.stopFetchCourseTypeList()
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
      <Item key={item.key} item={item}/>
    )
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
      return(<CourseTypeForm mode="addNew"/>)
    } else {
      return(<div></div>)
    }
              
  }

  toggleAdd(){
  if(this.toggleForm){
      this.props.actions.minimizeCourseTypeForm()
    } else {
      this.props.actions.expandCourseTypeForm("addNew")
    }    
  }


  renderExpandButton() {

    var buttonText = (this.toggleForm)? "Peru lisäys" : "Lisää uusi"
    if(this.props.list.expanded) {
      return (<div>
      <button className="expand-btn" onClick={() => this.props.actions.minimizeCourseTypeList()}>Piilota</button>
      <button className="expand-btn" onClick={() => this.toggleAdd()}>{buttonText}</button>
      </div> )
    }
    else {
      return <button className="expand-btn" onClick={() => this.props.actions.expandCourseTypeList()}>Avaa</button>
    }
  }

  render() {
    return (
      <div className="container bordered-container">
        <div className="content-container align-left">
          <h2 className="header-collapse">Kurssityypit</h2>
          {this.renderExpandButton()}
          {this.renderForm()}
          {this.renderContent()}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { list: state.courseTypeList, cmp: state.courseTypeForm}
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actionCreators, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(CourseTypeList)
