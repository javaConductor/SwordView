
import configService from "../config/config";
import restClientFactory  from "../services/rest-client"

let config = configService.getConfig();
let restClient = restClientFactory.makeClient(
    config.lessonService.host,
    config.lessonService.port,"");
let baseUrl = "lessons/";

var self = {
    /** 
     * Returns a Promise(Lesson)
     *
     * @param lessonId
     */
    getLesson(lessonId) {
        var url = baseUrl + lessonId;
        return restClient.doGet(url);
    },

    saveLesson( lesson ){
        return restClient.doPost( baseUrl, lesson ).then(function onFulfilled(response) {
            if (response.success)
                return response.data;
            throw response.errorMessage;
        }, function onRejected(error) {
            throw error;
        });
    },

    removeLesson( lessonId ){
        return restClient.doDelete( baseUrl+lessonId ).then(function onFulfilled(response) {
            if (response.success)
                return response.success;
            throw response.errorMessage;
        }, function onRejected(error) {
            throw error;
        });
    },

    /**
     * Returns a Promise([Lesson])
     *
     * @param start
     * @param count
     */
    allLessons: function (start, count) {
        var url = baseUrl + start + "/" + count;
        //var url = `{self.baseUrl}{start}/{count}`;
        return restClient.doGet(url).then(function onFulfilled(response) {
        	console.debug("allLessons: response:", response );
            return response.data;
        }, function onRejected(error) {
            throw error;
        });
    }
};

export  default  self;
