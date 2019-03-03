/**
 * Created by lee on 6/15/17.
 */
import React from "react";
import {Radio, RadioGroup} from "react-radio-group";
import actions from "../actions";

let ReactRedux = require("react-redux");
require("../../less/style.less");
require("./chapter.less");

// <ChaptersPanel
// />
let ChaptersPanel = React.createClass({

    renderResultSet(results){
    	
    	let searchResults =results || []; 
        return (
            searchResults.map((searchResult, i) => {
                return (
                    <tr className={ "search-results"} key={i}>
                        <td className="search-result-verse-spec">
                        	{searchResult.verseSpec}
                        </td>
                        <td >
                        	<span className="search-result-text">
                        		{searchResult.verseText}
                        	</span>
                        </td>
                    </tr>
                )
            })
        )

    },
    render() {
        return (
            <div className="search-results-container">
                <table className={"search-results-container search-result-"+ oddEvenString(this.props.index)} >
                    <thead>
                    <tr>
                        <th colSpan={2}>
                            <span className="search-results-header">Search: {this.props.searchText} </span>
                            <span className="search-results-header">Type: {this.props.searchType} </span>
                            <button className="verse-search-button" onClick={() => this.props.onDelete(this.props.index)}>
                                <span className="glyphicon glyphicon-remove">
                                </span>
                            </button>
                        </th>
                    </tr>
                    </thead>
                    <tbody className="search-result">
                    { this.renderResultSet(this.props.searchResults) }
                    </tbody>
                </table>

            </div>
        )
    }
});

let mapStateToProps = function (state) {
    // This component will have access to `appstate.chapters` through `this.props.chapters`
    return {chapters: state.chaptersList};
};
const mapDispatchToProps = dispatch => {
    return {
        showChapter: (bookId, chapter) => {
            dispatch(actions.showChapter(bookId, chapter));
        },
        removeResultSet(idx) {
            dispatch(actions.removeVerseSearchResult(idx));
        },

        updateSearchType (searchType) {
            console.log("VerseSearch.updateSearchType(" + searchType + ")");
            dispatch(actions.updateSearchType(searchType));
        },

        updateSearchText (searchText) {
            console.log("VerseSearch.updateSearchText(" + searchText + ")");
            dispatch(actions.updateSearchText(searchText));
        },
    }
};

export default  ReactRedux.connect(mapStateToProps, mapDispatchToProps)(VerseSearch);
