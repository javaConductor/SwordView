/**
 * Created by lee on 6/18/17.
 */
 

"use strict";
/*jshint esversion: 6 */
/* jshint node: true */

import React from "react";
import bibleService from "../services/bible";
import "./verse-text.less";
import throttle from "lodash/throttle";

// <VerseText
//	verses="Gen 9:1-6"throttle
//	readOnly={true | false}
//	onVerseSpecSelected={(verseSpec) => {}}
// >
 class VerseText extends React.Component {

    getInitialState() {
        let state = {
        	validVerseSpec: this.props.verses && this.isValidVerseSpec(this.props.verses),
            lastVerseSpec: this.props.verses || "",
            verses: this.props.verses,
            verseList: [],
            readOnly: this.props.readOnly
        }
        console.debug("verse-text: initialState: state:", state);
        	return state;
    }
    componentDidMount(){
        if (this.state.validVerseSpec)
        	this.onVerseSpecChange( this.state.lastVerseSpec );   
        if (this.props.verses === ""){
        	this.refs.verseSpec.focus();
        }
        console.debug("verse-text: didMount: state: ", this.state); 	
    }
    
    renderText(){
    	let lastVerse = 0;
    	let key = 0;
        return this.state.verseList.reduce((acc, verse)=>{
            let nodes = [];   
                     
            if (acc.length > 0 && lastVerse !== verse.verse-1) {
                nodes.push(<p key={key++} />);
            }
            lastVerse = verse.verse;
            nodes.push(
                <span key={key++} className="verse-number">{verse.verse}</span>
            );
            nodes.push(
                <span key={key++} className="verse-text">{verse.verseText}</span>
            );
            return [...acc, ...nodes];// acc.concat(nodes);
        },[]);        
    }
    
    isValidVerseSpec(verseSpec){
    	let re = /[\d]*[ ]*[a-zA-Z]+ [\d][:[\d]*]*/;
    	return re.exec(verseSpec);
    }
    onVerseSpecChange(verseSpec){
    	const self = this;
    	if ( this.isValidVerseSpec(verseSpec)){
    		// get the verseList for the verseSpec
	        return bibleService.getVerses(verseSpec).then(
	            function onFulfilled(verseRange) {
	            	console.debug("verse-text: updateVerseSpec: onFulfilled: verseRange:", verseRange);
	            	// verseRange={verseSpec: "Genesis 1:1", verses: []}
		            if(!verseRange.verses || verseRange.verses.length == 0){
	   	    			self.setState({lastVerseSpec: verseRange.verseSpec, validVerseSpec: false, verseList: [] });	            	
		            }else{
		            	let verseList = verseRange.verses;
		                self.setState( {lastVerseSpec: verseRange.verseSpec, validVerseSpec: true, verseList: verseRange.verses } );
						self.props.onVerseSpecSelected( verseRange.verseSpec );
    		    	}

   				},
	            
	            function onRejected( error ) {	            
   	    			self.setState({lastVerseSpec: verseSpec, validVerseSpec: false, verseList: [] });
	        	}
	        );
    
    	}else{
   	    	this.setState({lastVerseSpec: verseSpec, validVerseSpec: false, verseList: []});
    	}
    }
//     onVerseSpecChange(verseSpec){	
//     	if ( this.isValidVerseSpec(verseSpec)){
//     		this.updateVerseSpec(verseSpec).then(() => {
//     		if(this.state.validVerseSpec)
//     			this.props.onVerseSpecSelected( verseSpec );
//     		});
//     	}else{
//    	    	this.setState({lastVerseSpec: verseSpec, validVerseSpec: false, verseList: []});
//     	}
//     },

    render(){
        return (
            <table className="verse-text">
	            <tbody>
		            <tr>
			            <td className="verse-text-verse-spec">
		            		{ (this.props.readOnly) ? (
			            		<span className="verse-text-verse-spec">{this.state.lastVerseSpec}</span>
		            		) : (
				               	<input
				               		disabled={this.props.readOnly}
					               	className="verse-text-verse-spec" 
				               		type="text" 
				               		ref={"verseSpec"}
				               		style={{
				               			color: (this.state.validVerseSpec ? "navy" : "red"), 
				               			borderColor: (this.state.validVerseSpec ? "navy" : "red") 
				               			}}
				               		defaultValue={ this.state.lastVerseSpec } 
				               		onChange={ (e) => { this.onVerseSpecChange(e.target.value) } } 
				               	/>)
				               	}
				        </td>
			            <td className="verse-text-text">
			            <div className="verse-text-text">
				                { this.renderText() }
				        </div>
			            </td>
		            </tr>
	            </tbody>
	        </table>
        )
    }

};

export default VerseText;
