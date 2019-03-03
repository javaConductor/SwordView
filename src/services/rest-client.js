/**
 * Created by lee on 6/20/17.
 */
import axios from "axios";
import $q from "q";
import configService from "../config/config";

let client = function (host, port, token) {
    var self = {
        configured: false,
        baseUrl: "http://"+host+":"+port+"/",
        doGet (path, queryParams) {
            let url = this.baseUrl + path;
            let completeUrl = queryParams ?
                url + "?" + queryParams.keys.map((k) => k + "=" + queryParams[k]).join("&") :
                url;
            return axios.get(completeUrl).then(
                function onFulfilled(results) {
                    return results.data;
                },
                function onRejected(error) {
                    throw error;
                }
            );
        },

        doPost (path, data) {
            let url = this.baseUrl + path;
            return axios.post( url, JSON.stringify(data), {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(
                function onFulfilled(results) {
                    return results.data;
                },
                function onRejected(error) {
                    throw error;
                }
            );
        },

        doDelete (path) {
            let url = this.baseUrl + path;
            return axios.delete(url).then(
                function onFulfilled(results) {
                    return results.data;
                },
                function onRejected(error) {
                    throw error;
                }
            );
        },


        /**
         *
         * @param searchText
         * @param searchType
         * @returns {*}
         */
        searchBible: function (searchText, searchType) {
            var url = self.getBaseUrl() + 'withText/' + searchText + '/' + searchType;
            return axios.get(url).then(
                function onFulfilled(results) {
                    return results.data.data;
                },
                function onRejected(error) {
                    throw error;
                }
            );
        }
    }
    return  self;
};

const factory = {
    makeClient(host, port, token){
        return client(host, port, token);
    },
};

export default factory;
