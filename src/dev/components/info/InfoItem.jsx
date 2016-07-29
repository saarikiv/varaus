import React from 'react'

export default class InfoItem extends React.Component {
  render() {
    const { item } = this.props
    return (
      <li>
        <h2>{item.title}</h2>
        <p>{item.content}</p>
      </li>
    );
  }
}
