import { createContext, useReducer, useEffect } from 'react';
import { projectauth } from '../firebase/config';

export const authContext = createContext();

const authReducer = (state, action) => {
    switch(action.type){

        case 'LOGIN':
            return {...state, user: action.payload};

        case 'LOGOUT':
            return {...state, user: null};

        case 'AUTH_IS_READY':
            return {...state, user: action.payload, authIsReady: true};

        default:
            return state;
    }
}

export const AuthContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null,
        authIsReady: false
    });

    useEffect(() => {
        const unsub = projectAuth.onauthStateChanged((user) => {
            dispatch({ type: 'AUTH_IS_READY', payload: user});
            unsub();
        });
    }, []);

    return (
        <AuthContextProvider.Provider value={{ ...state, dispatch }}>
            { children }
        </AuthContextProvider.Provider>
    );
}