import { createContext, useState } from "react";

export const CurrentUserContext = createContext([]);

export const CurrentUserProvider = ({ defaultUser = "User", children }) => {
    const [currentUser, setCurrentUser] = useState(defaultUser);

    return (
        <CurrentUserContext.Provider value={[currentUser, setCurrentUser]}>
            {children}
        </CurrentUserContext.Provider>
    );
};
