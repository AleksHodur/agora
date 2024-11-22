import { useEffect, useState } from 'react';
import { projectAuth } from '../firebase/config';
import { useAuthContext } from './useAuthContext';

export const useSignup = () => {
    const [isCancelled, setIsCancelled] = useState(false);
    const [error, setError] = useState(null);
    const [isPending, setIsPending] =useState(false);
    const { dispatch } = useAuthContext();

    const signup = async (displayName, email, password) => {
        setError(null);
        setIsPending(true);

        try{
            const res = await projectAuth.createUserWithEmailAndPassword(email, password);
            console.log(res.user);

            if(!res){
                throw new Error('Could not complete sign up');
            }

            await res.user.updateProfile({ displayName });

            dispatch({type: 'LOGIN', payload: res.user});

            if(!isCancelled){
                setError(null);
            }


        }catch(err){
            if(!isCancelled){
                console.log(err.message);
                setError(err.message);
            }
        }finally{
            if(!isCancelled){
                setIsPending(false);
            }
        }
    }

    useEffect(() => {
        return () => setIsCancelled(true);
    }, []);

    return { signup, error, isPending };
}