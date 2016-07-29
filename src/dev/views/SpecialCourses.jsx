import React from "react";

import SpecialCoursesHeader from '../components/specialCourses/SpecialCoursesHeader.jsx'
import SpecialCoursesList from '../components/specialCourses/SpecialCoursesList.jsx'

export default class SpecialCourses extends React.Component {
  render() {
    return (
      <div>
        <SpecialCoursesHeader />
        <SpecialCoursesList />
      </div>
    );
  }
}
