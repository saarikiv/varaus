import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as instructoractions from '../../actions/instructor.js'

class InstructorHeader extends React.Component {


  render() {
    var errorOut = null
    const { error } = this.props.instructor
    if(this.props.instructor.error.code !== "OK"){
      errorOut = <p>Error: {error.code} {error.message}</p>
    }
    return (
      <div class="container header-container">
        <div className="content-container">
          {errorOut}
          <h1>Opettajan sivu</h1>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { instructor: state.instructor }
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(instructoractions, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(InstructorHeader)
