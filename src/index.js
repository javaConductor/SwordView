/**
 * Created by lee on 6/14/17.
 */
import React from "react";
//var React = require('react');
import ReactDOM from "react-dom";
import {HashRouter as Router, Route, Switch} from "react-router-dom";
var createReactClass = require('create-react-class');

import VerseSearch from "./components/verse-search";
import AboutView from "./components/about-view";
import UserMessageView from "./components/user-msg-view";
import LessonList from "./components/lesson-list";
import {Provider} from "react-redux";
import store from "./store";

import createBrowserHistory from "history/createBrowserHistory";
const browserHistory = createBrowserHistory();

require("./less/style.less");
class MainView extends React.Component {
//const MainView = createReactClass({
    render(){
        return (
            <div>
                <UserMessageView/>
                <nav>
                    <ul>
                        <li><a href="#/lessons">Lessons</a></li>
                        <li><a href="#/">Verse Search</a></li>
                    </ul>
                </nav>
                <div className="main-content">
                <Router history={browserHistory}>
                    <Switch>
                        <Route exact path="/" component={VerseSearch}/>
                        <Route path="/verse-search" component={VerseSearch}/>
                        <Route path="/lessons" component={LessonList}/>
                        <Route path="/about" component={AboutView}/>
                    </Switch>
                </Router>
                </div>
                <div className="footer">
                    <footer>Sword Explorer (c) 2000 - 2019</footer>
                </div>
            </div>
        )
    }
};

ReactDOM.render(
    <Provider store={store} >
        <Router history={browserHistory}>
            <MainView/>
        </Router>
    </Provider>,
    document.getElementById('view')
);

module.hot.accept();
