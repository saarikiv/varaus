import {
    FETCH_USER_LIST,
    FETCH_ADMIN_LIST,
    FETCH_COURSE_TYPE_LIST,
    FETCH_COURSE_LIST,
    FETCH_INSTRUCTOR_LIST,
    FETCH_SHOP_LIST,
    FETCH_PLACE_LIST,
    FETCH_INFO_LIST,
    STOP_FETCH_INFO_LIST,
    FETCH_TERMS_LIST,
    STOP_FETCH_TERMS_LIST,
    FETCH_SPECIAL_COURSE_LIST,
    STOP_FETCH_SHOP_LIST,

    EXPAND_ADMIN_LIST,
    MINIMIZE_ADMIN_LIST,
    EXPAND_USER_LIST,
    MINIMIZE_USER_LIST,
    EXPAND_COURSE_TYPE_LIST,
    MINIMIZE_COURSE_TYPE_LIST,
    EXPAND_COURSE_LIST,
    MINIMIZE_COURSE_LIST,
    EXPAND_INSTRUCTOR_LIST,
    MINIMIZE_INSTRUCTOR_LIST,
    EXPAND_SHOP_LIST,
    MINIMIZE_SHOP_LIST,
    EXPAND_PLACE_LIST,
    MINIMIZE_PLACE_LIST,
    EXPAND_INFO_LIST,
    MINIMIZE_INFO_LIST,
    EXPAND_TERMS_LIST,
    MINIMIZE_TERMS_LIST,
    EXPAND_SPECIAL_COURSE_LIST,
    MINIMIZE_SPECIAL_COURSE_LIST,

    EXPAND_PLACE_FORM,
    MINIMIZE_PLACE_FORM,
    EXPAND_COURSE_TYPE_FORM,
    MINIMIZE_COURSE_TYPE_FORM,
    EXPAND_COURSE_FORM,
    MINIMIZE_COURSE_FORM,
    EXPAND_SPECIAL_COURSE_FORM,
    MINIMIZE_SPECIAL_COURSE_FORM,
    EXPAND_TIME_SHOP_FORM,
    MINIMIZE_TIME_SHOP_FORM,
    EXPAND_COUNT_SHOP_FORM,
    MINIMIZE_COUNT_SHOP_FORM,
    EXPAND_TERMS_FORM,
    MINIMIZE_TERMS_FORM,
    EXPAND_INFO_FORM,
    MINIMIZE_INFO_FORM
} from './actionTypes.js'
import {
    toMilliseconds
} from '../helpers/timeHelper.js'
import {
    _hideLoadingScreen,
    _showLoadingScreen
} from './loadingScreen.js'

export function fetchUserList() {
    return dispatch => {
        _fetchUserList(dispatch)
    }
}

function _fetchUserList(dispatch) {
    var userList = Object.assign([])
    var adminList = Object.assign([])
    var instructorList = Object.assign([])
    var specialusers = Object.assign({})
    var users = Object.assign({})
    _showLoadingScreen(dispatch, "Päivitetään käyttäjät")
    firebase.database().ref('/users/').once('value')
        .then(snapshot => {
            users = snapshot.val()
            return firebase.database().ref('/specialUsers/').once('value')
        })
        .then(snapshot => {
            specialusers = snapshot.val()
            for (var key in users) {
                users[key].key = key
                userList = userList.concat(users[key])
                if (specialusers[key]) {
                    if (specialusers[key].admin) {
                        adminList = adminList.concat(users[key])
                    }
                    if (specialusers[key].instructor) {
                        instructorList = instructorList.concat(users[key])
                    }
                }
            }
            userList.sort((a, b) => {
                return a.firstname.toUpperCase() < - b.firstname.toUpperCase()
            });
            dispatch({
                type: FETCH_USER_LIST,
                payload: userList
            });
            adminList.sort((a, b) => {
                return a.firstname.toUpperCase() - b.firstname.toUpperCase()
            });
            dispatch({
                type: FETCH_ADMIN_LIST,
                payload: adminList
            });
            instructorList.sort((a, b) => {
                return a.firstname.toUpperCase() - b.firstname.toUpperCase()
            });
            dispatch({
                type: FETCH_INSTRUCTOR_LIST,
                payload: instructorList
            });
            _hideLoadingScreen(dispatch, "Käyttäjät päivitetty", true);
        })
        .catch(err => {
            console.error("ADMIN_ERR: fetch users fetchUserList: ", err);
            _hideLoadingScreen(dispatch, "Käyttäjien päivityksessä tapahtui virhe: " + err.toString(), false)
        })
}

