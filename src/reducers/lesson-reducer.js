/**
 * Created by lee on 6/23/17.
 */
import C from "../constants";
import initialState from "../model/initial-state";
import Utils from "../utils/index";

export default function (startState = {}, action) {

    console.debug("lesson-reducer: action: "+action.type +
        " action.payload: "+JSON.stringify(action.payload) +
        " action.error: "+JSON.stringify(action.error) +
        " state: ", (startState)
    );
    // console.debug("lesson-reducer: initState: ", (initialState())
    // );
    let state = startState;
    switch (action.type) {

        case C.Actions.Types.SAVE_LESSON: {
            let lessons = state.lessons;//.map((l) => l.id !== action.payload.lesson.id);
            let foundIdx = lessons.findIndex((l) => l.id === action.payload.lesson.id);
            let newLessons = (foundIdx !== -1) ?
                /// replace this with the saved One
                Utils.replaceArrayElement(lessons, foundIdx, action.payload.lesson) :
                /// append it to the end
                lessons.concat([action.payload.lesson]);
            return Object.assign({}, state, {
                lessons: newLessons
            });
        }
        case C.Actions.Types.REMOVE_LESSON: {
            let openLessonIds = (state.openLessonIds || []).filter((id) => id !== action.payload.lessonId );
            let lessons = state.lessons.filter((l) => l.id !== action.payload.lessonId);
            return Object.assign({}, state, {
                lessons: lessons,
                openLessonIds: openLessonIds
            });
        }
        case C.Actions.Types.REMOVE_LESSON_START:
            return state;

        case C.Actions.Types.GET_ALL_LESSONS:
            // console.debug("lesson-reducer: action: "+action.type +
            //     " new state: "+ JSON.stringify(nuState));
            return Object.assign({}, state, { lessons: action.payload.lessons});

        case C.Actions.Types.GET_ALL_LESSONS_START:
            return state;

        case C.Actions.Types.EDIT_LESSON: {
            let openLessonIds = state.openLessonIds || [];
            if (openLessonIds.indexOf(action.payload.lessonId) !== -1)
                return state;
            return Object.assign({}, state, {openLessonIds: openLessonIds.concat([action.payload.lessonId])});
        }
        case C.Actions.Types.CLOSE_LESSON: {
            let openLessonIds = state.openLessonIds;
            return Object.assign({}, state, {
                openLessonIds: openLessonIds.filter((id) => id !== action.payload.lessonId)
            });
        }
        //// Errors
        case C.Actions.Types.REMOVE_LESSON_ERROR:
            ///TODO use userMessage service to report error to user
            return state;

        case C.Actions.Types.GET_ALL_LESSONS_ERROR:
            ///TODO use userMessage service to report error to user
            return state;

        /// Ignore other actions
        default:
            return state;
    }
};