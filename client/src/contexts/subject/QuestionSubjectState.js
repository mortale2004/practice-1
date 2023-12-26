import { useEffect, useState } from "react";
import QuestionSubjectContext from "./QuestionSubjectContext";

const QuestionSubjectState = (props)=>{

    const URL = `${process.env.REACT_APP_API}subjects`
    const [questionSubjects, setQuestionsSubjects] = useState([]);


    const getQuestionSubjects = async ()=>{
        try {
            const response = await fetch(URL, {
                method: "GET"
            });
            const json =  await response.json();
            if (json.status==="success")
            {
                setQuestionsSubjects(json.result);
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
        getQuestionSubjects();
    },[]);

    return( 
    <QuestionSubjectContext.Provider value={{questionSubjects, setQuestionsSubjects}}>
        {props.children}
    </QuestionSubjectContext.Provider>
    )
}

export default QuestionSubjectState;