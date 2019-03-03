/**
 * Created by lee on 6/16/17.
 */
import React from "react";
import ReactDOM from "react-dom";
var LessonList = require("../components/lesson-list")
var MenuView = React.createClass({
    render() {
        return (
        <nav>
            <ul>
                <li><a to="lessons">Lessons</a></li>
            </ul>
        </nav>
        );
    }
});
export default MenuView;
