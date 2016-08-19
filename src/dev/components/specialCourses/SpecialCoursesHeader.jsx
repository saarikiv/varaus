import React from 'react'

export default class SpecialCoursesHeader extends React.Component {
  render() {
    return (
      <div class="container header-container">
        <div className="content-container">
          <h1 className="nomargin nopadding">Kurssit</h1>
          <small className="text-fade margin-top margin-bottom small-info">Tässä näet kurssitarjontamme.</small>
          <small className="text-fade margin-top margin-bottom small-info">Klikkaa kurssia avataksesi lisätiedot sekä ostaaksesi ja varataksesi paikka kurssilta</small>
        </div>
      </div>
    )
  }
}
