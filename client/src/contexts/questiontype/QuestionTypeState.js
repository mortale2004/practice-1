import { useEffect, useState } from "react";
import QuestionTypeContext from "./QuestionTypeContext";

const QuestionTypeState = (props)=>{

    const URL = `${process.env.REACT_APP_API}questiontypes`
    const [questionTypes, setQuestionsTypes] = useState([]);


    const getQuestionTypes = async ()=>{
        try {
            const response = await fetch(URL, {
                method: "GET"
            });
            const json =  await response.json();
            if (json.status==="success")
            {
                setQuestionsTypes(json.result);
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
        getQuestionTypes();
    },[]);

    return( 
    <QuestionTypeContext.Provider value={{questionTypes, setQuestionsTypes}}>
        {props.children}
    </QuestionTypeContext.Provider>
    )
}

export default QuestionTypeState;