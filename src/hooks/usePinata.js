import {/*  useReducer,  */useEffect, useRef } from 'react';
import { projectPinata } from '../pinata/config';

/* let initialState = {
    document: null,
    isPending: false,
    error: null,
    success: null
}

const pinataReducer = (state, action) => {
    switch (action.type) {
        case 'IS_PENDING':
            return { isPending: true, document: null, success: false, error: null };

        case 'UPLOADED_DOCUMENT':
            return { isPending: false, document: action.payload, success: true, error: null };

        case 'ERROR':
            return { isPending: false, document: null, success: false, error: action.payload };

        default:
            return state;
    }
} */

export const usePinata = () => {
    //const [responsePinata, dispatch] = useReducer(pinataReducer, initialState);
    const isCancelled = useRef(false);

/*     const dispatchIfNotCancelled = (action) => {
        if(!isCancelled.current){
            dispatch(action);
        }
    } */

    const uploadDocument = async (doc) => {
        //dispatch({ type: 'IS_PENDING'});

        try{
            const uploadedDoc = await projectPinata.upload.file(doc);

            if (!uploadedDoc || !uploadedDoc.IpfsHash) {
                throw new Error('Invalid response from Pinata API');
            }

            //dispatchIfNotCancelled({ type: 'UPLOADED_DOCUMENT', payload: uploadedDoc});
            return uploadedDoc;

        }catch (err) {
            //dispatchIfNotCancelled({ type: 'ERROR', payload: err.msg });
            return null;
        }
    }

    useEffect(() => {
        isCancelled.current = false;
        return () => isCancelled.current = true;
    }, []);

    return { uploadDocument/* , responsePinata */ }

}