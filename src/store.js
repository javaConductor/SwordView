/**
 * Created by lee on 6/22/17.
 */
import {applyMiddleware, combineReducers, createStore} from "redux";
import verseSearchReducer from "./reducers/verse-search-reducer";
import lessonReducer from "./reducers/lesson-reducer";
import userMessageReducer from "./reducers/user-message-reducer";
import thunk from "redux-thunk"; // allows us to use asynchronous actions
import {loadState, saveState} from "./services/local-storage";
import initialState from "./model/initial-state";
import throttle from "lodash/throttle";

/// Combine the reducers into one
const rootReducer = combineReducers({
    verseSearch: verseSearchReducer,   // this means verseSearchReducer will operate on appState.verseSearch
    lessonList: lessonReducer,   // this means lessonReducer will operate on appState.lessonList
    userMessages: userMessageReducer,   // this means userMessageReducer will operate on appState.userMessages
});

// create the store the state from localStorage or the initialState
//let startState = loadState() || initialState();
let startState = initialState();
console.debug("store StartState: ", startState);
console.debug("store loadState: ", loadState());
let store =
    applyMiddleware(thunk)(createStore)(rootReducer, startState);

// update localStorage with latest state
store.subscribe(throttle(() => {
    console.debug("store.saveState: state:", store.getState());
    saveState(store.getState());
}, 500));

export default store;
