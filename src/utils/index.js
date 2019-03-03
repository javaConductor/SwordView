/**
 * Created by lee on 6/25/17.
 */

let lastId = 111;
let obj = {

    /**
     *
     * @param arr The Array
     * @param idx
     * @returns {[*,*]} Array with item at idx removed
     */
    removeArrayElement( arr, idx ){
        return [
            ...arr.slice(0,idx),
            ...arr.slice( idx+1),
        ];
    },
    appendArrayElement( arr, element ){
        return [...arr, element];
    },
    insertArrayElement( arr, idx, element ){
        return [
            ...arr.slice(0,idx),
            element,
            ...arr.slice( idx),
        ];
    },
    replaceArrayElement( arr, idx, element ){
        return [
            ...arr.slice(0,idx),
            element,
            ...arr.slice( idx+1),
        ];
    },
    dateFormat: "YYYY-MM-DD",

    nextId(){
        return ""+(++lastId);
    }
};

export default obj;