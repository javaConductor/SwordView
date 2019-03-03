/**
 * Created by lee on 3/1/19.
 */
import bibleService from "../services/bible";
import C from "../constants";

const obj = {

    showChapter: (bookId, chapter) => {
        return (dispatch, getState) => {
            dispatch({
                type: C.Actions.Types.SHOW_CHAPTER_START,
                payload: {bookId, chapter}
            });
            bibleService.getChapter(bookId, chapter).then(
                (verses) => {
                    if (success)
                        dispatch({
                            type: C.Actions.Types.SHOW_CHAPTER,
                            payload: {
                                verses: verses
                            }
                        });
                },
                (error) => {
                    dispatch({
                        type: C.Actions.Types.SHOW_CHAPTER_ERROR,
                        error: error,
                        payload: {bookId: bookId, chapter: chapter}
                    });
                }
            );
        }
    },
};
///
export default obj;
