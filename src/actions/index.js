/**
 * Created by lee on 6/19/17.
 */

import Constants from "../constants";
import bibleService from "../services/bible";

let obj = {
    addUserMessage: (level, message) => ({
        type: Constants.Actions.Types.ADD_USER_MESSAGE,
        payload: {
            level: level,
            message: message
        }
    }),

    verseSearch: (searchText, searchType) => {
        return (dispatch, getState) => {
            if(searchText.trim().length > 0) {
                dispatch({
                    type: Constants.Actions.Types.VERSE_SEARCH_START,
                    payload: {
                        searchType: searchType,
                        searchText: searchText
                    }
                });
                bibleService.searchBible(searchText, searchType).then(
                    (searchResults) => {
                        dispatch({
                            type: Constants.Actions.Types.VERSE_SEARCH,
                            payload: {
                                searchResults: searchResults,
                                searchType: searchType,
                                searchText: searchText
                            }
                        });
                    },
                    (error) => {
                        dispatch({
                            type: Constants.Actions.Types.VERSE_SEARCH_ERROR,
                            error: error,
                            payload: {
                                searchType: searchType,
                                searchText: searchText
                            }
                        });
                    }
                );
            }
        };
    },

    updateSearchType (searchType) {
        console.log("actions.updateSearchType("+searchType+")");
        if(searchType.trim().isEmpty)
            return null;
        return {
            type: Constants.Actions.Types.VERSE_SEARCH_UPDATE_SEARCH_TYPE,
            payload: {
              searchType: searchType
            }
        };
    },

    updateSearchText (searchText) {
        console.log("actions.updateSearchText("+searchText+")");
        if(searchText.trim().isEmpty)
            return null;
        return {
            type: Constants.Actions.Types.VERSE_SEARCH_UPDATE_SEARCH_TEXT,
            payload: {
              searchText: searchText
            }
        };
    },

    removeVerseSearchResult: (idx) => ({
        type: Constants.Actions.Types.REMOVE_VERSE_SEARCH_RESULT_SET,
        payload: {
            idx: idx
        }
    })

};
import chapterActions from "./chapter-actions";
import lessonActions from "./lesson-actions";
import userMessageActions from "./user-message-actions";
export default Object.assign({}, obj, lessonActions, userMessageActions, chapterActions);
