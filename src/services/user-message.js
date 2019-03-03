/**
 * Created by lee on 6/14/17.
 */
import Constants from "../constants";
import pubSub from "pubsub-js";

let userMessage = {

    userMessage: function (msg) {
        pubSub.publish(Constants.pubSub.topics.USER_MESSAGE, {level: "INFO", message: msg})
    },
    errorMessage: function (error) {
        pubSub.publish(Constants.pubSub.topics.USER_MESSAGE, {level: "ERROR", message: error })
    }

};

export default userMessage;
