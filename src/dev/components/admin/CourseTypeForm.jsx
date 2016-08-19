import React from 'react'
import { reduxForm } from 'redux-form'
import { bindActionCreators } from 'redux'

import * as actionCreators from '../../actions/admin.js'

class CourseTypeForm extends React.Component {

  onSubmit(props) {
    if(this.props.mode === "addNew"){
      this.props.actions.addCourseType(props)
    } else {
      this.props.actions.modifyCourseType(props)
    }
    this.props.actions.minimizeCourseTypeForm()
  }

  renderContent() {

    var buttonText = (this.props.mode === "addNew")? "Luo" : "Päivitä"

    const { fields: { name, desc }, handleSubmit } = this.props

      return (
        <form onSubmit={handleSubmit(props => this.onSubmit(props))}> 
          <label htmlFor="courseType">Kurssityypin nimi</label>
          <input type="text" name="courseType" placeholder="esim: Flow jooga" {...name}/>

          <label htmlFor="courseDesc">Kurssityypin kuvaus</label>
          <textarea type="text" name="courseDesc" placeholder="esim: Flow jooga on rentoa joogaa." {...desc}/>

          <button className="btn-small btn-blue" type="submit">{buttonText}</button>
        </form>
      )
  }

 
  render() {    
    return (
      <div className="container transparent-bg">
        <div className="surrounded-container">
          <h2 className="header-collapse">Kurssityypin tiedot</h2>
          {this.renderContent()}
        </div>
      </div>
    )
  }
}

function validate(values) {
  const errors = {}
  return errors;
  // TODO: form validation
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actionCreators, dispatch)}
}

export default reduxForm({
  form: 'CourseTypeForm',
  fields: ['name', 'desc'],
  validate
}, null, mapDispatchToProps)(CourseTypeForm)
