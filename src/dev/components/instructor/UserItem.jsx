import React from 'react'

export default class UserItem extends React.Component {


  render() {
   const { name } = this.props.item
    return (
      <li>
      <p>{name}</p>
      </li>
    );
  }
}