export function stopFetchCourseTypeList() {
    return dispatch => {
        firebase.database().ref('/courseTypes/').off('value');
        dispatch({
            type: FETCH_COURSE_TYPE_LIST,
            payload: {
                list: Object.assign([])
            }
        });
    }
}

export function fetchCourseTypeList() {
    var list = []
    var returnObject = {}
    return dispatch => {
        firebase.database().ref('/courseTypes/').on('value', snapshot => {
            var courseTypes = snapshot.val()
            list = Object.assign([])
            for (var key in courseTypes) {
                if (courseTypes.hasOwnProperty(key)) {
                    let ItemWithKey = courseTypes[key]
                    ItemWithKey.key = key
                    list = list.concat(ItemWithKey)
                }
            }
            list.sort(function (a, b) {
                let nma = a.name.toUpperCase()
                let nmb = b.name.toUpperCase()
                if (nma < nmb) {
                    return -1
                }
                if (nma > nmb) {
                    return 1
                }
                return 0
            })
            returnObject = Object.assign({}, {
                list: list
            })
            dispatch({
                type: FETCH_COURSE_TYPE_LIST,
                payload: returnObject
            })
        }, err => {
            console.error("ERR: fetch courseTypes: ", err);
        })
    }
}

export function stopFetchCourseList() {
    return dispatch => {
        firebase.database().ref('/courses/').off('value');
        dispatch({
            type: FETCH_COURSE_LIST,
            payload: {
                list: []
            }
        });
    }
}

export function fetchCourseList() {
    var list = []
    var returnObject = {}
    return dispatch => {
        firebase.database().ref('/courses/').on('value', snapshot => {
            var courses = snapshot.val()
            list = Object.assign([])
            for (var key in courses) {
                if (courses.hasOwnProperty(key)) {
                    let ItemWithKey = courses[key]
                    ItemWithKey.key = key
                    list = list.concat(ItemWithKey)
                }
            }
            list.sort(function (a, b) {
                if (a.day && b.day) {
                    return a.day - b.day
                }
                return 1
            })
            returnObject = Object.assign({}, {
                list: list
            })
            dispatch({
                type: FETCH_COURSE_LIST,
                payload: returnObject
            })
        }, err => {
            console.error("ERR: fetch courses: ", err);
        })
    }
}

export function stopFetchSpecialCourseList() {
    return dispatch => {
        firebase.database().ref('/specialCourses/').off('value');
        dispatch({
            type: FETCH_SPECIAL_COURSE_LIST,
            payload: {
                list: []
            }
        });
    }
}

export function fetchSpecialCourseList() {
    var list = []
    var returnObject = {}
    return dispatch => {
        firebase.database().ref('/specialCourses/').on('value', snapshot => {
            var courses = snapshot.val()
            list = Object.assign([])
            for (var key in courses) {
                if (courses.hasOwnProperty(key)) {
                    let ItemWithKey = courses[key]
                    ItemWithKey.key = key
                    list = list.concat(ItemWithKey)
                }
            }
            list.sort(function (a, b) {
                if (a.day && b.day) {
                    return a.day - b.day
                }
                return 1
            })
            returnObject = Object.assign({}, {
                list: list
            })
            dispatch({
                type: FETCH_SPECIAL_COURSE_LIST,
                payload: returnObject
            })
        }, err => {
            console.error("ERR: fetch specialCourses: ", err);
        })
    }
}

