import React from 'react'

export default class TimetableHeader extends React.Component {
  render() {
    return (
      <div class="container header-container">
        <div className="content-container">
          <h1 className="nomargin nopadding">Aikataulu</h1>
          <small className="text-fade margin-top margin-bottom small-info">Tästä voit varata paikkasi tunneille. Tunteja voi varata aina viikoksi eteenpäin.</small>
          <small className="text-fade margin-top margin-bottom small-info">Klikkaa tuntia avataksesi lisätiedot sekä ostaaksesi ja varataksesi paikka tunnilta</small>
        </div>
      </div>
    )
  }
}
