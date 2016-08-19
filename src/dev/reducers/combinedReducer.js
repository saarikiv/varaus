import {
    combineReducers
} from 'redux'
import {
    reducer as FormReducer
} from 'redux-form'

import LoadingScreenReducer from './loadingScreen.js'
import ShopReducer from './shopReducer.js'
import TimetableReducer from './timetableReducer.js'
import AuthReducer from './authReducer.js'
import UserReducer from './userReducer.js'
import InfoReducer from './infoReducer.js'
import TermsListReducer from './admin/termsReducer.js'
import CourseInfoReducer from './courseInfoReducer.js'
import UserListReducer from './admin/userListReducer.js'
import AdminListReducer from './admin/adminListReducer.js'
import CourseListReducer from './admin/courseListReducer.js'
import ShopListReducer from './admin/shopListReducer.js'
import CourseFormReducer from './admin/courseFormReducer.js'
import ShopItemTimeFormReducer from './admin/shopItemTimeFormReducer.js'
import ShopItemCountFormReducer from './admin/shopItemCountFormReducer.js'
import InfoFormReducer from './admin/infoFormReducer.js'
import TermsFormReducer from './admin/termsFormReducer.js'
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
    shopItems: ShopReducer,
    timetable: TimetableReducer,
    auth: AuthReducer,
    form: FormReducer,
    courseInfo: CourseInfoReducer,
    userList: UserListReducer,
    adminList: AdminListReducer,
    courseList: CourseListReducer,
    shopList: ShopListReducer,
    courseForm: CourseFormReducer,
    shopItemTimeForm: ShopItemTimeFormReducer,
    shopItemCountForm: ShopItemCountFormReducer,
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