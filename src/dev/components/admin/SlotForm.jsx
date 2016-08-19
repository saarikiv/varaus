import React from 'react'
import { reduxForm } from 'redux-form'
import { bindActionCreators } from 'redux'

import * as actionCreators from '../../actions/admin.js'

class SlotForm extends React.Component {

  onSubmit(props) {
    if(this.props.mode === "addNew"){
      this.props.actions.addSlot(props, 
      this.props.slotTypes.list.find((item) => {return item.key === props.slotType}),
      this.props.places.list.find((item) => {return item.key === props.place}),
      this.props.instructors.list.find((item) => {return item.key === props.instructor})
      )
    } else {
      this.props.actions.modifySlot(props, 
      this.props.itemkey, 
      this.props.slotTypes.list.find((item) => {return item.key === props.slotType}),
      this.props.places.list.find((item) => {return item.key === props.place}),
      this.props.instructors.list.find((item) => {return item.key === props.instructor})
      )
    }
    this.props.actions.minimizeSlotForm()
  }

  componentDidMount(){
    document.getElementById("slotFocusItem").focus()
  }


  renderSlotTypeOptions(item) {
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
    const { fields: { day, start, end, maxCapacity, slotType, instructor, place }, handleSubmit } = this.props

      return (
        <form onSubmit={handleSubmit(props => this.onSubmit(props))}>
          <label htmlFor="slotDay">Viikonpäivä</label>
          <select name="slotDay" {...day} value={day.value || ''}>
            <option>-- Valitse päivä --</option>
            <option value="1">Maanantai</option>
            <option value="2">Tiistai</option>
            <option value="3">Keskiviikko</option>
            <option value="4">Torstai</option>
            <option value="5">Perjantai</option>
            <option value="6">Lauantai</option>
            <option value="7">Sunnuntai</option>
          </select>

          <label htmlFor="slotStart">Alkaa klo.</label>
          <input type="number" id="slotFocusItem" name="slotStart" {...start} placeholder="esim: 800 tai 1000 tai 2130" />

          <label htmlFor="slotEnd">Loppuu klo.</label>
          <input type="number" name="slotEnd" {...end} placeholder="esim: 900 tai 1100 tai 2230" />

          <label htmlFor="slotMax">Maksimimäärä henkilöitä</label>
          <input type="number" name="slotMax" {...maxCapacity} placeholder="esim: 12 tai 1" />

          <label htmlFor="slotType">Kurssityyppi</label>
          <select name="slotType" {...slotType} value={slotType.value || ''}>
            <option>-- Valitse kurssityyppi --</option>
            {this.props.slotTypes.list.map(this.renderSlotTypeOptions)}
          </select>

          <label htmlFor="slotInstructor">Ohjaaja</label>
          <select name="slotInstructor" {...instructor} value={instructor.value || ''}>
            <option>-- Valitse ohjaaja --</option>
            {this.props.instructors.list.map(this.renderInstructorOptions)}
          </select>

          <label htmlFor="slotPlace">Paikka</label>
          <select name="slotPlace" {...place} value={place.value || ''}>
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
          <h2 className="header-collapse">Tunnin tiedot</h2>
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
    slotTypes: state.slotTypeList,
    instructors: state.instructorList,
    places: state.placeList
  }
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actionCreators, dispatch)}
}

export default reduxForm({
  form: 'SlotForm',
  fields: ['day', 'start', 'end', 'maxCapacity', 'slotType', 'instructor', 'place'],
  validate
}, mapStateToProps, mapDispatchToProps)(SlotForm)
