import { useEffect, useState } from 'react';
import { projectFirestore } from '../firebase/config';

export const useDocument = (collection, id) => {

    const [document, setDocument] = useState(null);
    const [error, setError] = useState(null);

    // realtime data
    useEffect(() => {

        const ref = projectFirestore.collection(collection).doc(id);

        const unsubscribe = ref.onSnapshot((snapshot) => {
            setDocument({...snapshot.data()});
            setError(null);
        }, (err) => {
            console.log(err.message);
            setError('Failed to get document');
        });

        return () => unsubscribe();

    }, [collection, id]);
}