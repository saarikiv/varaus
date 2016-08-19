import React from 'react'
import { reduxForm } from 'redux-form'
import { bindActionCreators } from 'redux'

import * as actionCreators from '../../actions/admin.js'

class PlaceForm extends React.Component {

  onSubmit(props) {
    if(this.props.mode === "addNew"){
      this.props.actions.addPlace(props);
    } else {
      this.props.actions.modifyPlace(props);
    }
    this.props.actions.minimizePlaceForm();
  }

  renderContent() {
  
    var buttonText = (this.props.mode === "addNew")? "Luo" : "Päivitä"

    const { fields: { name, desc, address }, handleSubmit } = this.props

      return (
        <form onSubmit={handleSubmit(props => this.onSubmit(props))}>
          <label htmlFor="placeName">Paikan nimi</label>
          <input type="text" name="placeName" placeholder="esim: Joogakoulu Lauttasaari" {...name}/>

          <label htmlFor="placeAddress">Paikan osoite</label>
          <input type="text" name="placeAddress" placeholder="esim: Unioninkatu 45" {...address}/>

          <label htmlFor="placeDesc">Paikan kuvaus</label>
          <textarea type="text" name="placeDesc" placeholder="esim: Joogakoulu Lauttasaari on pieni ja rento joogastudio." {...desc}/>

          <button className="btn-small btn-blue" type="submit">{buttonText}</button>
        </form>
      )
  }

  render() {
    return (
      <div className="container transparent-bg">
       	<div className="surrounded-container">
          <h2 className="header-collapse">Paikan tiedot</h2>
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
  form: 'PlaceForm',
  fields: ['name', 'desc', 'address'],
  validate
}, null, mapDispatchToProps)(PlaceForm)
