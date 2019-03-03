/**
 * Created by lee on 6/15/17.
 */
import React from "react";
import {Radio, RadioGroup} from "react-radio-group";
import actions from "../actions";

let ReactRedux = require("react-redux");
require("../less/style.less");
require("./verse-search.less");


let oddEvenString = (n) => {
    return n % 2 == 0 ? "even": "odd";
};
// <SearchResultSet
//  index=0
//  searchText=""
//  searchType=""
//  searchResults={ [{searchText:"", searchType:"", searchResults:[]}] }
//  onDelete={ (idx) => {} } />
class SearchResultSet extends React.Component {
//let SearchResultSet = React.createClass({

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

    }
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
};

// <VerseSearch />

class VerseSearch extends React.Component {


    renderSearchResultSets (resultSets)   {

        return resultSets.map((resultSet, i) => {
            return (
                <SearchResultSet
                    key={i}
                    index={i}
                    searchText={resultSet.searchText}
                    searchType={resultSet.searchType}
                    ref="search-results"
                    searchResults={resultSet.searchResults}
                    onDelete={this.props.removeResultSet}
                />
            );
        })

    }

    render() {
        return (
            <div className="verse-search">
                Text: <input
                ref='searchText'
                defaultValue={ this.props.verseSearch.searchText }
                type="text"
                className="search-text"
                onChange={(e) => this.props.updateSearchText(e.target.value)}/>
                <div className="search-types">
                    <RadioGroup name="search-type"
                                selectedValue={this.props.verseSearch.searchType}
                                onChange={ this.props.updateSearchType }>
                        All<Radio value="ALL"/>
                        Any<Radio value="ANY"/>
                        Phrase<Radio value="PHRASE"/>
                    </RadioGroup>
                </div>
                <button className="verse-search-button" onClick={() => {
                    this.props.doSearch(
                        this.props.verseSearch.searchText,
                        this.props.verseSearch.searchType);
                } }>Search
                </button>
                <div className="verse-search-results">
                    {this.renderSearchResultSets(this.props.verseSearch.resultSets)}
                </div>
            </div>
        );
    }
};

let mapStateToProps = function (state) {
    // This component will have access to `appstate.heroes` through `this.props.heroes`
    return {verseSearch: state.verseSearch};
};
const mapDispatchToProps = dispatch => {
    return {
        doSearch: (searchText, searchType) => {
            dispatch(actions.verseSearch(searchText, searchType));
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