export function fetchShopList() {
    var list = []
    return dispatch => {
        var returnObject = {}
        firebase.database().ref('/shopItems/').on('value', snapshot => {
            var shopItems = snapshot.val()
            list = Object.assign([])
            for (var key in shopItems) {
                if (shopItems.hasOwnProperty(key)) {
                    let ItemWithKey = shopItems[key]
                    ItemWithKey.key = key
                    list = list.concat(ItemWithKey)
                }
            }
            list.sort(function (a, b) {
                if (a.price && b.price) {
                    return a.price - b.price
                }
                return 0
            })
            returnObject = Object.assign({}, {
                list: list
            })
            dispatch({
                type: FETCH_SHOP_LIST,
                payload: returnObject
            })
        }, err => {
            console.error("ERR: fetch shopList: ", err);
        })
    }
}

export function stopFetchShopList() {
    return dispatch => {
        firebase.database().ref('/shopItems/').off('value');
        dispatch({
            type: STOP_FETCH_SHOP_LIST,
            payload: {
                list: Object.assign([])
            }
        })
    }
}

export function stopFetchPlaceList() {
    return dispatch => {
        firebase.database().ref('/places').off('value');
        dispatch({
            type: FETCH_PLACE_LIST,
            payload: {
                list: Object.assign([])
            }
        });
    }
}

export function fetchPlaceList() {
    var list = []
    var returnObject = {}
    return dispatch => {
        firebase.database().ref('/places/').on('value', snapshot => {
            var places = snapshot.val()
            list = Object.assign([])
            for (var key in places) {
                if (places.hasOwnProperty(key)) {
                    let ItemWithKey = places[key]
                    ItemWithKey.key = key
                    list = list.concat(ItemWithKey)
                }
            }
            list.sort(function (a, b) {
                let nma = a.name.toUpperCase()
                let nmb = b.name.toUpperCase()
                if (nma < nmb) {
                    return -1
                }
                if (nma > nmb) {
                    return 1
                }
                return 0
            })
            returnObject = Object.assign({}, {
                list: list
            })
            dispatch({
                type: FETCH_PLACE_LIST,
                payload: returnObject
            })
        }, err => {
            console.error("ERR: fetch places: ", err);
        })
    }
}

export function fetchTermsList() {
    var list = []

    return dispatch => {
        var returnObject = {}
        firebase.database().ref('/terms/').on('value', snapshot => {
            var termItems = snapshot.val()
            list = Object.assign([])
            for (var key in termItems) {
                    termItems[key].key = key
                    list = list.concat(termItems[key])
            }
            returnObject = Object.assign({}, {
                list: list
            })
            dispatch({
                type: FETCH_TERMS_LIST,
                payload: returnObject
            })
        }, err => {
            console.error("ERR: fetch terms: ", err);
        })
    }
}

export function stopFetchTermsList() {
    return dispatch => {
        firebase.database().ref('/terms/').off('value');
        dispatch({
            type: FETCH_TERMS_LIST,
            payload: {
                list: Object.assign([])
            }
        })
    }
}

export function removeTermsItem(item) {
    return dispatch => {
        firebase.database().ref('/terms/' + item.key).remove().then(() => {

        }).catch(err => {
            console.error("Removing terms item falied: ", err)
        })
    }
}


export function fetchInfoList() {
    var list = []

    return dispatch => {
        var returnObject = {}
        firebase.database().ref('/infoItems/').on('value', snapshot => {
            var infoItems = snapshot.val()
            list = Object.assign([])
            for (var key in infoItems) {
                if (infoItems.hasOwnProperty(key)) {
                    let ItemWithKey = infoItems[key]
                    ItemWithKey.key = key
                    list = list.concat(ItemWithKey)
                }
            }
            returnObject = Object.assign({}, {
                list: list
            })
            dispatch({
                type: FETCH_INFO_LIST,
                payload: returnObject
            })
        }, err => {
            console.error("ERR: fetch infoItems: ", err);
        })
    }
}

