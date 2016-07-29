import React from "react";
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as actionCreators from '../../actions/shop.js'

class ShopItem extends React.Component {

  static contextTypes = {
    router: React.PropTypes.object
  }

  handleClick(e){
    e.preventDefault();
    this.props.actions.addToCart(this.props.item);
    this.props.actions.getClientTokenFromBraintree()
    this.context.router.push('checkout');

  }

  cashPurchase(e){
    e.preventDefault();
    this.props.actions.addToCart(this.props.item);
    this.props.actions.buyWithCash();
    this.context.router.push('checkout');

  }

  renderExpire() {
    if (this.props.item.type === "count") {
      return (
        <p className="item-expiration">Käyttöaikaa {this.props.item.expiresAfterDays} päivää</p>
      )
    }
    else {
      return (
        <div></div>
      )
    }
  }

  render() {
    let admin = null;
    if(this.props.admin){
      admin = <button className="btn-small btn-blue" onClick={this.cashPurchase.bind(this)} >Käteisosto</button>
    }
    return (
      <li>
        <h3 className="item-title">{this.props.item.title}</h3>
        <p className="item-desc">{this.props.item.desc}</p>
        {this.renderExpire()}
        <p class="item-price">{this.props.item.price} €</p>
        <span className="item-row">
          <button className="btn-small btn-blue btn-link" onClick={this.handleClick.bind(this)} >Osta</button>
        </span>
        <span className="item-row">
          {admin}
        </span>
      </li>
    );
  }
}


function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actionCreators, dispatch) }
}

export default connect(null, mapDispatchToProps)(ShopItem)
