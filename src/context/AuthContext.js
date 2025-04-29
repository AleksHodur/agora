import { createContext } from 'react';

export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    const user = {
        displayName: 'Hephaestus',
        photoURL: 'https://gateway.pinata.cloud/ipfs/bafkreib2yd5j6ormvvc6rwsbb63c4jigf5j54xfygbfqryvaf6vrqrmwte',
        imgURL: 'https://gateway.pinata.cloud/ipfs/bafkreib2yd5j6ormvvc6rwsbb63c4jigf5j54xfygbfqryvaf6vrqrmwte',
        id: 101,
        uid: 101,
        online: true
    };

    return (
        <AuthContext.Provider value={{ user }}>
            { children }
        </AuthContext.Provider>
    );
}