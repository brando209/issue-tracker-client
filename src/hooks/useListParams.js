import { useState } from 'react';

function useListParams(initalParams) {
    const [listParams, setListParams] = useState(initalParams);

    function handleChange(param, value) {
        setListParams(prev => ({ ...prev, [param]: value}));
    }

    return [listParams, handleChange];
}

export default useListParams;