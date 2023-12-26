import { useEffect, useState } from "react";
import QuestionSourceContext from "./QuestionSourceContext";

const QuestionSourceState = (props)=>{

    const URL = `${process.env.REACT_APP_API}sourcetags`
    const [questionSources, setQuestionsSources] = useState([]);


    const getQuestionSources = async ()=>{
        try {
            const response = await fetch(URL, {
                method: "GET"
            });
            const json =  await response.json();
            if (json.status==="success")
            {
                setQuestionsSources(json.result);
            }
            else if (json.status==="error")
            {
                console.log(json.result);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        getQuestionSources();
    },[]);

    return( 
    <QuestionSourceContext.Provider value={{questionSources, setQuestionsSources}}>
        {props.children}
    </QuestionSourceContext.Provider>
    )
}

export default QuestionSourceState;