export function stopFetchInfoList() {
    return dispatch => {
        firebase.database().ref('/infoItems/').off('value');
        dispatch({
            type: FETCH_INFO_LIST,
            payload: {
                list: Object.assign([])
            }
        })
    }
}

export function removeInfoItem(item) {
    return dispatch => {
        firebase.database().ref('/infoItems/' + item.key).remove().then(() => {

        }).catch(err => {
            console.error("Removing info item falied: ", err)
        })
    }
}

export function removePlaceItem(item) {
    return dispatch => {
        firebase.database().ref('/places/' + item.key).remove().then(() => {

        }).catch(err => {
            console.error("Removing place item falied: ", err)
        })
    }
}

export function addPlace(data) {
    return dispatch => firebase.database().ref('/places/' + data.name).update({
        name: data.name,
        desc: data.desc,
        address: data.address
    })
        .catch(err => {
            console.error("ERR: update; addPlace: ", err);
        })
}

export function modifyPlace(data) {
    return dispatch => firebase.database().ref('/places/' + data.name).update({
        name: data.name,
        desc: data.desc,
        address: data.address
    })
        .catch(err => {
            console.error("ERR: update; UpdatePlace: ", err);
        })
}

export function removeCourse(key) {
    return dispatch => {
        firebase.database().ref('/courses/' + key).remove().then(() => {

        }).catch(err => {
            console.error("Removing course failed: ", err)
        })
    }
}

export function removeSpecialCourse(key) {
    return dispatch => {
        firebase.database().ref('/specialCourses/' + key).remove().then(() => {

        }).catch(err => {
            console.error("Removing course failed: ", err)
        })
    }
}

export function addCourse(data, courseType, place, instructor) {

    return dispatch => {
        firebase.database().ref('/courses/').push({
            start: toMilliseconds(parseInt(data.start)),
            end: toMilliseconds(parseInt(data.end)),
            maxCapacity: parseInt(data.maxCapacity),
            day: parseInt(data.day),
            place: place,
            instructor: instructor,
            courseType: courseType
        })
    }
}

export function modifyCourse(data, key, courseType, place, instructor) {
    return dispatch => {
        firebase.database().ref('/courses/' + key).update({
            start: toMilliseconds(parseInt(data.start)),
            end: toMilliseconds(parseInt(data.end)),
            maxCapacity: parseInt(data.maxCapacity),
            day: parseInt(data.day),
            place: place,
            instructor: instructor,
            courseType: courseType
        })
    }
}

export function modifySpecialCourse(data, key, courseType, place, instructor) {
    const beforetax = data.price / (1 + (data.taxpercent / 100))
    const taxamount = data.price - beforetax

    return dispatch => {
                firebase.database().ref('/specialCourses/' + key).update({
                    start: toMilliseconds(parseInt(data.start)),
                    end: toMilliseconds(parseInt(data.end)),
                    maxCapacity: parseInt(data.maxCapacity),
                    date: data.date,
                    price: Number(data.price.toFixed(2)),
                    taxpercent: Number(data.taxpercent.toFixed(2)),
                    taxamount: Number(taxamount.toFixed(2)),
                    beforetax: Number(beforetax.toFixed(2)),
                    place: place,
                    instructor: instructor,
                    courseType: courseType,
                    type: "special",
                    title: data.title
                })
    }
}

