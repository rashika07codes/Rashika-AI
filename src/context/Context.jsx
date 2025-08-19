import React from 'react';
import runChat from '../config/rashika-ai';

export const Context = React.createContext();

const ContextProvider = (props) => {


    const[input, setInput] = React.useState("");
    const[recentPrompt, setRecentPrompt] = React.useState("");
    const [prevPrompts, setPrevPrompts] = React.useState([]);
    const [showResult, setShowResult] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [resultData, setResultData] = React.useState("");


    const delayPara = (index,nextWord) => {
        setTimeout(function () {
            setResultData(prev => prev + nextWord);
        },75*index)
    }

    const newChat = () =>{
        setLoading(false)
        setShowResult(false)
    }


    const onSent = async (prompt) => {  
        
        setResultData("")
        setLoading(true)
        setShowResult(true)
        let response;
        if (prompt !== undefined) {
            setPrevPrompts(prev => [...prev, prompt]);
            response = await runChat(prompt);
            setRecentPrompt(prompt)
        }
        else
        {
            setPrevPrompts(prev => [...prev, input]);
            setRecentPrompt(input)
            response = await runChat(input)
        }
        

        let responseArray = response.split("**");
        let newResponse = "";
        for(let i=0; i < responseArray.length; i++)
        {
            if (i === 0 || i%2 !== 1) {
                newResponse += responseArray[i];
            }
            else{
                newResponse +="<b>"+responseArray[i]+"</b>";
            }
        }
        let newResponse2 = newResponse.replace(/\*/g, "")
        let newResponseArray = newResponse2.split(" ");
        for(let i=0; i<newResponseArray.length;i++)
        {
            const nextWord = newResponseArray[i];
            delayPara(i,nextWord+" ");
        }
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
        setInput,
        newChat,

    };

    return(
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    );
};

export default ContextProvider;