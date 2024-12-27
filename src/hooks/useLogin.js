import { useState, useEffect, useRef } from 'react';
import { projectAuth, projectFirestore } from '../firebase/config';
import { useAuthContext } from './useAuthContext'

export const useLogin = () => {
    const isCancelled = useRef(false);
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const { dispatch } = useAuthContext();

    const login = async (email, password) => {
        setError(null);
        setIsPending(true);

        try{
            const res = await projectAuth.signInWithEmailAndPassword(email, password);
            console.log('this is res: ', res);

            if(res){
                await projectFirestore.collection('users').doc(res.user.uid).update({ online: true });
            }else{
                throw new Error('Could not log in. Please try again later');
            }

            dispatch({type: 'LOGIN', payload: res.user});

        }catch (err) {
            if(!isCancelled.current) {
                console.log(err.message);
            }
        }finally{
            if(!isCancelled.current) {
                setIsPending(false);
                setError(null);
            }
        }
    }

    useEffect(() => {
        return () => isCancelled.current = true;
    }, []);

    return { error, isPending, login };
}