import axios from 'axios'
import {
    FETCH_INSTRUCTOR_DATA,
    INSTRUCTOR_ERROR,
    ACTIVATE_COURSE,
    ACTIVATION_FAILED,
    CANCEL_COURSE,
    COURSE_CANCEL_ERROR
} from './actionTypes.js'

import {
    _hideLoadingScreen,
    _showLoadingScreen
} from './loadingScreen.js'

import {
    hasTimePassed,
    getCourseTimeLocal
} from '../helpers/timeHelper.js'


export function activateCourse(course) {
    return dispatch => {
        firebase.database().ref('/cancelledCourses/' + course.key + '/' + course.cancelInfo.instance).remove()
        .then(()=>{
            dispatch({
              type: ACTIVATE_COURSE,
              payload: {course}
            })
        })
        .catch(error => {
          dispatch({
            type: ACTIVATION_FAILED,
            payload: {error, course}
          })
            console.error("Course activation failed: ", error);
        })
    }
}

export function postCanceCourse(course, booking, reason = "undefined") {
    let weekIndex = (hasTimePassed(course.day, course.start))? 1 : 0;
    let instance = getCourseTimeLocal(weekIndex, course.start, course.day)
    let participants = [];
    if(booking){
        participants = booking.participants;
    }
    var JOOGAURL = typeof(JOOGASERVER) === "undefined" ? 'http://localhost:3000/cancelcourse' : JOOGASERVER + '/cancelcourse'
    return dispatch => {
        _showLoadingScreen(dispatch, "Perutaan tuntia")
        firebase.auth().currentUser.getToken(true).then(idToken => {
            axios.post(
                    JOOGAURL, {
                        current_user: idToken,
                        course_instance: instance.getTime(),
                        course_info: course,
                        participant_list: participants,
                        reason: reason
                    })
                .then(response => {
                  dispatch({
                    type: CANCEL_COURSE,
                    payload: {course, response: response.data, reason}
                  })
                    _hideLoadingScreen(dispatch, "Tunti peruttu", true)
                })
                .catch(error => {
                  dispatch({
                    type: COURSE_CANCEL_ERROR,
                    payload: {error, course}
                  })
                    console.error(error);
                    _hideLoadingScreen(dispatch, "Tunnin perumisesa tapahtui virhe: " + error.data.message, false)
                });
        }).catch(error => {
            console.error("Failde to get authentication token for current user: ", error);
            _hideLoadingScreen(dispatch, "Tunnin perumisesa tapahtui virhe: " + error.message, false)
        });
    }
}


export function setInstructorData(course, booking) {
    return dispatch => {
        var returnObject = {}
        returnObject = Object.assign({
            visible: true,
            course,
            booking: booking.all
        })
        dispatch({
            type: FETCH_INSTRUCTOR_DATA,
            payload: returnObject
        });
    }
}

export function clearInstructorData() {
    return dispatch => {
        dispatch({
            type: FETCH_INSTRUCTOR_DATA,
            payload: {
                visible: false,
                course: {},
                booking: []
            }
        });
    }
}
