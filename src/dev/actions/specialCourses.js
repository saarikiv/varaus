import { FETCH_SPECIAL_COURSES_BANNER,
         FETCH_SPECIAL_COURSES,
         PUT_SPECIAL_COURSE_INFO,
         REMOVE_SPECIAL_COURSE_INFO,
         FETCH_SPECIAL_COURSES_BOOKINGS
          } from './actionTypes.js'

const CoursesRef = firebase.database().ref('/specialCourses/')

export function fetchSpecialCourses() {
  var list = Object.assign([])
  return dispatch => {
    CoursesRef.once('value', snapshot => {
      var specialCourses = snapshot.val()
      for (var key in specialCourses) {
          let courseItemWithKey = specialCourses[key]
          courseItemWithKey.key = key
          list = list.concat(courseItemWithKey)
      }
      dispatch({
        type: FETCH_SPECIAL_COURSES,
        payload: list
      })
    })
  }
}

export function fetchSpecialCourseBookings(){
  var returnObject = Object.assign({})
  return dispatch => {
    firebase.database().ref('scbookingsbycourse').on('value', snapshot => {
      var one = null
      var counter = 0
      var oneuser = null
      var all = snapshot.val()
      for (one in all){
        counter = 0
        for (oneuser in all[one]){
          counter++
        }
        returnObject[one] = counter
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

export function fetchSpecialCoursesBanner() {
  var list = Object.assign([])
  return dispatch => {
    CoursesRef.once('value', snapshot => {
      var specialCourses = snapshot.val()
      for (var key in specialCourses) {
          let courseItemWithKey = specialCourses[key]
          courseItemWithKey.key = key
          list = list.concat(courseItemWithKey)
      }
      list.sort(function(a, b) {
        return a.date - b.date
      })
      dispatch({
        type: FETCH_SPECIAL_COURSES_BANNER,
        payload: {banner: list}
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
