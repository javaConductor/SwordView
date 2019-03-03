/**
 * Created by lee on 6/22/17.
 */
/**
 * Created by lee on 6/21/17.
 */
import C from "../constants";
import initialState from "../model/initial-state";

export default function (startState={}, action) {
    let state = startState;
    //console.debug("verse-search-reducer: action: "+action.type + " action.payload: "+JSON.stringify(action.payload));
    switch (action.type) {
        case C.Actions.Types.VERSE_SEARCH_UPDATE_SEARCH_TEXT:
            return Object.assign({}, state, {
                searchText: action.payload.searchText
            });

        case C.Actions.Types.VERSE_SEARCH_UPDATE_SEARCH_TYPE:
            return Object.assign({}, state, {
                searchType: action.payload.searchType
            });

        case C.Actions.Types.REMOVE_VERSE_SEARCH_RESULT_SET:
            let sets = state.resultSets;
            if (action.payload.idx >= sets.length){
                return state;
            }
            sets.splice(action.payload.idx, 1);
            return Object.assign({}, state, {
                resultSets: sets
            });

        case C.Actions.Types.VERSE_SEARCH_START:
            return Object.assign({}, state, {
                searchText: action.payload.searchText,
                searchType: action.payload.searchType});

        case C.Actions.Types.VERSE_SEARCH:
            let results = Object.assign({},
                action.payload,
                {searchResults:action.payload.searchResults});
            let resultSets = state.resultSets;
            resultSets.unshift(results);
            // console.debug("verse-search-reducer: action: "+action.type +
            //     " new state: "+ JSON.stringify(nuState));
            return Object.assign({}, state, {resultSets: resultSets});

        case C.Actions.Types.VERSE_SEARCH_ERROR:
            return state;

        default:
            return state;
    }
};