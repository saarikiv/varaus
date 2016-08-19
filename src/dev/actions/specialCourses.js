import { FETCH_SPECIAL_COURSES_BANNER,
         FETCH_SPECIAL_COURSES,
         PUT_SPECIAL_COURSE_INFO,
         REMOVE_SPECIAL_COURSE_INFO,
         FETCH_SPECIAL_COURSES_BOOKINGS,
         ADD_USER_TO_SC_BOOKINGS
          } from './actionTypes.js'

const CoursesRef = firebase.database().ref('/specialCourses/')



function convertIdToName(dispatch,userIdList, courseKey){
    userIdList.map(uid => {
      firebase.database().ref('/users/'+ uid).once('value').then(snapshot => {
        let user = snapshot.val()
        dispatch({
          type: ADD_USER_TO_SC_BOOKINGS,
          payload: {
            key: courseKey, 
            user: user.firstname + " " + user.lastname}
        })
      })
      .catch(err => { 
        console.error("Conversion error: ", err);
        reject(err)
      })
    })
}

export function fetchSpecialCourseBookings(instructor = null){
  var returnObject = Object.assign({})
  var userIdList = Object.assign([]);
  return dispatch => {
    firebase.database().ref('scbookingsbycourse').on('value', snapshot => {
      var one = null
      var counter = 0
      var oneuser = null
      var all = snapshot.val()
      for (one in all){
        counter = 0
        userIdList = Object.assign([]);
        for (oneuser in all[one]){
          counter++
          userIdList = userIdList.concat(oneuser)
        }
        if(instructor !== null){
          convertIdToName(dispatch, userIdList, one)
        }
        returnObject[one] = {
          counter: counter
        }
      }
      dispatch({
        type: FETCH_SPECIAL_COURSES_BOOKINGS,
        payload: {bookings: returnObject, bookingsReady: true}
      })
    }, error => {
      console.error("Error fetching special course bookings: ", error);
    })
  }
}

export function stopSpecialCourseBookings(){
  return dispatch => {
    firebase.database().ref('scbookingsbycourse').off('value')
    dispatch({
      type: FETCH_SPECIAL_COURSES_BOOKINGS,
      payload: {bookings: {}, bookingsReady: false}
    })
  }
}

export function fetchSpecialCoursesBanner(instructor = null) {
  var list = Object.assign([])
  var now = new Date()
  return dispatch => {
    CoursesRef.once('value', snapshot => {
      var specialCourses = snapshot.val()
      for (var key in specialCourses) {
          if((instructor === null || specialCourses[key].instructor.uid === instructor) && specialCourses[key].date > now){
            specialCourses[key].key = key
            list = list.concat(specialCourses[key])
          }
      }
      list.sort(function(a, b) {
        return a.date - b.date
      })
      dispatch({
        type: FETCH_SPECIAL_COURSES_BANNER,
        payload: {
          fetchReady: true,
          banner: list
        }
      })
    })
  }
}

export function putSpecialCourseInfo(course) {
  return {
    type: PUT_SPECIAL_COURSE_INFO,
    payload: course
  }
}

export function removeSpecialCourseInfo() {
  return {
    type: REMOVE_SPECIAL_COURSE_INFO
  }
}
