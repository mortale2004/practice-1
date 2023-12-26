import { useEffect, useState } from "react";
import ClassContext from "./ClassContext";

const ClassState = (props)=>{

    const [classes, setClasses] = useState([]);
    const URL = `${process.env.REACT_APP_API}classes`

    const getClasses = async ()=>{
        try {
            const response = await fetch(URL, {
                method: "GET"
            });
            const json =  await response.json();
            if (json.status==="success")
            {
                setClasses(json.result);
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
        getClasses();
    },[])

    return( 
    <ClassContext.Provider value={{classes, setClasses}}>
        {props.children}
    </ClassContext.Provider>
    )
}

export default ClassState;