/**
 * Created by lee on 6/13/17.
 */
import React from "react";
import Constants from "../constants";
import VerseText from "../components/verse-text";
import moment from "moment";
import Utils from "../utils";
import DatePicker from "react-day-picker";
import 'react-day-picker/lib/style.css';
import DayPickerInput from 'react-day-picker/DayPickerInput';

require("../less/style.less");
require("./lesson-editor.less");
// /////////////////////////////////////////////////////////////////////////////////////////////////////////////
// -- Dumb Component
// <LessonElement
// 	index: 0
// 	element: {verseSpec: "Gen 1:1-26", notes: "This is about ...", lessonId: "abc" }
// 	onDelete: (idx) => {},
// 	onUpdate: (element, i) => {}
// 	onCancelCreate: () => {}
// >
// https://www.youtube.com/watch?v=szmS_M-BMls&list=PL6gx4Cwl9DGBuKtLgPR_zWYnrwv-JllpA&index=5#t=273.456242

 class LessonElement extends React.Component {
   constructor(props) {
	   super(props);
	   this.state =  {
			   editing: this.props.element.verseSpec ? false : true,
			   element: Object.assign({}, this.props.element)
		   };

	   this.doUpdate = this.doUpdate.bind(this);
	   this.onEditCancel = this.onEditCancel.bind(this);
	   this.onEdit = this.onEdit.bind(this);
	   this.onEditCancel = this.onEditCancel.bind(this);
	   this.onVerseSpecChange = this.onVerseSpecChange.bind(this);
	   this.onNotesChanged = this.onNotesChanged.bind(this);
	 }

	componentDidMount(){
		setTimeout(() => {this.forceUpdate(() => {  console.debug("ForceUpdate"); });}, 0);
	}

	onEdit(){
		this.setState( Object.assign({}, this.state, {editing:true}) );
		setTimeout(()  => {this.forceUpdate(() => {});}, 0);

	}

	onEditCancel(){
		if(!this.state.element.verseSpec)
			this.props.onCancelCreate();
		else
			this.setState(Object.assign({}, this.state, {editing:false}));
	}

	onVerseSpecChange(verseSpec){
		let nuElement = Object.assign({}, this.state.element, {verseSpec : verseSpec} );
		this.setState(Object.assign({}, this.state, {element:nuElement}));
	//    setTimeout(() => { this.doUpdate()}, 0 );
	}

	renderNormal(){
		const notesStr = this.state.element.notes.join("\n");
		const textAreaRows = this.state.element.notes.length;
		return (
				<table  className="lesson-element">
					<tbody>
						<tr className="lesson-element">
							<td className="lesson-element-index" rowSpan={2} >
								<div className="lesson-element-actions">
									<button onClick={this.onEdit}>
         <span className="glyphicon glyphicon-edit"/>
									</button>
									<button onClick={this.props.onDelete}>
										<span className="glyphicon glyphicon-remove"/>
									</button>
								</div>
								<span> { this.props.index+1 }</span>
							</td>
							<td className="lesson-element-text"
									onDoubleClick={this.onEdit}
									>
									<VerseText
										readOnly={true}
										verses={this.state.element.verseSpec}
										onVerseSpecSelected={this.onVerseSpecChange}
									/>
							</td>
					   </tr>
					   <tr>
						   <td className="lesson-element-notes" >
								<textarea disabled={true}
									className="lesson-element-notes"
									rows={textAreaRows}
									defaultValue={notesStr}
									/>
						   </td>
					   </tr>
				   </tbody>
			   </table>
		)
	}

	doUpdate(){
		this.props.onUpdate(this.state.element, this.props.index );
		this.onEditCancel();
	}

	onNotesChanged(notesStr){
		let notes = notesStr.trim().split("\n");
		this.setState({
			element: Object.assign( {}, this.state.element, { notes: notes })}
		);
	}

	renderEditor(){
		return (
				<table className="lesson-element" >
					<tbody>
						<tr className="lesson-element">
						<td className="lesson-element-index" rowSpan={2} >
							<div className="lesson-element-actions">
								<button onClick={ this.doUpdate} > <span className="glyphicon glyphicon-save"/></button>
								<button onClick={() => this.onEditCancel()}><span className="glyphicon glyphicon-remove"/></button>
							</div>
							<span> { this.props.index+1 }</span>
						</td>
							<td className="lesson-element-text" >
								<VerseText
									readOnly={false}
									verses={this.state.element.verseSpec}
									onVerseSpecSelected={this.onVerseSpecChange}
								/>
							</td>
					   </tr>
					   <tr>
						   <td className="lesson-element-notes" >
								<textarea
									onChange={ (e) => this.onNotesChanged(e.target.value) }
									className="lesson-element-notes"

									defaultValue={this.state.element.notes.join('\n')}
									rows={this.state.element.notes.length + 1} />
						   </td>
					   </tr>
				   </tbody>
			   </table>
		)
	}

	render(){
		if (this.state.editing)
			return this.renderEditor();
		else
			return this.renderNormal();
	}
};

