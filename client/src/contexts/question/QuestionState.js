import { useEffect, useState } from "react";
import QuestionContext from "./QuestionContext";

const QuestionState = (props)=>{

    const [questions, setQuestions] = useState([]);
    const [pageNo, setPageNo] = useState(1);
    const [limit, setLimit] = useState(3);
    const [isNext, setIsNext] = useState(true);
    const [loading, setLoading] = useState(true);

    const URL = `${process.env.REACT_APP_API}questions`;

    const getQuestions = async (pageNo, questions) => {  
        try {
            setLoading(true);
            const response = await fetch(`${URL}?pageNo=${pageNo}&limit=${limit}`, {
                method: "GET"
            });
            const json =  await response.json();


            if (json.status==="success")
            {
                
                setQuestions([...questions, ...json.result.questions]);
                setIsNext(json.result.total>pageNo*limit);
            }
            else if (json.status==="error")
            {
                console.log(json.result);
            }
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    }

    const getNextQuestions = ()=>{
        setPageNo((pageNo)=>pageNo+1);
        getQuestions(pageNo+1, questions);
    }


    useEffect(()=>{
        getQuestions(pageNo, []);
    }, [limit])

    useEffect(()=>{
        getQuestions(1, []);
    },[]);
    

    return( 
    <QuestionContext.Provider value={{questions, setQuestions, getNextQuestions, isNext, loading, limit, setLimit}}>
        {props.children}
    </QuestionContext.Provider>
    )
}

export default QuestionState;