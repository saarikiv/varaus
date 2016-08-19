import React from 'react'
import { reduxForm } from 'redux-form'
import { bindActionCreators } from 'redux'
import * as actionCreators from '../../actions/admin.js'

var DatePicker = require('react-datepicker')
var moment = require('moment')

class SpecialSlotForm extends React.Component {

  constructor(){
    super();
    this.startDate = moment();
  }

  onDateChange(date){
    this.startDate = date;
    this.forceUpdate()
  }

  onSubmit(props) {
    props.date = this.startDate.valueOf()
    if(this.props.mode === "addNew"){
      this.props.actions.addSpecialSlot(props, 
      this.props.slotTypes.list.find((item) => {return item.key === props.slotType}),
      this.props.places.list.find((item) => {return item.key === props.place}),
      this.props.instructors.list.find((item) => {return item.key === props.instructor})
      )
    } else {
      this.props.actions.modifySpecialSlot(props, 
      this.props.itemkey, 
      this.props.slotTypes.list.find((item) => {return item.key === props.slotType}),
      this.props.places.list.find((item) => {return item.key === props.place}),
      this.props.instructors.list.find((item) => {return item.key === props.instructor})
      )
    }
    this.props.actions.minimizeSpecialSlotForm()
  }

  renderSlotTypeOptions(item) {
    return (
      <option key={item.key} value={item.key} >{item.key}</option>
    )
  }

  renderInstructorOptions(item) {
    return (
      <option key={item.key} value={item.uid} >{item.firstname} {item.lastname}</option>
    )
  }

  renderPlaceOptions(item) {
    return (
      <option key={item.key} value={item.key} >{item.key}</option>
    )
  }

  renderContent() {
    var buttonText = (this.props.mode === "addNew")? "Luo" : "Päivitä"
    const { fields: { title, start, end, maxCapacity, slotType, place, instructor, price, taxpercent }, handleSubmit } = this.props

    if (this.props.cmp.expanded) {
      return (
        <div>

        <form onSubmit={handleSubmit(props => this.onSubmit(props))}>
          <label htmlFor="SpecialTitle">Erikoiskurssin otsikko</label>
          <input type="text" name="SpecialTitle" {...title} placeholder="esim: Keskiyön jooga" />

          <label htmlFor="SpecialDate">Erikoiskurssin päivämäärä</label>
          <DatePicker className="date-input" selected={this.startDate} onChange={this.onDateChange.bind(this)} />

          <label htmlFor="SpecialStart">Alkaa klo.</label>
          <input type="number" name="SpecialStart" {...start} placeholder="esim: 800 tai 1000 tai 2130" />

          <label htmlFor="specialEnd">Loppuu klo.</label>
          <input type="number" name="specialEnd" {...end} placeholder="esim: 900 tai 1100 tai 2230" />

          <label htmlFor="specialMax">Maksimimäärä henkilöitä</label>
          <input type="number" name="specialMax" {...maxCapacity} placeholder="esim: 12 tai 1" />

          <label htmlFor="sslotType">Kurssityyppi</label>
          <select name="sslotType" {...slotType} value={slotType.value || ''}>
            <option>-- Valitse kurssityyppi --</option>
            {this.props.slotTypes.list.map(this.renderSlotTypeOptions)}
          </select>

          <label htmlFor="sslotInstructor">Ohjaaja</label>
          <select name="sslotInstructor" {...instructor} value={instructor.value || ''}>
            <option>-- Valitse ohjaaja --</option>
            {this.props.instructors.list.map(this.renderInstructorOptions)}
          </select>

          <label htmlFor="sslotPlace">Paikka</label>
          <select name="sslotPlace" {...place} value={place.value || ''}>
            <option>-- Valitse paikka --</option>
            {this.props.places.list.map(this.renderPlaceOptions)}
          </select>

          <label htmlFor="SCprice">Verollinen hinta</label>
          <input type="number" step="0.01" name="SCprice" {...price} placeholder="esim: 10.5 tai 50" />

          <label htmlFor="SCtaxp">Veroprosentti</label>
          <input type="number" step="0.01" name="SCtaxp" {...taxpercent} placeholder="esim: 10.5 tai 50" />

          <button className="btn-small btn-blue" type="submit">{buttonText}</button>
        </form>
        </div>
      )
    }
    else {
      return <div></div>
    }
  }

  renderExpandButton() {
    if(this.props.cmp.expanded) {
      return <button className="expand-btn" onClick={() => this.props.actions.minimizeSpecialSlotForm()}>Piilota</button>
    }
    else {
      return <button className="expand-btn" onClick={() => this.props.actions.expandSpecialSlotForm()}>Avaa</button>
    }
  }

  render() {
    return (
      <div className="container transparent-bg">
        <div className="surrounded-container">
          <h2 className="header-collapse">Kurssin tiedot</h2>
          {this.renderExpandButton()}
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
    cmp: state.specialSlotForm,
    slotTypes: state.slotTypeList,
    instructors: state.instructorList,
    places: state.placeList
  }
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actionCreators, dispatch)}
}

export default reduxForm({
  form: 'SpecialSlotForm',
  fields: ['title', 'start', 'end', 'maxCapacity', 'slotType', 'place', 'instructor', 'price', 'taxpercent'],
  validate
}, mapStateToProps, mapDispatchToProps)(SpecialSlotForm)