export function addSpecialCourse(data, courseType, place, instructor) {

    const beforetax = data.price / (1 + (data.taxpercent / 100))
    const taxamount = data.price - beforetax

    return dispatch => {
        firebase.database().ref('/specialCourses/').push({
            start: toMilliseconds(parseInt(data.start)),
            end: toMilliseconds(parseInt(data.end)),
            maxCapacity: parseInt(data.maxCapacity),
            date: data.date,
            price: Number(data.price.toFixed(2)),
            taxpercent: Number(data.taxpercent.toFixed(2)),
            taxamount: Number(taxamount.toFixed(2)),
            beforetax: Number(beforetax.toFixed(2)),
            place: place,
            instructor: instructor,
            courseType: courseType,
            type: "special",
            title: data.title
        })
    }
}

export function addCourseType(data) {
    return dispatch => firebase.database().ref('/courseTypes/' + data.name).update({
        name: data.name,
        desc: data.desc
    })
        .catch(err => {
            console.error("ERR: update; addCourseType: ", err);
        })
}

export function removeCourseType(item) {
    return dispatch => {
        firebase.database().ref('/courseTypes/' + item.name).remove().then(() => {

        }).catch(err => {
            console.error("Removing place item failed: ", err)
        })
    }
}

export function modifyCourseType(data) {
    return dispatch => firebase.database().ref('/courseTypes/' + data.name).update({
        name: data.name,
        desc: data.desc
    })
        .catch(err => {
            console.error("ERR: update; modifyCourseType: ", err);
        })
}

export function addShopItem(data, type) {
    const beforetax = data.price / (1 + (data.taxpercent / 100))
    const taxamount = data.price - beforetax

    return dispatch => firebase.database().ref('/shopItems/' + data.title).update({
        type: type,
        title: data.title,
        desc: data.desc,
        usetimes: data.usetimes || null,
        usedays: data.usedays || null,
        expiresAfterDays: data.expiresAfterDays || null,
        price: Number(data.price.toFixed(2)),
        taxamount: Number(taxamount.toFixed(2)),
        taxpercent: Number(data.taxpercent.toFixed(2)),
        beforetax: Number(beforetax.toFixed(2)),
        oneTime: data.oneTime || false
    })
        .catch(err => {
            console.error("ERR: update; addShopItem: ", err);
        })
}

export function modifyShopItem(data, type) {
    const beforetax = data.price / (1 + (data.taxpercent / 100))
    const taxamount = data.price - beforetax

    return dispatch => firebase.database().ref('/shopItems/' + data.title).update({
        type: type,
        title: data.title,
        desc: data.desc,
        usetimes: data.usetimes || null,
        usedays: data.usedays || null,
        expiresAfterDays: data.expiresAfterDays || null,
        price: Number(data.price.toFixed(2)),
        taxamount: Number(taxamount.toFixed(2)),
        taxpercent: Number(data.taxpercent.toFixed(2)),
        beforetax: Number(beforetax.toFixed(2)),
        oneTime: data.oneTime || false
    })
        .catch(err => {
            console.error("ERR: update; addShopItem: ", err);
        })
}

export function addInfo(data) {
    return dispatch => firebase.database().ref('/infoItems/').push({
        title: data.title,
        content: data.content
    })
        .catch(err => {
            console.error("ERR: addInfo: ", err);
        })
}

export function modifyInfo(key, data) {
    return dispatch => firebase.database().ref('/infoItems/' + key).update({
        title: data.title,
        content: data.content
    })
        .catch(err => {
            console.error("ERR: modifyInfo: ", err);
        })
}

export function addTerms(data) {
    return dispatch => firebase.database().ref('/terms/').push({
        title: data.title,
        content: data.content
    })
        .catch(err => {
            console.error("ERR: addterms: ", err);
        })
}

export function modifyTerms(key, data) {
    return dispatch => firebase.database().ref('/terms/' + key).update({
        title: data.title,
        content: data.content
    })
        .catch(err => {
            console.error("ERR: modifyTerms: ", err);
        })
}


export function lockUser(key) {
    return dispatch => firebase.database().ref('/users/' + key).update({
        locked: true,
        instructor: null
    })
        .then(() => {
            _fetchUserList(dispatch)
        })
        .catch(err => {
            console.error("ERR: update; lockUser: ", err);
        })
}

