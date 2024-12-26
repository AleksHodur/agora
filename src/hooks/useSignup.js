import { useEffect, useRef, useState } from 'react';
import { projectAuth } from '../firebase/config';
import { useAuthContext } from './useAuthContext';
import { usePinata } from './usePinata';

export const useSignup = () => {
    const isCancelled= useRef(false);
    const [error, setError] = useState(null);
    const [isPending, setIsPending] =useState(false);
    const { dispatch } = useAuthContext();
    const { uploadDocument/* , responsePinata */ } = usePinata();

    const signup = async (displayName, email, password, thumbnail) => {
        setError(null);
        setIsPending(true);

        try{
            const res = await projectAuth.createUserWithEmailAndPassword(email, password);
            console.log(res.user);

            if(!res){
                throw new Error('Could not complete sign up');
            }

            await res.user.updateProfile({ displayName });

            let imgURL = null;

            if(thumbnail){
                const response = await uploadDocument(thumbnail);

                //console.log("This is responsePinata", responsePinata);
                console.log("This is response from pinata", response);

                if(response){
                    var hash = response.IpfsHash;
                    console.log('Response pinata ', hash);
                    imgURL = `https://gateway.pinata.cloud/ipfs/${hash}`;
                }else{
                    console.log('Error uploading from useSignup hook');
                }
            }

            await res.user.updateProfile({ photoURL: imgURL });

            dispatch({type: 'LOGIN', payload: res.user});

            if(!isCancelled.current){
                setError(null);
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

    return { signup, error, isPending };
}