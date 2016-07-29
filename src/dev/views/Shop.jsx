import React from 'react'

import ShopList from '../components/shop/ShopList.jsx'
import ShopHeader from '../components/shop/ShopHeader.jsx'

export default class Shop extends React.Component {
  render() {
    return (
      <div>
        <ShopHeader />
        <ShopList />
      </div>
    );
  }
}
