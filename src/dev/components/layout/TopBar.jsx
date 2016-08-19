import React from "react";
import { Link } from "react-router"
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as authActionCreators from '../../actions/auth.js'
import * as userActionCreators from '../../actions/user.js'
import {getDayStr,getTimeStr} from '../../helpers/timeHelper.js'
import Tickets from './Tickets.jsx'

class TopBar extends React.Component {  

  renderTickets() {
    return (
      <Tickets curUsr={this.props.curUsr} />
    )
  }

  componentWillMount() {
    this.setState({navOpen: false})
  }

  toggleNav() {
    if (this.state.navOpen) {
      this.setState({navOpen: false})
      document.getElementById("nav-btn").classList.remove("mobile-hidden")
      document.getElementById("nav-menu").classList.add("mobile-hidden")
      document.getElementById("tickets-info").classList.add("mobile-hidden")
    } else {
      this.setState({navOpen: true})
      document.getElementById("nav-btn").classList.add("mobile-hidden")
      document.getElementById("nav-menu").classList.remove("mobile-hidden")
      document.getElementById("tickets-info").classList.remove("mobile-hidden")
    }
  }

  handleLogout(){
    if(this.props.auth.uid){
      this.props.authActions.logout();
    }
    else {
      console.log("User not logged in. No action taken.");
    }
  }

  render() {

    const { roles, firstname, locked } = this.props.curUsr; 

    let admin = null
    let diagnostics = null
    let adminShop = null
    let userOverview = null
    if(roles.admin){
      admin = <Link className="text-link" to="admin" onClick={() => this.toggleNav()}>Admin</Link>
      diagnostics = <Link className="text-link" to="diagnostics" onClick={() => this.toggleNav()}>Diagnostiikka</Link>
      adminShop = <Link className="text-link text-green" to="shop" onClick={() => this.toggleNav()}>Admin-Kauppa</Link>
      userOverview = <Link className="text-link" to="useroverview" onClick={() => this.toggleNav()}>Käyttäjälista</Link>
    }
    let tests = null;
    if(roles.tester){
      tests = <Link className="text-link" to="tests" onClick={() => this.toggleNav()}>Test</Link>
    }
    let instructor = null;
    if(roles.instructor){
      instructor = <Link className="text-link" to="instructor" onClick={() => this.toggleNav()}>Opettaja</Link>
      adminShop = <Link className="text-link text-green" to="shop" onClick={() => this.toggleNav()}>Admin-Kauppa</Link>
    }

    if (this.props.curUsr.key != '0') {
      if(locked){
        return(
        <nav class="user-header-container">
          <div className="align-right">
            <img src="./assets/nav.png" className="nav-btn align-right desktop-hidden" id="nav-btn" alt="navigation" onClick={() => this.toggleNav()}/>
          </div>
          <div className="content-container">
            {this.renderTickets()}
            <div className="userinfo-container mobile-hidden" id="nav-menu">
              <div className="mobile-row">
                <a className="text-link text-fade" onClick={this.handleLogout.bind(this)}>Kirjaudu ulos</a>
              </div>
            </div>
          </div>
        </nav>
          
        )
      }
      return (
        <nav class="user-header-container">
          <div className="align-right">
            <img src="./assets/nav.png" className="nav-btn align-right desktop-hidden" id="nav-btn" alt="navigation" onClick={() => this.toggleNav()}/>
          </div>
          <div className="content-container">
            {this.renderTickets()}
            <div className="userinfo-container mobile-hidden" id="nav-menu">
              <div className="mobile-row">
                <Link className="text-link" to="user" onClick={() => this.toggleNav()}>Joogatunnit & varaukset</Link>
              </div>
              <div className="mobile-row">
                <Link className="text-link" to="specialCourses" onClick={() => this.toggleNav()}>Kurssit</Link>
              </div>
              <div className="mobile-row">
                {instructor}
              </div>
              <div className="mobile-row">
                {admin}
              </div>
              <div className="mobile-row">
                {userOverview}
              </div>
              <div className="mobile-row">
                {tests}
              </div>
              <div className="mobile-row">
                {diagnostics}
              </div>
              <div className="mobile-row">
                {adminShop}
              </div>
              <div className="mobile-row">
                <a className="text-link text-green" href="https://holvi.com/shop/4Z4CW4/" onClick={() => this.toggleNav()} target="_blank">Kauppa - Holvi</a>
              </div>
              <div className="mobile-row">
                <Link className="text-link text-fade" to="userProfile" onClick={() => this.toggleNav()}>Käyttäjätiedot</Link>
              </div>
              <div className="mobile-row">
                <Link className="text-link text-fade" to="feedback" onClick={() => this.toggleNav()}>Yhteystiedot & palaute</Link>
              </div>
              <div className="mobile-row">
                <a className="text-link text-fade" onClick={this.handleLogout.bind(this)}>Kirjaudu ulos</a>
              </div>
            </div>
          </div>
        </nav>
      )
    } else {
      return <div></div>
    }
    
  }

}
function mapStateToProps(state) {
  return { auth: state.auth, curUsr: state.currentUser }
}

function mapDispatchToProps(dispatch) {
  return {
    authActions: bindActionCreators(authActionCreators, dispatch),
    userActions: bindActionCreators(userActionCreators, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TopBar)
