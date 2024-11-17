import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';

export const useAuthcontext = () => {
    const context = usecontext(AuthContext);

    if(!context){
        throw Error('useauthContext must be inside an AuthContextProvider');
    }

    return context;
}