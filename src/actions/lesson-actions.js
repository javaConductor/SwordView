/**
 * Created by lee on 6/23/17.
 */
import lessonService from "../services/lesson";
import C from "../constants";

let obj = {

    removeLesson: (lessonId) => {
        return (dispatch, getState) => {
            dispatch({
                type: C.Actions.Types.REMOVE_LESSON_START,
                payload: {lessonId: lessonId}
            });
            lessonService.removeLesson(lessonId).then(
                (success) => {
                    if (success)
                        dispatch({
                            type: C.Actions.Types.REMOVE_LESSON,
                            payload: {
                                lessonId: lessonId
                            }
                        });
                    else
                        dispatch({
                            type: C.Actions.Types.REMOVE_LESSON_ERROR,
                            error: error,
                            payload: {lessonId: lessonId}
                        });
                },
                (error) => {
                    dispatch({
                        type: C.Actions.Types.REMOVE_LESSON_ERROR,
                        error: error,
                        payload: {lessonId: lessonId}
                    });
                }
            );
        }
    },

    editLesson: (lessonId) => ({
        type: C.Actions.Types.EDIT_LESSON,
        payload: {
            lessonId: lessonId
        }
    }),

    newLesson: () => ({
        type: C.Actions.Types.NEW_LESSON,
        payload: {}
    }),

    closeLesson: (lessonId) => ({
        type: C.Actions.Types.CLOSE_LESSON,
        payload: {
            lessonId: lessonId
        }
    }),

    getAllLessons: (start, end) => {
        return (dispatch, getState) => {
            dispatch({
                type: C.Actions.Types.GET_ALL_LESSONS_START,
                payload: {}
            });
            lessonService.allLessons(start, end).then(
                (lessons) => {
                	console.debug("lessonActions.getAllLessons: lessons:", lessons);
                    dispatch({
                        type: C.Actions.Types.GET_ALL_LESSONS,
                        payload: {
                            lessons: lessons
                        }
                    });
                },
                (error) => {
                    dispatch({
                        type: C.Actions.Types.VERSE_SEARCH_ERROR,
                        error: error,
                        payload: {}
                    });
                }
            );
        }
    },

    saveLesson: (lesson) => {
        console.debug("lesson-actions.saveLesson: lesson: ", lesson);

        return (dispatch, getState) => {
            dispatch({
                type: C.Actions.Types.SAVE_LESSON_START,
                payload: {}
            });
            lessonService.saveLesson(lesson).then(
                (lesson) => {
                    dispatch({
                        type: C.Actions.Types.SAVE_LESSON,
                        payload: {
                            lesson: lesson
                        }
                    });
                },
                (error) => {
                    dispatch({
                        type: C.Actions.Types.SAVE_LESSON_ERROR,
                        error: error
                    });
                }
            );
        }
    },
};
///
export default obj;
