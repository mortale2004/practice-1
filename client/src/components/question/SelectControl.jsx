import { useState, useEffect } from 'react'



const SelectControl = ({label, name, setQuestion, question, URL}) => {

    const [options, setOptions] = useState([]);

    const loadOptions = async ()=>{
        const response = await fetch(URL);
        const json = await response.json();
        setOptions([...options, ...json.result]);
    }

    useEffect(() => {
        loadOptions();
    }, []);


    const handleSelection = (e)=>{
        {
            // handleTypeChange();
        }
        setQuestion({...question, [e.currentTarget.name]: e.currentTarget.options[e.currentTarget.options.selectedIndex].value })
    }
    
    return (
        <div className="form-control">
            <label htmlFor={name}>{label}</label>
            <select name={name} id={name} onChange={handleSelection}>
                <option value="">Select {label}:</option>
                {options.map((option, i)=>{ return <option key={i} value={option._id}>{option.name}</option>})}
            </select>
        </div>
    )
}

export default SelectControl