export function unlockUser(key) {
    return dispatch => firebase.database().ref('/users/' + key).update({
        locked: null
    })
        .then(() => {
            _fetchUserList(dispatch)
        })
        .catch(err => {
            console.error("ERR: update; unlockUser: ", err);
        })
}

export function lockShopItem(key) {
    return dispatch => firebase.database().ref('/shopItems/' + key).update({
        locked: true
    })
        .catch(err => {
            console.error("ERR: update; lockShopItem: ", err);
        })
}

export function unlockShopItem(key) {
    return dispatch => firebase.database().ref('/shopItems/' + key).update({
        locked: null
    })
        .catch(err => {
            console.error("ERR: update; unlockShopItem: ", err);
        })
}

export function makeInstructor(key) {
    return dispatch => firebase.database().ref('/specialUsers/' + key).update({
        instructor: true
    })
        .then(() => {
            _fetchUserList(dispatch)
        })
        .catch(err => {
            console.error("ERR: update; makeInstructor: ", err);
        })
}

export function unmakeInstructor(key) {
    return dispatch => firebase.database().ref('/specialUsers/' + key).update({
        instructor: null
    })
        .then(() => {
            _fetchUserList(dispatch)
        })
        .catch(err => {
            console.error("ERR: update; unmakeInstructor: ", err);
        })
}

export function expandAdminList() {
    return dispatch => {
        dispatch({
            type: EXPAND_ADMIN_LIST
        })
    }
}

export function minimizeAdminList() {
    return dispatch => {
        dispatch({
            type: MINIMIZE_ADMIN_LIST
        })
    }
}

export function expandUserList() {
    return dispatch => {
        dispatch({
            type: EXPAND_USER_LIST
        })
    }
}

export function minimizeUserList() {
    return dispatch => {
        dispatch({
            type: MINIMIZE_USER_LIST
        })
    }
}

export function expandCourseTypeList() {
    return dispatch => {
        dispatch({
            type: EXPAND_COURSE_TYPE_LIST
        })
    }
}

export function minimizeCourseTypeList() {
    return dispatch => {
        dispatch({
            type: MINIMIZE_COURSE_TYPE_LIST
        })
    }
}

export function expandCourseList() {
    return dispatch => {
        dispatch({
            type: EXPAND_COURSE_LIST
        })
    }
}

export function minimizeCourseList() {
    return dispatch => {
        dispatch({
            type: MINIMIZE_COURSE_LIST
        })
    }
}

export function expandSpecialCourseList() {
    return dispatch => {
        dispatch({
            type: EXPAND_SPECIAL_COURSE_LIST
        })
    }
}

export function minimizeSpecialCourseList() {
    return dispatch => {
        dispatch({
            type: MINIMIZE_SPECIAL_COURSE_LIST
        })
    }
}

export function expandInstructorList() {
    return dispatch => {
        dispatch({
            type: EXPAND_INSTRUCTOR_LIST
        })
    }
}

export function minimizeInstructorList() {
    return dispatch => {
        dispatch({
            type: MINIMIZE_INSTRUCTOR_LIST
        })
    }
}

export function expandShopList() {
    return dispatch => {
        dispatch({
            type: EXPAND_SHOP_LIST
        })
    }
}

export function minimizeShopList() {
    return dispatch => {
        dispatch({
            type: MINIMIZE_SHOP_LIST
        })
    }
}

export function expandPlaceList() {
    return dispatch => {
        dispatch({
            type: EXPAND_PLACE_LIST
        })
    }
}

export function minimizePlaceList() {
    return dispatch => {
        dispatch({
            type: MINIMIZE_PLACE_LIST
        })
    }
}

export function expandPlaceForm(expander) {
    return dispatch => {
        dispatch({
            type: EXPAND_PLACE_FORM,
            payload: {
                expanded: true,
                expander: expander
            }
        })
    }
}

