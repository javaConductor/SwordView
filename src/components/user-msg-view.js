/**
 * Created by lee on 6/13/17.
 */
import React from "react";
import pubSub from "pubsub-js";
import Constants from "../constants";
require("../less/style.less");
let ReactRedux = require("react-redux");
import actions from "../actions";

let levels = ["INFO", "ERROR", "PROGRESS"];

// Dumb Component
//
// <UserMessage
//   message={
//			id: "ABD",
//			level:"INFO",
//			messageText:"Bible Search Unavailable",
//			timestamp:"20170616050801"
//			}
//   onDelete= function(messageId)
// />
 class UserMessage extends React.Component {
    constructor(props) {
        super(props);
        console.debug("user-msg-view: props: ", this.props);
        this.state =  { };
   }

    render(){
        return (
            <div className="user-message">
                <span className={"user-message-level-" + this.props.message.level}>{this.props.message.messageText}</span>
                <button onClick={(e) =>  this.props.onDelete(this.props.message.id)}>
                    <span className="glyphicon glyphicon-remove"/>
                </button>
            </div>
        )
    }

};

 class UserMessageListView extends React.Component {
    constructor(props) {
        super(props);
         console.debug("user-msg-list-view: props: ", this.props);
        let self = this;
        pubSub.subscribe(Constants.pubSub.topics.USER_MESSAGE, (message, level) => {
            let msgs = self.state.messages;
            msgs.push({level: level, messageText: message})
            self.setState({messages: msgs})
        });
        this.state = {};
   }

     render() {
        let messages = this.props.userMessages.messages;
        console.debug("user-msg-list-view: messages: ", messages);
        return (
            <ul className="user-messages">
                {
                    messages.map((message, i) => {
                        return (
                            <li key={i} className="user-message">
                                <UserMessage  index={i}
                                    message={message}
                                    onDelete={this.props.removeMessage}
                                />
                            </li>
                        );
                    })
                }
            </ul>
        )
    }
};

let mapStateToProps = function (state) {
    return {userMessages: state.userMessages};
};

const mapDispatchToProps = dispatch => {
    return {
        removeMessage(messageId){
            dispatch(actions.removeMessage(messageId));
        }
    }
};

export default  ReactRedux.connect(mapStateToProps, mapDispatchToProps)(UserMessageListView);
