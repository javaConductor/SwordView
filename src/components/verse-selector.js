/**
 * Created by lee on 6/13/17.
 */
import React from "react";
require("../less/style.less");

 class VerseSelector extends React.Component {

    render() => {
        return (
            <div>
                Verses: <input ref='verse-spec' value="Gen 1:1-30" type="text"/>
                <textarea ref="verse-text" className="verse-text" cols="100" rows="10">

                </textarea>
            </div>
        )
    }
};

export default VerseSelector;

