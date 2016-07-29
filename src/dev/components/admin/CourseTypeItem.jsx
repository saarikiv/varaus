import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import CourseTypeForm from '../../components/admin/CourseTypeForm.jsx'

import * as actionCreators from '../../actions/admin.js'

class CourseTypeItem extends React.Component {
 
  constructor(){
    super()
    this.toggleForm = false;
    this.confirmation = false;
    this.timeoutId = 0;
  }

 componentWillReceiveProps(nextProps){
      if(nextProps.cmp.expanded && nextProps.cmp.expander === this.props.item.key){
        this.toggleForm = true;
      } else {
        this.toggleForm = false;
      }
  }

  componentWillUnmount(){
    if(this.timeoutId !== 0){
      clearTimeout(this.timeoutId);
    }
  }

  remove(item){
     if(this.confirmation){
      this.props.actions.removeCourseType(item);
    } else {
      this.confirmation = true;
      this.forceUpdate();
      this.timeoutId = setTimeout( () => {
        this.confirmation = false;
        this.forceUpdate();
      }, 2000)
    }
   
  }

  toggleModify(item){
    if(this.toggleForm){
      this.props.actions.minimizeCourseTypeForm()
    } else {
      this.props.actions.expandCourseTypeForm(item.key)
    }    
  }


  renderForm(){
    if(this.toggleForm){
      return(<CourseTypeForm mode="modify" initialValues={this.props.item}/>)
    } else {
      return(<div></div>)
    }
              
  }

  render() {
    var buttonText = (this.toggleForm)? "Peru Muokkaus" : "Muokkaa"
    var removeButton = (this.confirmation)? "Vahvista poisto" : "Poista"

    const {item} = this.props 
    return (
      <li className="text-list-item">
        <span className="item-row">{this.props.item.name}</span>
        <span className="item-row">
          <button className="btn-small btn-blue" onClick={() => {this.toggleModify(item)}}>{buttonText}</button>
        </span>
        <span className="item-row">
          <button className="btn-small btn-red" onClick={() => {this.remove(item)}}>{removeButton}</button>
        </span>
        {this.renderForm(item)}
      </li>
    )
  }
}

function mapStateToProps(state) {
  return { cmp: state.courseTypeForm }
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actionCreators, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(CourseTypeItem)