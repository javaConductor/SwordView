/**
 * Created by lee on 6/16/17.
 */
let Constants = {
    Actions: {
        Types: {

            /// Bible Chapter Actions
            SHOW_CHAPTER_START: "ShowChapterStart",
            SHOW_CHAPTER_ERROR: "ShowChapterError",
            SHOW_CHAPTER: "ShowChapter",

            /// Lesson Actions
            SAVE_LESSON_START: "SaveLessonStart",
            SAVE_LESSON_ERROR: "SaveLessonError",
            SAVE_LESSON: "SaveLesson",

            SAVE_LESSON_ELEMENT_START: "SaveLessonElementStart",
            SAVE_LESSON_ELEMENT_ERROR: "SaveLessonElementError",
            SAVE_LESSON_ELEMENT: "SaveLessonElement",

            REMOVE_LESSON: "RemoveLesson",
            REMOVE_LESSON_START: "RemoveLessonStart",
            REMOVE_LESSON_ERROR: "RemoveLessonError",

            REMOVE_LESSON_ELEMENT:"RemoveLessonElement",
            REMOVE_LESSON_ELEMENT_START:"RemoveLessonElementStart",
            REMOVE_LESSON_ELEMENT_ERROR:"RemoveLessonElementError",

            GET_ALL_LESSONS_START:"GetAllLessonsStart",
            GET_ALL_LESSONS_ERROR:"GetAllLessonsError",
            GET_ALL_LESSONS:"GetAllLessons",

            EDIT_LESSON:"OpenLesson",
            NEW_LESSON:"OpenNewLesson",
            CLOSE_LESSON:"CloseLesson",

            /// Verse Search Actions
            VERSE_SEARCH_START:"VerseSearchStart",
            VERSE_SEARCH:"VerseSearch",
            VERSE_SEARCH_UPDATE_SEARCH_TYPE:"VerseSearchType",
            VERSE_SEARCH_UPDATE_SEARCH_TEXT:"VerseSearchText",
            VERSE_SEARCH_ERROR:"VerseSearchError",
            REMOVE_VERSE_SEARCH_RESULT_SET:"RemoveVerseSearchResultSet",

            /// User Message Actions
            ADD_USER_MESSAGE: "AddUserMessage",
            REMOVE_USER_MESSAGE: "RemoveUserMessage",
            UPDATE_USER_MESSAGE: "UpdateUserMessage",
        }
    },
    pubSub: {
        topics: {
            USER_MESSAGE: "user-message"
        }
    }
};

export default Constants;