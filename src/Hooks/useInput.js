import React ,{useState} from 'react'
function useInput(initalState) {
    const [ state, setInput] = useState(initalState);
    const onChangeInput = (e) => {
        const { value, name } = e.target;
        setInput({
            ...state,
            [name]:value,
        })
    }
    return {
        state,
        onChangeInput
    }
}

export default useInput