export function minimizePlaceForm() {
    return dispatch => {
        dispatch({
            type: MINIMIZE_PLACE_FORM,
            payload: {
                expanded: false,
                expander: ""
            }
        })
    }
}

export function expandCourseTypeForm(expander) {
    return dispatch => {
        dispatch({
            type: EXPAND_COURSE_TYPE_FORM,
            payload: {
                expanded: true,
                expander: expander
            }
        })
    }
}

export function minimizeCourseTypeForm() {
    return dispatch => {
        dispatch({
            type: MINIMIZE_COURSE_TYPE_FORM,
            payload: {
                expanded: false,
                expander: ""
            }
        })
    }
}

export function expandCourseForm(expander) {
    return dispatch => {
        dispatch({
            type: EXPAND_COURSE_FORM,
            payload: {
                expanded: true,
                expander: expander
            }
        })
    }
}

export function minimizeCourseForm() {
    return dispatch => {
        dispatch({
            type: MINIMIZE_COURSE_FORM,
            payload: {
                expanded: false,
                expander: ""
            }
        })
    }
}

export function expandSpecialCourseForm(expander) {
    return dispatch => {
        dispatch({
            type: EXPAND_SPECIAL_COURSE_FORM,
            payload: {
                expanded: true,
                expander: expander
            }
        })
    }
}

export function minimizeSpecialCourseForm() {
    return dispatch => {
        dispatch({
            type: MINIMIZE_SPECIAL_COURSE_FORM,
            payload: {
                expanded: false,
                expander: ""
            }
        })
    }
}

export function expandTimeShopForm(expander) {
    return dispatch => {
        dispatch({
            type: EXPAND_TIME_SHOP_FORM,
            payload: {
                expanded: true,
                expander: expander
            }
        })
    }
}

export function minimizeTimeShopForm() {
    return dispatch => {
        dispatch({
            type: MINIMIZE_TIME_SHOP_FORM,
            payload: {
                expanded: false,
                expander: ""
            }
        })
    }
}

export function expandCountShopForm(expander) {
    return dispatch => {
        dispatch({
            type: EXPAND_COUNT_SHOP_FORM,
            payload: {
                expanded: true,
                expander: expander
            }
        })
    }
}

export function minimizeCountShopForm() {
    return dispatch => {
        dispatch({
            type: MINIMIZE_COUNT_SHOP_FORM,
            payload: {
                expanded: false,
                expander: ""
            }
        })
    }
}

export function expandInfoList() {
    return dispatch => {
        dispatch({
            type: EXPAND_INFO_LIST
        })
    }
}

export function minimizeInfoList() {
    return dispatch => {
        dispatch({
            type: MINIMIZE_INFO_LIST
        })
    }
}

export function expandInfoForm(expander) {
    return dispatch => {
        dispatch({
            type: EXPAND_INFO_FORM,
            payload: {
                expanded: true,
                expander: expander
            }
        })
    }
}

export function minimizeInfoForm() {
    return dispatch => {
        dispatch({
            type: MINIMIZE_INFO_FORM,
            payload: {
                expanded: false,
                expander: ""
            }
        })
    }
}

export function expandTermsList() {
    return dispatch => {
        dispatch({
            type: EXPAND_TERMS_LIST
        })
    }
}

export function minimizeTermsList() {
    return dispatch => {
        dispatch({
            type: MINIMIZE_TERMS_LIST
        })
    }
}

export function expandTermsForm(expander) {
    return dispatch => {
        dispatch({
            type: EXPAND_TERMS_FORM,
            payload: {
                expanded: true,
                expander: expander
            }
        })
    }
}

export function minimizeTermsForm() {
    return dispatch => {
        dispatch({
            type: MINIMIZE_TERMS_FORM,
            payload: {
                expanded: false,
                expander: ""
            }
        })
    }
}