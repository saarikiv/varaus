import React from 'react'
import { reduxForm } from 'redux-form'
import { bindActionCreators } from 'redux'

import * as actionCreators from '../../actions/admin.js'

class CourseForm extends React.Component {

  onSubmit(props) {
    if(this.props.mode === "addNew"){
      this.props.actions.addCourse(props, 
      this.props.courseTypes.list.find((item) => {return item.key === props.courseType}),
      this.props.places.list.find((item) => {return item.key === props.place}),
      this.props.instructors.list.find((item) => {return item.key === props.instructor})
      )
    } else {
      this.props.actions.modifyCourse(props, 
      this.props.itemkey, 
      this.props.courseTypes.list.find((item) => {return item.key === props.courseType}),
      this.props.places.list.find((item) => {return item.key === props.place}),
      this.props.instructors.list.find((item) => {return item.key === props.instructor})
      )
    }
    this.props.actions.minimizeCourseForm()
  }


  renderCourseTypeOptions(item) {
    return (
      <option key={item.key} value={item.key} >{item.key}</option>
    )
  }

  renderInstructorOptions(item) {
    return (
      <option key={item.key} value={item.key} >{item.firstname} {item.lastname}</option>
    )
  }

  renderPlaceOptions(item) {
    return (
      <option key={item.key} value={item.key} >{item.key}</option>
    )
  }

  renderContent() {
    var buttonText = (this.props.mode === "addNew")? "Luo" : "Päivitä"
    const { fields: { day, start, end, maxCapacity, courseType, instructor, place }, handleSubmit } = this.props

      return (
        <form onSubmit={handleSubmit(props => this.onSubmit(props))}>
          <label htmlFor="courseDay">Viikonpäivä</label>
          <select name="courseDay" {...day} value={day.value || ''}>
            <option>-- Valitse päivä --</option>
            <option value="1">Maanantai</option>
            <option value="2">Tiistai</option>
            <option value="3">Keskiviikko</option>
            <option value="4">Torstai</option>
            <option value="5">Perjantai</option>
            <option value="6">Lauantai</option>
            <option value="7">Sunnuntai</option>
          </select>

          <label htmlFor="courseStart">Alkaa klo.</label>
          <input type="number" name="courseStart" {...start} placeholder="esim: 800 tai 1000 tai 2130" />

          <label htmlFor="courseEnd">Loppuu klo.</label>
          <input type="number" name="courseEnd" {...end} placeholder="esim: 900 tai 1100 tai 2230" />

          <label htmlFor="courseMax">Maksimimäärä henkilöitä</label>
          <input type="number" name="courseMax" {...maxCapacity} placeholder="esim: 12 tai 1" />

          <label htmlFor="courseType">Kurssityyppi</label>
          <select name="courseType" {...courseType} value={courseType.value || ''}>
            <option>-- Valitse kurssityyppi --</option>
            {this.props.courseTypes.list.map(this.renderCourseTypeOptions)}
          </select>

          <label htmlFor="courseInstructor">Ohjaaja</label>
          <select name="courseInstructor" {...instructor} value={instructor.value || ''}>
            <option>-- Valitse ohjaaja --</option>
            {this.props.instructors.list.map(this.renderInstructorOptions)}
          </select>

          <label htmlFor="coursePlace">Paikka</label>
          <select name="coursePlace" {...place} value={place.value || ''}>
            <option>-- Valitse paikka --</option>
            {this.props.places.list.map(this.renderPlaceOptions)}
          </select>

          <button className="btn-small btn-blue" type="submit">{buttonText}</button>
        </form>
      )
  }

  render() {
    return (
      <div className="container transparent-bg">
        <div className="surrounded-container">
          <h2 className="header-collapse">Luo uusi vakiokurssi</h2>
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

function mapStateToProps(state) {
  return {
    courseTypes: state.courseTypeList,
    instructors: state.instructorList,
    places: state.placeList
  }
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actionCreators, dispatch)}
}

export default reduxForm({
  form: 'CourseForm',
  fields: ['day', 'start', 'end', 'maxCapacity', 'courseType', 'instructor', 'place'],
  validate
}, mapStateToProps, mapDispatchToProps)(CourseForm)
