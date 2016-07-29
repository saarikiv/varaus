import React from "react";
import Logo from '../components/logos/JoogakouluLogo.jsx'
import { bindActionCreators } from 'redux'
import { reduxForm } from 'redux-form'

import * as actionCreators from '../actions/user.js'

class ForgotPassword extends React.Component {

    static contextTypes = {
        router: React.PropTypes.object
        
    }

    onSubmit(props) {
        this.props.actions.resetPassword(props.email)
        this.context.router.push('/')
    }

    renderForm() {
        const { fields: { email }, handleSubmit } = this.props

        return (
            <form onSubmit={ handleSubmit(props => this.onSubmit(props)) }>
                <label htmlFor="email">Sähköposti</label>
                <input type="email" name="email" {...email}/>
                <button className="btn-small btn-blue" type="submit">Lähetä</button>
            </form>
        )        
    }

    render() {
        return (
            <div class="container centered">
                <Logo />
                <h2 className="centered login-header">Unohditko salasanasi?</h2>
                <small className="small-text">Anna sähköpostiosoitteesi. Lähetämme sinulle salasanan vaihtolinkin.</small>
                <small className="small-text">Sähköpostin saapumisessa voi kestää tovi.</small>
                <div className="content-container login-container">
                    {this.renderForm()}
                </div>
            </div>
        )
    }
}


function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actionCreators, dispatch) }
}

export default reduxForm({
  form: 'ForgotPasswordForm',
  fields: ['email']
}, null, mapDispatchToProps)(ForgotPassword)

