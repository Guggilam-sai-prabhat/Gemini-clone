import { createContext , useState} from "react";
import runChat from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
  
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [previousPrompts, setPreviousPrompts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading , setLoading] = useState(false);
  const [resultData, setResultData] = useState("");


  const delayPara = (index,nextWord) =>{
    setTimeout(function (){
      setResultData(prev => prev+nextWord);
    },index*75);
    
  }

  const newChat = () =>{
    setLoading(false);
    setShowResult(false);
  }

  const onSent = async (prompt) => {
    setResultData("")
    setLoading(true)
    setShowResult(true)
    let response;
    if(prompt!==undefined){
      response = await runChat(prompt)
      setRecentPrompt(prompt)
    }
    else{
      setPreviousPrompts(prev => [...prev, input]);
      setRecentPrompt(input)
      response = await runChat(input);
    }
  
    let responseArray = response.split("**")
    let newResponse = "";
    for (let i = 0; i < responseArray.length; i++) {
      if (i === 0 || i % 2 !== 1) {
        newResponse += responseArray[i];
      } else {
        newResponse += "<b>" + responseArray[i] + "</b>"
      }
    }
    
    // Using a regular expression to replace period followed by <b> with period, line break, and then <b>
    newResponse = newResponse.replace(/\.\s*<b>/g, ".</br><b>");

  
    let newResponse2 = newResponse.replaceAll("*", "</br>")
    let newResponseArray = newResponse2.split(" ");
    for (let i = 0; i < newResponseArray.length; i++) {
      const nextWord = newResponseArray[i];
      delayPara(i, nextWord + " ");
    }
    setLoading(false)
    setInput("")
  }
  

  // onSent("what is a flower");
  const ContextValue = {
      previousPrompts,
      setPreviousPrompts,
      onSent,
      setRecentPrompt,
      recentPrompt,
      showResult,
      loading,
      resultData,
      input,
      setInput,
      newChat
      
  }
  return (
    <Context.Provider value={ContextValue}>
      {props.children}
    </Context.Provider>
  );
};

export default ContextProvider;
