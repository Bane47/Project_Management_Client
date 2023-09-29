import { createContext, useState } from "react";

export const UserContext = createContext({});

export function UserContextProvider({children}){
    const [user,setUser]=useState('siva')
    return(
        <UserContext.Provider value={{user,setUser}}>
            {children}
        </UserContext.Provider>
    )
}