import axios from 'axios'
import {
    FETCH_INSTRUCTOR_DATA,
    INSTRUCTOR_ERROR
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
            console.log("Course activated again.");
        })
        .catch(error => {
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
        _showLoadingScreen(dispatch, "Perutaan kurssia")
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
                    console.log(response.data);
                    _hideLoadingScreen(dispatch, "Kurssi peruttu", true)
                })
                .catch(error => {
                    console.error(error);
                    _hideLoadingScreen(dispatch, "Kurssin perumisesa tapahtui virhe: " + error.data.message, false)
                });
        }).catch(error => {
            console.error("Failde to get authentication token for current user: ", error);
            _hideLoadingScreen(dispatch, "Kurssin perumisesa tapahtui virhe: " + error.message, false)
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