import React from "react";

export default class SpecialCoursesItem extends React.Component {
  render() {
    const { item } = this.props
    return (
      <li>
        <h3 className="item-title">{item.courseType.name}</h3>
        <p className="item-time">{item.date}, klo {item.start/36000} - {item.end/36000}</p>
        <p className="item-desc">{item.courseType.desc}</p>
        <p className="item-instructor">Joogaopettaja: {item.instructor.firstname} {item.instructor.lastname}</p>
        <p className="item-users">Ilmoittautuneet: X/{item.maxCapacity}</p>
        <a href="#" className="btn-small btn-blue">Ilmoittaudu</a>
      </li>
    );
  }
}
