/**
 * Created by lee on 6/13/17.
 */
import React from "react";
import LessonEditorPanel from "./lesson-editor-panel";
import Utils from "../utils/index";
import moment from "moment";
let ReactRedux = require("react-redux");
let DatePicker = require("react-day-picker");
import DayPickerInput from 'react-day-picker/DayPickerInput';

import Modal from "react-modal";
import actions from "../actions";
import {initialLesson} from "../model/initial-state";

require("./lesson-list.less");

///////////////////////////////////////////////////////////////////////
// <LessonListRow
//      index: 0
//      lesson: {title:abc, teacher:123, elements:[]}
//      onOpenLesson: (index) => {},
//      onDeleteLesson: (index) => {}
// />
let LessonListRow = (props) => {
    console.debug("LessonListRow(): props: "+JSON.stringify(props));
        let lesson = props.lesson;
        return (
            <tr className="lesson-info">
                <td  className="lesson-info-actions">
                    <button
                        title="Edit Lesson"
                        className="lesson-list-button"
                        onClick={() => props.onOpenLesson(props.index)}>
                         <span className="glyphicon glyphicon-open"/>
                    </button>
                    <button title="Remove Lesson" className="lesson-list-button" onClick={() => props.onDeleteLesson(props.index)}><span className="glyphicon glyphicon-remove"/></button>
                </td>
                <td className="lesson-info-title" > <span>{lesson.title}</span></td>
                <td className="lesson-info-teacher"> {lesson.teacher} </td>
                <td className="lesson-info-date"> <span>{lesson.lessonDate.toString()} </span></td>
            </tr>);
};

///////////////////////////////////////////////////////////////////////
// -- Dumb Component
// <NewLessonEditor
//      onSave: (lesson) => {},
//      onCancel: () => {}
//      show: () => boolean
// />
 class NewLessonEditor extends React.Component {
   constructor(props) {
     super(props);
     this.state =   {
            newLesson: initialLesson()
        };
   }

    componentDidMount () {
        Modal.setAppElement('#view');
    }


    updateLessonDate( date ){
        let newLesson = Object.assign({}, this.state.newLesson, {lessonDate: moment(date).format(Utils.dateFormat)});
        this.setState(Object.assign({}, this.state, {newLesson: newLesson }));
    }

    updateLessonTitle(title){
        let newLesson = Object.assign({}, this.state.newLesson, {title: title});
        this.setState(Object.assign({}, this.state, {newLesson: newLesson }));
    }

    updateLessonTeacher(teacher){
        let newLesson = Object.assign({}, this.state.newLesson, {teacher: teacher});
        this.setState(Object.assign({}, this.state, {newLesson: newLesson }));
    }

    render(){
        return (
            <Modal
            className="Modal"
            isOpen={this.props.show()}
            onRequestClose={this.props.onCancel}
            contentLabel="New Lesson"
            >
                <form action="">
            <div>
                <span>Title:
                    <input onChange={(e)=>this.updateLessonTitle(e.target.value)}
                           disabled={false}
                           ref="lessonTitle"
                           type="text"/></span><br/>
                <span>Teacher:
                    <input onChange={(e)=>this.updateLessonTeacher(e.target.value)}
                           disabled={false}
                           ref="lessonTeacher"
                           type="text"/></span>
                <span>Date:</span>

                <DatePicker
	                name="Lesson Date"
	                placeholder={ Utils.dateFormat }
	                format={ Utils.dateFormat }
	                value={ moment( this.state.newLesson.lessonDate, Utils.dateFormat) }
	                selectedDays={ moment( this.state.newLesson.lessonDate, Utils.dateFormat).toDate() }
	                onDayClick={this.updateLessonDate}
                />
                <br/>
                <button className="lesson-list-button"
                    disabled={ !this.state.newLesson.teacher.trim() || !this.state.newLesson.title.trim() }
                    onClick={() => {
                    	this.props.onSave(this.state.newLesson);
                    	}}>Save
                </button>
                <button className="lesson-list-button" onClick={() => this.props.onCancel() }>Cancel</button>
            </div>
                </form>
        </Modal>
        );
    }
};

