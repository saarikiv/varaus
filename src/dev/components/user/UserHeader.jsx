import React from "react";
import { Link } from "react-router"
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as authActionCreators from '../../actions/auth.js'
import * as userActionCreators from '../../actions/user.js'
import {getDayStr,getTimeStr} from '../../helpers/timeHelper.js'

class UserHeader extends React.Component {

  constructor(){
    super();
    this.aikaLoppuu = new Date();
    this.onkoAikaa = false;
    this.count = 0;
    this.firstexpire = new Date();
  }

  componentWillMount(){
    if(this.props.curUsr.transactions.time != 0){
      this.aikaLoppuu.setTime(this.props.curUsr.transactions.time);
      this.onkoAikaa = true;
    }
    this.count = this.props.curUsr.transactions.count;
    this.firstexpire.setTime(this.props.curUsr.transactions.firstexpire);
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.curUsr.transactions.time != 0){
      this.aikaLoppuu.setTime(nextProps.curUsr.transactions.time);
      this.onkoAikaa = true;
    }
    this.count = nextProps.curUsr.transactions.count;
    this.firstexpire.setTime(nextProps.curUsr.transactions.firstexpire);
  }

  renderContent() {
    if(this.onkoAikaa){
      return (
        <div>
          <p>Voit käyttää kurssitarjontaamme <span className="use-times"> {getDayStr(this.aikaLoppuu)} </span> asti.</p>
        </div>
      )
    }
    else if(this.count > 0){
      return (
        <div>
          <p>Sinulla on <span className="use-times">{this.count}</span> kertalippua käytettävissä. Ensimmäinen vanhenee <span className="use-times"> {getDayStr(this.firstexpire)} </span>.</p>
        </div>
      )
    } else {
      return (
        <div>
          <p>Sinulla ei ole kertalippuja käytettävissä, eikä aikaa. Käy kaupassamme ostamassa kurssioikeuksia, jos haluat joogaamaan.</p>
        </div>
      )
    }
  }

  render() {

    const { roles, firstname } = this.props.curUsr;

    var admin = null;
    if(roles.admin === true){
      admin = <Link className="text-link float-right" to="admin">Admin</Link>
    }
    var instructor = null;
    if(roles.instructor === true){
      instructor = <Link className="text-link float-right" to="instructor">Opettaja</Link>
    }
    return (
      <div class="container bordered-container">
        <div className="content-container align-left">
          <Link className="text-link float-right" to="userProfile">Käyttäjätiedot</Link>
          {admin}
          {instructor}
          <h1 className="header-collapse">Hei, {firstname}!</h1>
          <p>Kirjautunut sähköpostilla: {this.props.curUsr.email}</p>                    
          {this.renderContent()}
          <Link className="text-link text-link-white" to="shop">Kauppaan</Link>
        </div>
      </div>
    )
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

export default connect(mapStateToProps, mapDispatchToProps)(UserHeader)
