import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Item from './UserItem.jsx'
import * as actionCreators from '../../actions/admin.js'

class UserList extends React.Component {
  componentWillMount() {
    this.props.actions.fetchUserList()
  }

  renderList(item) {
    return (
      <Item key={item.key} item={item} />
    )
  }

  renderContent() {
    if (this.props.list.expanded || this.props.shopItems.phase === "cashPayment") {
      return (
        <ul className="wide-list">
          {this.props.list.list.map(this.renderList.bind(this))}
        </ul>
      )
    }
    else {
      return <div></div>
    }
  }

  renderExpandButton() {
    if(this.props.shopItems.phase === "cashPayment") return null;
    if(this.props.list.expanded) {
      return <button className="expand-btn" onClick={() => this.props.actions.minimizeUserList()}>Piilota</button>
    }
    else {
      return <button className="expand-btn" onClick={() => this.props.actions.expandUserList()}>Avaa</button>
    }
  }

  render() {
    return (
      <div className="container bordered-container">
        <div className="content-container align-left">
          <h2 className="header-collapse">Käyttäjät</h2>
          {this.renderExpandButton()}
          {this.renderContent()}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { list: state.userList, shopItems: state.shopItems }
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actionCreators, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(UserList)
