import { createContext, useContext, useEffect, useState } from "react";

const ProfileContext = createContext();
export const ProfileProvider = ({ children }) => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(()=>{

    },[])
}
export const useProfile = () => {
    return false;
}