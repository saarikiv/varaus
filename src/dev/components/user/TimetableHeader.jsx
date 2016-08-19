import React from 'react'

export default class TimetableHeader extends React.Component {
  render() {
    return (
      <div class="container header-container">
        <div className="content-container">
          <h1 className="nomargin nopadding">Varaukset</h1>
          <small className="text-fade margin-top margin-bottom small-info">Tästä voit varata saunavuorosi. Vuoroja voi varata aina viikoksi eteenpäin.</small>
        </div>
      </div>
    )
  }
}