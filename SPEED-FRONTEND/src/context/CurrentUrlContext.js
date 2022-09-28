import { createContext, useState } from "react";

export const CurrentUrlContext = createContext([]);

export const CurrentUrlProvider = ({ children }) => {
    const [selectedPage, setSelectedPage] = useState("/");

    return (
        <CurrentUrlContext.Provider value={[selectedPage, setSelectedPage]}>
            {children}
        </CurrentUrlContext.Provider>
    );
};
