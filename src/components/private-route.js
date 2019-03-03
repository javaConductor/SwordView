/**
 * Created by lee on 6/18/17.
 */

import ReactDOM from "react-dom";
import { Redirect} from "react-router";
import { Route} from "react-router-dom";

let PrivateRoute = ({component:Component, user, ...rest}) => (
    <Route {...rest} render={ props=> (
        user ?
            <Component user={user} {...props} /> :
            <Redirect to="login"/>
    )}/>
);

export default PrivateRoute;