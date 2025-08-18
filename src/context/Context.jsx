import React from 'react';
import runChat from '../config/rashika-ai';

export const Context = React.createContext();

const ContextProvider = (props) => {


    const[input, setInput] = React.useState("");
    const[recentPrompt, setRecentPrompt] = React.useState("");
    const[prevPrompts, setPrevPrompts] = React.useState([]);
    const [showResult, setShowResult] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [resultData, setResultData] = React.useState("");


    const onSent = async (prompt) => {  
        
        setResultData("")
        setLoading(true)
        setShowResult(true)
        setRecentPrompt(input)
        const response = await runChat(input)
        setResultData(response);
        setLoading(false);
        setInput("")
    };



    const contextValue = {
        prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput

    };

    return(
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    );
};

export default ContextProvider;