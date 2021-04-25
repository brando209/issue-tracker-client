import { useState, useEffect } from 'react';
import axios from 'axios';

function useResource(path, authToken, forkedPaths = []) {
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
                let response;
                if(forkedPaths.length > 0) {
                    const promises = [];
                    forkedPaths.forEach(fork => {
                        promises.push(axios.get(path + "/" + fork, { headers }));
                    });
                    response = await Promise.all(promises);
                    response = response.map(obj => obj.data);
                    setResource({ data: response, isLoading: false, isError: false });
                } else {
                    response = await axios.get(path, { headers });
                    setResource({ data: response.data, isLoading: false, isError: false });
                }

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