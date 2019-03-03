/**
 * Created by lee on 6/13/17.
 */
import configService from "../config/config";
import restClientFactory from "./rest-client";

let config = configService.getConfig();
const restClient = restClientFactory.makeClient(
    config.bibleService.host,
    config.bibleService.port,"");

var self = {
    configured: false,
    getVerses: function (verseSpec) {
        return restClient.doGet("verses/fromSpec/"+verseSpec).then((data) => {
        	return data.data || {verseSpec: verseSpec, verses: [] };
        });
    },

    /**
     * Returns a Promise(VerseRange{verseSpec, verses})
     *
     * @param book
     * @param chapter
     */
    getChapter: function (book, chapter) {
        return restClient.doGet("verses/"+  book + '/' + chapter).then(
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
        return restClient.doGet('verses/withText/' + searchText + '/' + searchType).then(
            function onFulfilled(results) {
                return results.data;
            },
            function onRejected(error) {
                throw error;
            }
        );
    }
};

export default self;
