import {
    combineReducers
} from 'redux'
import {
    reducer as FormReducer
} from 'redux-form'

import LoadingScreenReducer from './loadingScreen.js'
import ShopReducer from './shopReducer.js'
import SpecialCourseReducer from './specialCoursesReducer.js'
import SpecialCoursesBannerReducer from './specialCoursesBannerReducer.js'
import TimetableReducer from './timetableReducer.js'
import AuthReducer from './authReducer.js'
import UserReducer from './userReducer.js'
import InstructorReducer from './instructorReducer.js'
import InfoReducer from './infoReducer.js'
import TermsListReducer from './admin/termsReducer.js'
import CourseInfoReducer from './courseInfoReducer.js'
import SpecialCourseInfoReducer from './specialCourseInfoReducer.js'
import UserListReducer from './admin/userListReducer.js'
import AdminListReducer from './admin/adminListReducer.js'
import CourseListReducer from './admin/courseListReducer.js'
import InstructorListReducer from './admin/instructorListReducer.js'
import ShopListReducer from './admin/shopListReducer.js'
import PlaceFormReducer from './admin/placeFormReducer.js'
import CourseTypeFormReducer from './admin/courseTypeFormReducer.js'
import CourseFormReducer from './admin/courseFormReducer.js'
import SpecialCourseFormReducer from './admin/specialCourseFormReducer.js'
import ShopItemTimeFormReducer from './admin/shopItemTimeFormReducer.js'
import ShopItemCountFormReducer from './admin/shopItemCountFormReducer.js'
import CourseTypeListReducer from './admin/courseTypeListReducer.js'
import PlaceListReducer from './admin/placeListReducer.js'
import InfoFormReducer from './admin/infoFormReducer.js'
import TermsFormReducer from './admin/termsFormReducer.js'
import SpecialCourseListReducer from './admin/specialCourseListReducer.js'
import SearchBarReducer from './admin/searchBarReducer.js'
import PendingTransactions from './pendingTransactions.js'
import TermsReducer from './termsReducer.js'
import DiagnosticsReducer from './diagnosticsReducer.js'
import UserOverviewReducer from './UserOverviewReducer.js'
import DiagnosticsViewerReducer from './diagnosticsViewerReducer.js'

const combinedReducer = combineReducers({
    userOverview: UserOverviewReducer,
    loadingScreen: LoadingScreenReducer,
    pendingTransactions: PendingTransactions,
    currentUser: UserReducer,
    instructor: InstructorReducer,
    shopItems: ShopReducer,
    specialCourses: SpecialCourseReducer,
    specialCoursesBanner: SpecialCoursesBannerReducer,
    timetable: TimetableReducer,
    auth: AuthReducer,
    form: FormReducer,
    courseInfo: CourseInfoReducer,
    specialCourseInfo: SpecialCourseInfoReducer,
    userList: UserListReducer,
    adminList: AdminListReducer,
    courseList: CourseListReducer,
    specialCourseList: SpecialCourseListReducer,
    instructorList: InstructorListReducer,
    shopList: ShopListReducer,
    placeForm: PlaceFormReducer,
    courseTypeForm: CourseTypeFormReducer,
    courseForm: CourseFormReducer,
    specialCourseForm: SpecialCourseFormReducer,
    shopItemTimeForm: ShopItemTimeFormReducer,
    shopItemCountForm: ShopItemCountFormReducer,
    courseTypeList: CourseTypeListReducer,
    placeList: PlaceListReducer,
    infoList: InfoReducer,
    infoForm: InfoFormReducer,
    searchBar: SearchBarReducer,
    terms: TermsReducer,
    termsList: TermsListReducer,
    termsForm: TermsFormReducer,
    diagnostics: DiagnosticsReducer,
    ddata: DiagnosticsViewerReducer
})

export default combinedReducer;