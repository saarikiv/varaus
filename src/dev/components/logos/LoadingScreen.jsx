import React from "react";
import { Link } from "react-router"
import { connect } from 'react-redux'

class LoadingScreen extends React.Component {

  renderLoadingImage(success) {
    if (success === true) {
      return <img className="loading-img" src="./assets/success.png" />
    } else if (success === false) {
      return <img className="loading-img" src="./assets/error.png" />
    } else {
      return <img className="loading-img rolling" src="./assets/loading.png" />
    }
  }

  render() {
    const {loadingScreen} = this.props

    if(loadingScreen.visible){
      return (
        <div className="course-info-container">
          <div className="outer">
            <div className="middle">
              <div className="inner centered">
                {this.renderLoadingImage(loadingScreen.success)}
                <h3 className="text-bold"> {loadingScreen.context} </h3>
              </div>
            </div>
          </div>          
       </div>
      );
    } else {
      return (
        <div>
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  return { loadingScreen: state.loadingScreen }
}

export default connect(mapStateToProps, null )(LoadingScreen)
