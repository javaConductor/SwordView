
import configService from "../config/config";
import restClientFactory  from "../services/rest-client"

let config = configService.getConfig();
let restClient = restClientFactory.makeClient(
    config.lessonService.host,
    config.lessonService.port,"");
let baseUrl = "notes/";

var self = {
    /** 
     * Returns a Promise(Note)
     *
     * @param noteId
     */
    getNote( noteId ) {
        var url = baseUrl + noteId;
        return restClient.doGet(url);
    },

    saveNote( note ){
        return restClient.doPost( baseUrl, note ).then(function onFulfilled(response) {
            if (response.success)
                return response.data;
            throw response.errorMessage;
        }, function onRejected(error) {
            throw error;
        });
    },

    removeNote( noteId ){
        return restClient.doDelete( baseUrl+noteId ).then(function onFulfilled(response) {
            if (response.success)
                return response.success;
            throw response.errorMessage;
        }, function onRejected(error) {
            throw error;
        });
    },

    /**
     * Returns a Promise([Note])
     *
     * @param start
     * @param count
     */
    allNotes: function (username, start, count) {
        var url = baseUrl + start + "/" + count;
        //var url = `{self.baseUrl}{start}/{count}`;
        return restClient.doGet(url).then(function onFulfilled(response) {
        	console.debug("allNotes("+username+", "+start+", "+end+"): response:", response );
            return response.data;
        }, function onRejected(error) {
            throw error;
        });
    }
};

export  default  self;
