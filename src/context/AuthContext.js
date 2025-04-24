import { createContext } from 'react';

export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    const user = {
        displayName: 'Hephaestus',
        photoURL: 'https://es.wikipedia.org/wiki/Hefesto#/media/Archivo:Vulcan_Coustou_Louvre_MR1814.jpg',
        id: 101
    };

    return (
        <AuthContext.Provider value={{ user }}>
            { children }
        </AuthContext.Provider>
    );
}