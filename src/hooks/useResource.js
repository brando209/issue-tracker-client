import { useState, useEffect } from 'react';
import axios from 'axios';

function useResource(path, authToken) {
    const [resource, setResource] = useState({
        data: [],
        isLoading: false,
        isError: false
    });

    
    useEffect(() => {

        const fetchResource = async () => {
            setResource({ data: [], isLoading: true, isError: false });
            try {
                const headers = authToken ? { 'Authorization': `Bearer ${authToken}` } : {}
                const response = await axios.get(path, { headers });
                setResource({ data: response.data, isLoading: false, isError: false });
            } catch(err) {
                console.log(err);
                setResource({ data: err, isLoading: false, isError: true })
            }
        }

        fetchResource();

    }, [path, authToken]);

    return [resource, setResource];
}

export default useResource;