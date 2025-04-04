import { useReducer, useEffect, useState } from 'react';
import { projectFirestore, timestamp } from '../firebase/config';

let initialState = {
    document: null,
    isPending: false,
    error: null,
    success: null
}

const firestoreReducer = (state, action) => {
    switch (action.type) {
        case 'IS_PENDING':
            return { isPending: true, document: null, success: false, error: null}

        case 'ADDED_DOCUMENT':
            return { isPending: false, document: action.payload, success: true, error: null}

        case 'DELETED_DOCUMENT':
            return { isPending: false, document: null, success: true, error: null}

        case 'UPDATED_DOCUMENT':
            return { isPending: false, success: true, error: null, document: action.payload }
    
        case 'ERROR':
            return { isPending: false, success: false, error: action.payload, document: null }
    
        default:
            return state;
    }
}

export const useFirestore = (collection) => {

    const [response, dispatch] = useReducer(firestoreReducer, initialState);
    const [isCancelled, setIsCancelled] = useState(false);

    const ref = projectFirestore.collection(collection);

    const dispatchIfNotCancelled = (action) => {
        if(!isCancelled){
            dispatch(action);
        }
    }

    const addDocument = async (doc) => {
        dispatch({ type: 'IS_PENDING' });

        try{
            const createdAt = timestamp.fromDate(new Date());
            const addedDoc = await ref.add({ ...doc, createdAt });
            dispatchIfNotCancelled({ type: 'ADDED_DOCUMENT', payload: addedDoc });
        }catch(err){
            dispatchIfNotCancelled({ type: 'ERROR', payload: err.msg });
        }

    }

    const deleteDocument = async (id) => {
        dispatch({ type: 'IS_PENDING' });

        try{
            await ref.doc(id).delete();
            dispatchIfNotCancelled({ type: 'DELETED_DOCUMENT' });
        }catch(err){
            dispatchIfNotCancelled({ type: 'ERROR', payload: 'could not delete' });
        }
    }

    const updateDocument = async (id, updates) => {
        dispatch({ type: 'IS_PENDING'});

        try{
            const updatedDocument = await ref.doc(id).update(updates);
            dispatchIfNotCancelled({ type: 'UPDATED_DOCUMENT', payload: updatedDocument});
            return updatedDocument;

        } catch (err) {
            dispatchIfNotCancelled({ type: 'ERROR', payload: err.message });
            return null;
        }
    }

    useEffect(() => {
        setIsCancelled(false);
        return () => setIsCancelled(true);
    }, []);

    return { addDocument, deleteDocument, updateDocument, response }
}

