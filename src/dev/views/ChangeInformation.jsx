import React from "react";
import { Link } from 'react-router'
import { bindActionCreators } from 'redux'
import { reduxForm } from 'redux-form'

import * as actionCreators from '../actions/auth.js'

class ChangeInformation extends React.Component {

  constructor(){
    super();
  }

  componentWillReceiveProps(nextProps){
  }

  onSubmit(props) {

  }

  renderForm() {
    const { fields: { email, password, firstname, lastname }, handleSubmit } = this.props

    return (
      <form>
        <h1>Käyttäjätiedot</h1>
        <label htmlFor="email">Sähköposti</label>
        <input  type="email" name="email" {...email}/>
        <label htmlFor="password">Salasana</label>
        <input type="password" name="password" placeholder="Salasana" {...password}/>
        <label htmlFor="firstname">Etunimi</label>
        <input type="text" name="firstname" placeholder="Etunimi" {...firstname}/>
        <label htmlFor="lastname">Sukunimi</label>
        <input type="text" name="lastname" placeholder="Sukunimi" {...lastname}/>
        <button className="btn-small btn-blue" type="submit">Päivitä tiedot</button>
      </form>
    )
  }

  render() {
    return (
      <div class="container">
        <div className="content-container">
          <Link className="text-link back-btn" to="user">&lt;Takaisin</Link>
          {this.renderForm()}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { auth: state.auth, currentUser: state.currentUser }
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actionCreators, dispatch) }
}

export default reduxForm({
  form: 'ChangeInformationForm',
  fields: ['email', 'password', 'firstname', 'lastname']
}, mapStateToProps, mapDispatchToProps)(ChangeInformation)
