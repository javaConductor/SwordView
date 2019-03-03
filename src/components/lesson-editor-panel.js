/**
 * Created by lee on 6/25/17.
 */

import React from "react";
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import "react-tabs/style/react-tabs.less";
import LessonEditor from "./lesson-editor";
import actions from "../actions";
import {connect} from "react-redux";

import PropTypes from "prop-types";

///////////////////////////////////////////////////////////////////////
// -- Smart Component
// <LessonEditorPanel
// />
class LessonEditorPanel extends React.Component {
    constructor() {
        super();
        this.currentIndex = 0;
        this.lessonFromId  = this.lessonFromId.bind(this);
        this.renderTabHeader = this.renderTabHeader.bind(this);
        this.renderTab = this.renderTab.bind(this);
        this.render = this.render.bind(this);
        //this.componentDidMount = this.componentDidMount.bind(this);
    }
    
    lessonFromId(lessonId){
        return this.props.lessonList.lessons.find((lesson) => lesson.id === lessonId);
    }

    renderTabHeader(lessonId, idx){
        let lesson = this.lessonFromId(lessonId);
        console.debug( "lesson-editor-panel.renderHeader: lesson: ", lesson );
        return (
            <Tab key={idx} 
            	//className="lesson-editor-tab" 
            	//selectedClassName="lesson-editor-tab-selected"
            >
            	<span>{lesson.title}</span>
            	<button onClick={() => this.props.onCloseLesson(lesson.id)}>
                	<span className="glyphicon glyphicon-remove">
                	</span>
                	</button>
            </Tab>
        );
    }
    renderTab(lessonId, idx){
        let lesson = this.lessonFromId(lessonId);
        console.debug( "lesson-editor-panel.renderTab: lesson: ", lesson );
        return (
            <TabPanel key={idx}>
                <LessonEditor
                    lesson = { lesson }
                    onSave = { (lesson) => this.props.onSaveLesson(lesson) }
                    onClose = {() =>this.props.onCloseLesson(lessonId) }
                />
            </TabPanel>)
    }

    render(){
        console.debug( "lesson-editor-panel.render: props: ", this.props );
        // in case we have an id but no lesson
        let openLessonIds = this.props.lessonList.openLessonIds.filter((id) => {return this.lessonFromId(id); });
        return (
            <Tabs defaultIndex={0} >
                <TabList >
                    {
                        openLessonIds.map(this.renderTabHeader)
                    }
                </TabList>
                {
                    openLessonIds.map(this.renderTab)
                }
            </Tabs>
        );
    }
}

LessonEditorPanel.propTypes  = {
    lessonList:   PropTypes.shape({
        lessons: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            teacher: PropTypes.string,
            lessonDate: PropTypes.string.isRequired,
            elements: PropTypes.arrayOf(PropTypes.shape({

            }))
        })),
        openLessonIds: PropTypes.arrayOf(PropTypes.string),
        currentLessonEditorIdx:  PropTypes.number
    }).isRequired,
    onSaveLesson:   PropTypes.func.isRequired,
    onCloseLesson:  PropTypes.func.isRequired
};

let mapStateToProps = function (state) {
	console.debug("lesson-editor-panel:mapStateToProps: lessonList", state.lessonList);
    return {lessonList: state.lessonList};
};
const mapDispatchToProps = dispatch => {
    return {
        onSaveLesson(lesson){
            console.debug("Saving lesson: "+JSON.stringify(lesson));
            dispatch(actions.saveLesson(lesson));
        },

        onDeleteLesson(id){
            // Confirm Dialog !!
            let lesson = this.lessonFromId(id);
            let ok = confirm("Remove Lesson: " + lesson.title + "?");
            if (ok)
                dispatch(actions.removeLesson(id));
        },

        onCloseLesson(lessonId) {
            console.debug("Close lesson: "+lessonId);
            dispatch(actions.closeLesson(lessonId));
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(LessonEditorPanel);