///////////////////////////////////////////////////////////////////////
// -- Smart Component
// <LessonList
// >
//https://www.youtube.com/watch?v=szmS_M-BMls&list=PL6gx4Cwl9DGBuKtLgPR_zWYnrwv-JllpA&index=5#t=273.456242
class LessonList extends React.Component {
  constructor(props) {
    super(props);
    this.state =  {
            isCreatingNewLesson: false,
            lessons: this.props.lessonList.lessons || []
        };
    this.creatingNewLesson = this.creatingNewLesson.bind(this);
    this.onCancelNewLesson = this.onCancelNewLesson.bind(this);
    this.onNewLesson = this.onNewLesson.bind(this);
    this.renderLessonListRow = this.renderLessonListRow.bind(this);
  }

    componentDidMount  () {
        this.props.getAllLessons();
        console.debug("lesson-list: props: "+this.props);
        console.debug("lesson-list: state: "+this.state);
    }

    updateState(updatedValues){
        this.setState( updatedValues );
        console.debug("lesson-list: updateState: "+this.state);
    }

    lessonFromId( lessonId ){
        return this.props.lessonList.lessons.find((lesson)=> lesson.id === lessonId );
    }

    ////// New Lesson
    onCancelNewLesson(){
        this.updateState({isCreatingNewLesson: false})
    }

    onNewLesson(){
        this.setState({ isCreatingNewLesson: true });
    }

    /////// Render Lesson Row
    renderLessonListRow(lesson, i){
        return (
            <LessonListRow
                onDeleteLesson={(id) =>  {
                    this.props.onDeleteLesson(lesson);
                }}
                onOpenLesson={() => this.props.onEditLesson(lesson.id)}
                lesson={lesson}
                key={i}
                index={i}/>
        );
    }

    creatingNewLesson() {return this.state.isCreatingNewLesson;}

    render(){
        return (<div>
                <div>
                <NewLessonEditor
                    show={this.creatingNewLesson.bind(this)}
                    onSave={(lesson) => {
                    	this.props.onSaveLesson(lesson);
                    	this.setState({isCreatingNewLesson: false});
                    	}
                    }
                    onCancel={this.onCancelNewLesson}
                />
                </div>
                <table className="lesson-list">
                    <thead>
	                    <tr>
	                        <th colSpan={4}>
	                            <button onClick={this.onNewLesson}><span className="glyphicon glyphicon-plus"/></button>
	                        </th>
	                    </tr>
	                    <tr>
	                        <th className="lesson-info-actions"> Actions</th>
	                        <th className="lesson-info-title"> Title</th>
	                        <th className="lesson-info-teacher"> Teacher</th>
	                        <th className="lesson-info-date"> Date</th>
	                    </tr>
                    </thead>
                    <tbody>
	                    <tr>
	                    	<td  colSpan={4}>
	                    	<div className="lesson-list">
			                	<table className="lesson-list">
				                    <tbody>
	            			        {
	                        			this.props.lessonList.lessons.map(this.renderLessonListRow)
	                    			}
	                    			</tbody>
	                    		</table>
	                    	</div>
	                    	</td>
	                    </tr>
                    </tbody>
                </table>
                <div>
                    <LessonEditorPanel/>
                </div>
            </div>
        );

    }
};


let mapStateToProps = function (state) {
    // This component will have access to `appstate.heroes` through `this.props.heroes`
    console.debug("lesson-list: mapStateToProps: lessonList", state.lessonList);
    return {lessonList: state.lessonList};
};

const mapDispatchToProps = dispatch => {
    return {
    //TODO Fix getAllLessons - setting "" instead of empty list
        getAllLessons(){
            dispatch(actions.getAllLessons(0, 1000));
        },
        onEditLesson(lessonId){
            dispatch(actions.editLesson(lessonId));
        },

        onSaveLesson(lesson){
            dispatch(actions.saveLesson(lesson));
        },

        onDeleteLesson(lesson){
            console.debug("onDeleteLesson",this);
            // Confirm Dialog !!
            let ok = confirm("Remove Lesson: "+lesson.title+"?");
            if (ok)
                dispatch(actions.removeLesson(lesson.id));
        },

        onCloseLesson(lessonId) {
            dispatch(actions.closeLesson(lessonId));
        },
    }
};

export default  ReactRedux.connect(mapStateToProps, mapDispatchToProps)(LessonList);
