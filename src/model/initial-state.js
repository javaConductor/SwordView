/**
 * Created by lee on 6/23/17.
 */
import moment from "moment";
import Utils from "../utils/index";

let initialState = () => {
    return {
        verseSearch: {
            resultSets: [],
            searchText: "few men left",
            searchType: "ALL"
        },
        lessonList: {
            lessons: [{
                id:"ABC",
                lessonDate: moment().format(Utils.dateFormat),
                title:"In the Beginning",
                teacher: "Me",
                elements:[]
            }],
            openLessonIds: []
        },
        userMessages: {
            messages: [{id:"abcxyz", level: "INFO",  messageText: "Welcome to Sword Explorer !!"}]
        }
        //chaptersList: {
        //    chapters : [{
        //        book: 0,
        //        chapter: 1,
        //        verses: []
        //    }]
        //}
    };
};

console.debug("Initial State: ", initialState());

export const initialLesson = () => {
    return ({id:undefined, lessonDate: moment().format(Utils.dateFormat), title:"", teacher: "", elements:[]});
};

export default initialState;
