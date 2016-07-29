import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import ShopItem from './ShopItem.jsx'
import * as shopActionCreators from '../../actions/shop.js'

class ShopList extends React.Component {
  componentWillMount() {
    this.props.shopActions.fetchShopItems()
  }
  componentWillUnmount(){
  }

  componentWillReceiveProps(nextProps){
  }

  renderShopItems(item) {
    return (
      <ShopItem key={item.key} item={item} admin={this.props.currentUser.roles.admin}/>
    )
  }

  render() {
    if(this.props.shopItems.items.length > 0){
      return (
        <div className="container">
          <div className="content-container align-left">
            <ul className="wide-list">
              {this.props.shopItems.items.map(this.renderShopItems.bind(this))}
            </ul>
          </div>
        </div>
      )
    } else {
        return(<div></div>)
    }
  }
}

function mapStateToProps(state) {
  return {
    shopItems: state.shopItems,
    currentUser: state.currentUser,
    auth: state.auth
  }
}

function mapDispatchToProps(dispatch) {
  return {
    shopActions: bindActionCreators(shopActionCreators, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShopList)
