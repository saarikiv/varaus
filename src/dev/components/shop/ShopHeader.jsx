import React from 'react'

export default class ShopHeader extends React.Component {
  render() {
    return (
      <div class="container header-container">
        <div className="content-container">
          <h1>Kauppa</h1>
          <small className="text-fade margin-top margin-bottom small-info">Saunomaan!</small>
        </div>
      </div>
    )
  }
}
