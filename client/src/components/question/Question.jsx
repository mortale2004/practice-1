// import {Trash} from "lucide-react"
// const Question = ({question, i}) => {

//     const handleTrashClick = async (e, id)=>{
//         const URL = `${process.env.REACT_APP_API}questions/${id}`;
//         const response = await fetch(URL, {
//             method: "DELETE",
//         });
//         const json = await response.json();
//         e.target.parentElement.remove();
//     }

//   return (
//     <div className="questionCon">
//       <h3>Q.{i+1} {question.question}</h3>
//       <p>Options:-</p>
//       <ol style={{listStyle: "upper-alpha", margin: "0 0 0 20px"}}>
//         {question.options.map(option=><li key={option}>{option}</li>)}
//       </ol>
//       <button onClick={(e)=>handleTrashClick(e, question._id)}><Trash/></button>
//     </div>
//   )
// }

// export default Question
