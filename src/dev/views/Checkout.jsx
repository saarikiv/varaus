import React from "react";
import { Link } from "react-router"

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import UserList from '../components/admin/UserList.jsx'
import * as actionCreators from '../actions/shop.js'


var Braintree = require("braintree-web");
import DropIn from "../components/shop/BraintreeDropIn.jsx";

class Checkout extends React.Component {

  constructor(){
    super()
    this.paymentOngoing = false;
    this.buyingSpecialCourse = false;
  }

  static contextTypes = {
    router: React.PropTypes.object
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.shopItems.cart.type){
      if(nextProps.shopItems.cart.type === "special"){
        this.buyingSpecialCourse = true
      } else {
        this.buyingSpecialCourse = false
      }
    }
    if(nextProps.shopItems.phase === "timeout"){
      this.context.router.push('user');
    }
  }

  componentWillMount(){

  }

  onReady() {
      document.getElementById("submitButton").disabled = false;
  }

  onError(err) {
        //Drop-in error. Transient. No action.
        console.error(err);
  }

  onPaymentMethodReceived(payload) {
    if(!this.paymentOngoing){
      this.paymentOngoing = true;
      this.props.actions.doPurchaseTransaction(payload.nonce, this.props.shopItems.cart.key, this.props.shopItems.cart.type)
    }
  }

//=================================================================
//Render logic
//=================================================================

renderCashPayment(){
    return( <UserList /> )
}

  renderStartPhase(){
    return(
      <div>
        <h2 className="centered">Alustetaan maksuyhteyttä...</h2>
        </div>
    )
  }

  renderDonePhase(){
    if(this.buyingSpecialCourse){
      this.props.actions.waitForMilliseconds(300); //Set this to define how long the done phase is displayed 
      return(
        <div>
        </div>
      )
    }
    this.props.actions.waitForMilliseconds(300);
    return(
      <div>
      </div>
    )
  }

  renderError(){
    return(
      <div>
        <h2 className="centered">Maksuyhteydessä ongelmia...</h2>
        </div>
    )
  }

  renderPayment(){
    return (
          <div>
            <h2 className="centered">Valitse maksutapa ja vahvista maksu.</h2>
            <form action='/transactions' method='POST'>
                <DropIn
                    braintree={Braintree}
                    clientToken={this.props.shopItems.token}
                    onReady={this.onReady.bind(this)}
                    onError={this.onError.bind(this)}
                    onPaymentMethodReceived={this.onPaymentMethodReceived.bind(this)}
                />
              <br></br>
              <p>{this.props.shopItems.cart.title}</p><br></br>
              <p>Hinta: {this.props.shopItems.cart.price} € </p>
              <input type='submit' id="submitButton" disabled='true' className="btn-small btn-blue" value='Vahvista!'></input>
            </form>
          </div>
    );
  }

  render() {
    switch(this.props.shopItems.phase){
      case "cashPayment":
        return this.renderCashPayment()
      case "braintreePayment":
          this.paymentOngoing = false;
          return this.renderStartPhase()
      case "tokenReceived":
        return this.renderPayment()
      case "done":
        return this.renderDonePhase()
      case "error":
        return this.renderError()
      case "timeout":
        return(<p> Palataan takaisin päänäkymään.</p>)
      default:
      return (<p>ERROR</p>)
    }
  }
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actionCreators, dispatch) }
}

function mapStateToProps(state) {
  return { shopItems: state.shopItems, currentUser: state.currentUser }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
