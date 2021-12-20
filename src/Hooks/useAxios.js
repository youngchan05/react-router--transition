import React ,{useState, useEffect} from 'react'
import * as request from '../apis/request';
function useAxios(api,config, skip = false) {
    const [ fetch, setfetch] = useState(true);
    const [ fetchSkip, setFetchSkip] = useState(skip);
    const [ state, setState ] = useState({
        loding:false,
        error:false,
        data:null,
    });
    const getApi = async() => {
        setState({...state, loding:true})
        const res = await request.getDataByApiName(api, config)
        .catch(e => {
            console.log(res)
            setState({
                loding:false,
                error:e,
            })
        })
        setState({...state, loding:false, data:res})
        return res;
    }
    const fetchTrigger = () => {
        setFetchSkip(false)
        setfetch(!fetch);
    }
    useEffect(() => {
        if(fetchSkip) return;
        getApi();
    }, [fetch])
    return {
        ...state,
        fetchTrigger,
    }
}

export default useAxios
