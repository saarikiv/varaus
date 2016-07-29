import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import CourseForm from '../../components/admin/SpecialCourseForm.jsx'
import { getTimeStrMsBeginnignOfDay, toHplusMfromMs } from '../../helpers/timeHelper.js'
import * as actionCreators from '../../actions/admin.js'


class SpecialCourseItem extends React.Component {

  constructor(){
    super()
    this.toggleForm = false
    this.initialValues = {};
    this.confirmation = false;
    this.timeoutId = 0;
  }

 componentWillReceiveProps(nextProps){
      if(nextProps.cmp.expanded && nextProps.cmp.expander === this.props.item.key){
        this.toggleForm = true;
      } else {
        this.toggleForm = false;
      }
      this.initialValues = Object.assign({},nextProps.item) 
      this.initialValues.start = toHplusMfromMs(nextProps.item.start)
      this.initialValues.end = toHplusMfromMs(nextProps.item.end)
      this.initialValues.courseType = nextProps.item.courseType.name
      this.initialValues.place = nextProps.item.place.name
      this.initialValues.instructor = nextProps.item.instructor.key
  }
  
  componentWillUnmount(){
    if(this.timeoutId !== 0){
      clearTimeout(this.timeoutId);
    }
  }

  remove(item){
     if(this.confirmation){
      this.props.actions.removeSpecialCourse(item.key);
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
      this.props.actions.minimizeSpecialCourseForm()
    } else {
      this.props.actions.expandSpecialCourseForm(item.key)
    }    
  }

  renderForm(item){
    if(this.toggleForm){
      return(<CourseForm mode="modify" itemkey={item.key} initialValues={this.initialValues}/>)
    } else {
      return(<div></div>)
    }    
  }


  renderContent() {
    const {item} = this.props
    
    return (
      <div>
        <span className="item-row">{item.title}</span>
        <span className="item-row">{item.courseType.name}</span>
      </div>
    )
  }
  
  render() {
    var buttonText = (this.toggleForm)? "Peru Muokkaus" : "Muokkaa"
    var removeButton = (this.confirmation)? "Vahvista poisto" : "Poista"

    const {item} = this.props;
    return (
      <li className="text-list-item">        
        {this.renderContent()}
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
  return { cmp: state.specialCourseForm }
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actionCreators, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(SpecialCourseItem)