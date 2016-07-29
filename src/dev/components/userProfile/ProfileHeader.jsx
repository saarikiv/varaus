import React from "react"
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as authActionCreators from '../../actions/auth.js'
import * as userActionCreators from '../../actions/user.js'
import { Link } from 'react-router'

class ProfileHeader extends React.Component {

  static contextTypes = {
    router: React.PropTypes.object
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
    return (
      <div class="container bordered-container">
        <div className="content-container">
        <button className="btn-small btn-red float-right" onClick={this.handleLogout.bind(this)}>Kirjaudu ulos</button>
        <Link className="text-link back-btn" to="user">&lt;Takaisin</Link>
        <h1 className="padded-header">Käyttäjän hallinnointi</h1>        
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { auth: state.auth, currentUser: state.currentUser }
}

function mapDispatchToProps(dispatch) {
  return {
    authActions: bindActionCreators(authActionCreators, dispatch),
    userActions: bindActionCreators(userActionCreators, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileHeader)
