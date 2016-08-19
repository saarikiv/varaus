import axios from 'axios'

import {
    FETCH_COURSE_BOOKINGS,
    CHANGE_LOADINGSCREEN_STATE,
    BOOK_A_COURSE,
    LATE_BOOK_A_COURSE,
    BOOKING_ERROR,
    CANCEL_ERROR,
    CANCEL_RESERVATION
} from './actionTypes.js'

import {
    _hideLoadingScreen,
    _showLoadingScreen
} from './loadingScreen.js'


export function postCancellation(item, txRef, courseInfo) {
    var JOOGAURL = typeof(JOOGASERVER) === "undefined" ? 'http://localhost:3000/cancelSlot' : JOOGASERVER + '/cancelSlot'
    return dispatch => {
        _showLoadingScreen(dispatch, "Perutaan varausta")
        let now = new Date();
        firebase.auth().currentUser.getToken(true).then(idToken => {
            axios.post(
                    JOOGAURL, {
                        user: idToken,
                        courseInfo: courseInfo,
                        cancelItem: item,
                        transactionReference: txRef,
                        timezoneOffset: now.getTimezoneOffset() * 60 * 1000
                    })
                .then(response => {
                  dispatch({
                    type: CANCEL_RESERVATION,
                    payload: {courseInfo, txRef}
                  })
                    _hideLoadingScreen(dispatch, "Varaus peruttu", true)
                })
                .catch(error => {
                  dispatch({
                    type: CANCEL_ERROR,
                    payload: {error, courseInfo, txRef}
                  })
                    console.error(error);
                    _hideLoadingScreen(dispatch, "Varauksen perumisesa tapahtui virhe: " + error.data, false)
                });
        }).catch(error => {
            console.error("Failde to get authentication token for current user: ", error);
            _hideLoadingScreen(dispatch, "Varauksen perumisesa tapahtui virhe: " + error.toString(), false)
        });
    }
}

export function postLateReservation(forUser, weeksBehind, courseInfo) {
    var JOOGAURL = typeof(JOOGASERVER) === "undefined" ? 'http://localhost:3000/reserveLateSlot' : JOOGASERVER + '/reserveLateSlot'
    return dispatch => {
        _showLoadingScreen(dispatch, "Varataan tuntia jälkikäteen")
        let now = new Date();
        firebase.auth().currentUser.getToken(true).then(idToken => {
            axios.post(
                    JOOGAURL, {
                        user: idToken,
                        forUser: forUser,
                        courseInfo: courseInfo,
                        weeksBehind: weeksBehind,
                        timezoneOffset: now.getTimezoneOffset() * 60 * 1000
                    })
                .then(response => {
                  dispatch({
                    type: LATE_BOOK_A_COURSE,
                    payload: {courseInfo}
                  })
                    _hideLoadingScreen(dispatch, "Varaus onnistui", true)
                })
                .catch(error => {
                  dispatch({
                    type: BOOKING_ERROR,
                    payload: {error, courseInfo}
                  })
                    console.error(error);
                    _hideLoadingScreen(dispatch, "Varauksen tekemisessä tapahtui virhe: " + error.data, false, 5000)
                });
        }).catch(error => {
            console.error("Failde to get authentication token for current user: ", error);
            _hideLoadingScreen(dispatch, "Varauksen tekemisessä tapahtui virhe: " + error.toString(), false)
        });
    }
}



export function postReservation(forward, courseInfo) {
    var JOOGAURL = typeof(JOOGASERVER) === "undefined" ? 'http://localhost:3000/reserveSlot' : JOOGASERVER + '/reserveSlot'
    return dispatch => {
        _showLoadingScreen(dispatch, "Varataan tuntia")
        let now = new Date();
        firebase.auth().currentUser.getToken(true).then(idToken => {
            axios.post(
                    JOOGAURL, {
                        user: idToken,
                        courseInfo: courseInfo,
                        weeksForward: forward,
                        timezoneOffset: now.getTimezoneOffset() * 60 * 1000
                    })
                .then(response => {
                  dispatch({
                    type: BOOK_A_COURSE,
                    payload: {courseInfo}
                  })
                    _hideLoadingScreen(dispatch, "Varaus onnistui", true)
                })
                .catch(error => {
                  dispatch({
                    type: BOOKING_ERROR,
                    payload: {error, courseInfo}
                  })
                    console.error(error);
                    _hideLoadingScreen(dispatch, "Varauksen tekemisessä tapahtui virhe: " + error.data, false)
                });
        }).catch(error => {
            console.error("Failde to get authentication token for current user: ", error);
            _hideLoadingScreen(dispatch, "Varauksen tekemisessä tapahtui virhe: " + error.toString(), false)
        });
    }
}

function processBookings(inputBookings, uid, bookings, userbookings) {
    let instanceId;
    let instanceObj;
    let booking = {}
    let user;
    let index = 0;
    for (instanceId in inputBookings) {
        //Booking is in the future - it counts!!
        if (instanceId > Date.now()) {
            booking.instance = instanceId;
            booking.reservations = 0;
            booking.participants = [];
            instanceObj = inputBookings[instanceId];
            for (user in instanceObj) {
                booking.reservations++;
                booking.participants.push({
                    key: user,
                    name: instanceObj[user].user,
                    transactionReference: instanceObj[user].transactionReference
                });
                if (user === uid) {
                    userbookings.push(Object.assign({
                        item: instanceId,
                        txRef: instanceObj[user].transactionReference
                    }));
                }
            }
            bookings.push(Object.assign({}, booking))
            index++;
        }
    }
    userbookings.sort((a, b) => {
        return a.item - b.item
    });
    bookings.sort((a, b) => {
        return a.instance - b.instance
    })
}

export function fetchCourseBookings(coursekey, uid) {
    var bookings = [];
    var userbookings = [];

    return dispatch => {
        var bkns = {};
        var returnObject;
        //Clear the booking details in case there are no bookings and the
        firebase.database().ref('/bookingsbycourse/' + coursekey).on('value', snapshot => {
            bkns = snapshot.val();
            bookings = Object.assign([]);
            userbookings = Object.assign([]);
            processBookings(bkns, uid, bookings, userbookings)
            returnObject = Object.assign({})
            returnObject[coursekey] = {
                all: bookings,
                user: userbookings
            }
            dispatch({
                type: FETCH_COURSE_BOOKINGS,
                payload: returnObject
            })
        }, err => {
            console.error("Error is fetching bookingsbycourse: ", err);
        });
    }
}

export function stopfetchCourseBookings(coursekey) {
    return dispatch => {
        firebase.database().ref('/bookingsbycourse/' + coursekey).off('value');
    }
}
