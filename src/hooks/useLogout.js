import { useEffect, useRef, useState } from 'react';
import { projectAuth, projectFirestore } from '../firebase/config';
import { useAuthContext } from './useAuthContext';

export const useLogout = () => {
    const isCancelled = useRef(false);
    const [error, setError] = useState(null);
    const [isPending, setIsPending] =useState(false);
    const { dispatch, user } = useAuthContext();

    const logout = async () => {
        setError(null);
        setIsPending(true);

        try{

            const { uid } = user;

            await projectFirestore.collection('users').doc(uid).update({
                online: false
            });

            await projectAuth.signOut();

            dispatch({type: 'LOGOUT'});

            if(!isCancelled.current){
                setError(null); //why?
            }


        }catch(err){
            if(!isCancelled.current){
                console.log(err.message);
                setError(err.message);
            }
        }finally{
            if(!isCancelled.current){
                setIsPending(false);
            }
        }
    }

    useEffect(() => {
        return () => isCancelled.current = true;
    }, []);

    return { logout, error, isPending };
}