// /////////////////////////////////////////////////////////////////////////////////////////////////////////////
// -- Dumb Component
// <LessonEditor
// lesson={id, title, teacher, lessonDate, elements}
// onSave={(lesson) => {}}
// onClose={(lessonId) => {}}
// />
 class LessonEditor extends React.Component {

    constructor(props) {
        super(props);
        console.debug( "lesson-editor.constructor: props: ", this.props );

        const lesson = Object.assign({}, this.props.lesson);
        lesson.elements = lesson.elements || [];
        this.state =  {
            lesson: lesson
        };

        this.renderElement = this.renderElement.bind(this);
        this.cancelCreateElement = this.cancelCreateElement.bind(this);
        this.newElement = this.newElement.bind(this);
        this.updateElement = this.updateElement.bind(this);
        this.removeElement = this.removeElement.bind(this);
        this.updateLesson = this.updateLesson.bind(this);
        this.updateLessonDate = this.updateLessonDate.bind(this);
        this.updateLessonTitle = this.updateLessonTitle.bind(this);
        this.updateLessonTeacher = this.updateLessonTeacher.bind(this);
    }

	updateLesson(lesson) {
		this.setState(Object.assign({}, this.state, {lesson: lesson}))
	}

	updateElement(element, idx)  {
		let nuElem = Object.assign({}, element, {lessonId: this.state.lesson.id});
		let elements = this.state.lesson.elements;
		let newLesson = Object.assign({}, this.state.lesson, {elements: Utils.replaceArrayElement(elements,idx,nuElem)});
		this.updateLesson(newLesson);
		setTimeout(()=> { this.props.onSave( this.state.lesson ) }, 0);
	}

	removeElement(idx){
		let elements = this.state.lesson.elements;
		let newLesson = Object.assign({}, this.state.lesson, {elements: Utils.removeArrayElement(  elements, idx)});
		this.updateLesson(newLesson);
	}

	renderElement(element, i){
		return (
			<div key={i} className="lesson-element">
				<LessonElement
					key={i}
					index={i}
					element={element}
					onUpdate={this.updateElement}
					onDelete={this.removeElement}
					onCancelCreate={this.cancelCreateElement}
				/>
			</div>
		);
	}

	updateLessonDate( date ){
		var newLesson = Object.assign({}, this.state.lesson, {lessonDate: moment(date).format(Utils.dateFormat)});
		console.debug( "lesson-editor.updateLessonDate: nuLesson: ", newLesson );
		this.updateLesson(newLesson);
	}

	updateLessonTitle(title){
		var newLesson = Object.assign({}, this.state.lesson, {title: title});
		this.updateLesson(newLesson);
	}

	updateLessonTeacher(teacher){
		var newLesson = Object.assign({}, this.state.lesson, {teacher: teacher});
		this.updateLesson(newLesson);
	}

	cancelCreateElement(){
		const elements = (this.state.lesson.elements || []).filter( element  => element.verseSpec );
		const lesson = Object.assign({}, this.state.lesson, {elements: elements} );
		this.updateLesson(lesson);
	}

	newElement(){
		let nuElement = { notes:[], verses:null, lessonId: this.state.lesson.id };
		let lesson = Object.assign({}, this.state.lesson, {elements: (this.state.lesson.elements || []).concat([nuElement])} );
		this.updateLesson(lesson);
	}

	render () {
		// console.debug( "lesson-editor.render: props: ", this.props );
		const dateValue = moment( this.state.lesson.lessonDate, Utils.dateFormat).format('YYYY-MM-DD') ;
		// console.debug( "lesson-editor.render: lessonDate: ", dateValue );
		return (
			<div>
				<div>
					<span>Title: <input onChange={(e)=>this.updateLessonTitle(e.target.value)} ref="lessonTitle" value={this.state.lesson.title} type="text"/></span>
					<span>Teacher: <input onChange={(e)=>this.updateLessonTeacher(e.target.value)} ref="lessonTeacher" value={this.state.lesson.teacher} type="text"/></span>
					<span>Date</span>

					<DayPickerInput
						name="Lesson Date"
						placeholder= "YYYY-MM-DD"
						format="YYYY-MM-DD"
						value={ dateValue }
						onDayChange={this.updateLessonDate}
					/>
					<br/>
					<button onClick={() => {
						console.debug("lesson-editor.onSaveClick: saving:", this.state.lesson);
						this.props.onSave(this.state.lesson);
					}}>Save</button>
				</div>
				<div>
				<button onClick={() => {
					this.newElement();
				}}><span className="glyphicon glyphicon-plus"  alt={"Create New Element"} />
				</button>
				{
					this.state.lesson.elements.map(this.renderElement)
				}
				</div>
			</div>
		)
	}
};

export default LessonEditor;
