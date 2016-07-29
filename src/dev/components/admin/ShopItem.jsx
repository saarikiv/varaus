import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as actionCreators from '../../actions/admin.js'
import FormCount from './ShopItemCountForm.jsx'
import FormTime from './ShopItemTimeForm.jsx'

class ShopItem extends React.Component {

  constructor(){
    super();
    this.toggleCountForm = false
    this.toggleTimeForm = false
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.cmpCount.expanded && nextProps.cmpCount.expander === this.props.item.key){
      this.toggleCountForm = true
    } else if (nextProps.cmpTime.expanded && nextProps.cmpTime.expander === this.props.item.key) {
      this.toggleTimeForm = true
    } else {
      this.toggleCountForm = false
      this.toggleTimeForm = false
    }
  }

  toggleCountModify(item){
    if(this.toggleCountForm){
      this.props.actions.minimizeCountShopForm()
    } else {
      this.props.actions.expandCountShopForm(item.key)
    }    
  }

  toggleTimeModify(item){
    if(this.toggleTimeForm){
      this.props.actions.minimizeTimeShopForm()
    } else {
      this.props.actions.expandTimeShopForm(item.key)
    }    
  }

  renderModifyButtons(item) {
    var buttonCountText = (this.toggleCountForm)? "Peru Muokkaus" : "Muokkaa"
    var buttonTimeText = (this.toggleTimeForm)? "Peru Muokkaus" : "Muokkaa"

    if (item.type === "count") {
      return <button className="btn-small btn-blue" onClick={() => {this.toggleCountModify(item)}}>{buttonCountText}</button>
    } else {
      return <button className="btn-small btn-blue" onClick={() => {this.toggleTimeModify(item)}}>{buttonTimeText}</button>
    }
  }
  
  renderLockButtons(item) {
    //TODO: fix according !user.locked
    //TODO: add button functionality
    if (item.locked) {
      return <button className="btn-small btn-green" onClick={() => this.props.actions.unlockShopItem(item.key)}>Ota käyttöön</button>      
    }
    else {
      return <button className="btn-small btn-red" onClick={() => this.props.actions.lockShopItem(item.key)}>Poista käytöstä</button>
    }
  }

  renderCountForm(item){
    if(this.toggleCountForm){
      return <FormCount mode="modify" dbKey={item.key} initialValues={item}/>
    } else {
      return(<div></div>)
    }
  }

  renderTimeForm(item){
    if(this.toggleTimeForm){
      return <FormTime mode="modify" dbKey={item.key} initialValues={item}/>
    } else {
      return(<div></div>)
    }
  }

  renderType(item) {
    if (item.type === "count") {
      return <span className="item-row">Kertakortti</span>
    } else if (item.type === "time") {
      return <span className="item-row">Aikakortti</span>
    } else {
      return <span className="item-row">EI TYYPPIÄ</span>
    }
  }
  
  render() {
    //TODO: Render functionality for admin
    const {item} = this.props

    return (
      <li className="text-list-item">
        <span className="item-row">{item.title}</span>
        {this.renderType(item)}
        <span className="item-row">
          {this.renderModifyButtons(item)}
        </span>
        <span className="item-row">
          {this.renderLockButtons(item)}
        </span>
        {this.renderCountForm(item)}
        {this.renderTimeForm(item)}
      </li>
    )
  }
}

function mapStateToProps(state) {
  return { cmpCount: state.shopItemCountForm, cmpTime: state.shopItemTimeForm }
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actionCreators, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(ShopItem)
