import { Redirect, Route } from "react-router-dom/cjs/react-router-dom.min";
import { useProfile } from "../context/profile.context";

const LoggedInRoute = ({children, ...props}) =>{
    const profile = useProfile();
    if(!profile)
    {
        return <Redirect to="/login"/>
    }
    return <Route {...props}>{children}</Route>
};
export default LoggedInRoute