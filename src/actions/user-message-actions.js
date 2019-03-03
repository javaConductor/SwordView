/**
 * Created by lee on 6/23/17.
 */
import C from "../constants";

let obj = {
    addMessage: ( message ) => ({
        type: C.Actions.Types.ADD_USER_MESSAGE,
        payload: {
            message: message
        }
    }),

    removeMessage: ( messageId ) => ({
        type: C.Actions.Types.REMOVE_USER_MESSAGE,
        payload: {
            messageId: messageId
        }
    }),

    updateMessage: ( message ) => ({
        type: C.Actions.Types.UPDATE_USER_MESSAGE,
        payload: {
            messageId: messageId
        }
    }),

};
///
export default obj;
