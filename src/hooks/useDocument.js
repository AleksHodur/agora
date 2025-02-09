import { useEffect, useState } from 'react';
import { projectFirestore } from '../firebase/config';

export const useDocument = (collection, id) => {

    const [document, setDocument] = useState(null);
    const [error, setError] = useState(null);

    // realtime data
    useEffect(() => {

        const ref = projectFirestore.collection(collection).doc(id);

        const unsubscribe = ref.onSnapshot((snapshot) => {
            if (snapshot.exists) {
                console.log('snapshot data: ', snapshot.data());
                console.log('snapshot id: ', snapshot.id);

                //important to add the id since it is not included in data()
                setDocument({...snapshot.data(), id: snapshot.id});
                setError(null);
            }else{
                setError('No such document exists');
            }
        }, (err) => {
            console.log(err.message);
            setError('Failed to get document');
        });

        return () => unsubscribe();

    }, [collection, id]);

    return {document, error};
}