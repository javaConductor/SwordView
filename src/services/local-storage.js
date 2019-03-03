
/**
 * Created by lee on 6/23/17.
 */

export const loadState = () => {

    try{
        const serializedState = localStorage.getItem("store");
        if(serializedState === null){
            return undefined
        }
        return JSON.parse(serializedState);
    }
    catch(err){
        return undefined;
    }
};

export const saveState = (state) => {

    try{
        const serializedState = JSON.stringify(state);
        localStorage.setItem("store", serializedState);
    }catch (err){
        ///
    }
};