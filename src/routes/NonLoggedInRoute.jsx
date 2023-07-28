import { Redirect, Route } from "react-router-dom/cjs/react-router-dom.min";
import { useProfile } from "../context/profile.context";

const NonLoggedInRoute = ({children, ...props}) =>{
    const profile = useProfile();
    if(profile)
    {
        return <Redirect to="/app"/>
    }
    return <Route {...props}>{children}</Route>
};
export default NonLoggedInRoute;