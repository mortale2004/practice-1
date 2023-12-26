import { Edit, Eye, Trash } from 'lucide-react';
import { useRef } from 'react';

const TRQuestion = ({ question, i, src}) => {

    const trRef = useRef();

    const handleTrashClick = async (e, id) => {
        //   const URL = `${process.env.REACT_APP_API}questions/${id}`;
        //   const response = await fetch(URL, {
        //     method: "DELETE",
        //   });
        //   const json = await response.json();
        // e.target.parentElement.remove();
        trRef.current.remove();
    }

    return (
        <>
            {<tr key={question._id} id={question._id} ref={trRef}>
                <td><Trash className='Trash' onClick={handleTrashClick} /> <Edit className='Edit' /> <Eye className='Eye' /></td>
                <td>{i}</td>
                <td>{question.question}</td>
                <td><ul style={{ listStyle: "upper-alpha" }}>{question.options.map((op, i) => <li key={i}>{op}</li>)}</ul></td>
                <td>{question.solution}</td>
                <td>{src.questionSources[src?.questionSources.findIndex(src => src._id === question.sourceTagId)]?.name}</td>
            </tr>}
        </>
    )
}

export default TRQuestion
