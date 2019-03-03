/**
 * Created by lee on 6/14/17.
 */

var obj = {
    getConfig: function getConfig() {
        return {
            "bibleService": {
                "host": "localhost",
                "port": 8001,
                "token": "BibleTOKEN"
            },
            "lessonService": {
                "host": "localhost",
                "port": 8002,
                "token": "LessonTOKEN"
            }
        }
    },
};
export default obj;
