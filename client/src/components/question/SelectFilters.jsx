const SelectFilters = ({name, label, arr, handleSelectChange}) => {
    return (
        <div className='form-control'>
            <label htmlFor={name}>Filter Questions By Its {label}:</label>
            <select name={name} id={name} onChange={handleSelectChange}>
                <option>Select {label}</option>
                {arr.map(a => <option key={a._id} value={a._id}>{a.name}</option>)}
            </select>
        </div>
    )
}

export default SelectFilters;
