/**
 * Created by lee on 6/21/17.
 */
import C from "../constants";
import utils from "../utils";

export default function (startState={}, action) {
    let state = startState;
    console.debug("user-message-reducer: action: "+action.type + " action.payload: "+JSON.stringify(action.payload));
    switch (action.type) {
        case C.Actions.Types.ADD_USER_MESSAGE:
            let m = Object.assign({}, action.payload.message, {id : utils.nextId()});
            return Object.assign({}, state, {
                messages: state.messages.concat([m])
            });

        case C.Actions.Types.REMOVE_USER_MESSAGE: {
            let messages = state.messages.filter((msg) => {
                return msg.id !== action.payload.messageId
            });
            return Object.assign({}, state, {
                messages: messages
            });
        }

        case C.Actions.Types.UPDATE_USER_MESSAGE: {
            let messages = state.messages.map((msg) => {
                return msg.id !== action.payload.messageId ? msg : action.payload.message
            });
            return Object.assign({}, state, {
                messages: messages
            });
        }

        default:
            return state;
    }
};