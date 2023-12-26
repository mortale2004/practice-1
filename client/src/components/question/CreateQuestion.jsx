import { useState } from "react";
import SelectControl from "./SelectControl"

const CreateQuestion = () => {
  
  const [question, setQuestion] = useState({ question: "", options: [], solution: "", classId: "", subjectId: "", queTypeId: "" });

const [options, setOptions] = useState({ option1: "", option2: "", option3: "", option4: "" });


const handleChange = (e) => {
  setQuestion({ ...question, [e.currentTarget.name]: e.currentTarget.value });

}


const handleSubmit =async (e) => {
  e.preventDefault();
  setQuestion({ ...question, options: Object.values(options) });
  try {
    const URL = "http://localhost:8080/api/questions";

    const response = await fetch(URL, {
      method: "POST",
      headers:{
        "Content-Type": "application/json",
      },
      body: JSON.stringify(question)
    });

    const json = await response.json();

    if (json.status==="success")
    {
      console.log("Question added")
    }
    else
    {
      console.log("Error Occured", json.result[0])

    }

  } catch (error) {
    
  }
}

const handleOptionChange = (e) => {
  setOptions({ ...options, [e.currentTarget.name]: e.currentTarget.value });
}

const handleRadioChange = (e)=>{
  setQuestion({...question, solution: Number.parseInt(e.currentTarget.value)});
}

  return (
    <main className="showQuestionCon">
    <h1>Create Questions</h1>

    
  <form onSubmit={handleSubmit}>

    <div className="form-control">
      <label htmlFor="question">Question:</label>
      <textarea name="question" id="question" cols="30" rows="10" value={question.question} onChange={handleChange}></textarea>
    </div>


    <div className="control-group">
      <SelectControl label="Question Type" name="queTypeId" question={question} setQuestion={setQuestion} URL="http://localhost:8080/api/questiontypes" />
      <SelectControl label="Class" name="classId" question={question} setQuestion={setQuestion} URL="http://localhost:8080/api/classes" />
    </div>

    <div className="control-group">
      <SelectControl label="Source Tag" name="sourceTagId" question={question} setQuestion={setQuestion} URL="http://localhost:8080/api/sourcetags" />
      <SelectControl label="Subject" name="subjectId" question={question} setQuestion={setQuestion} URL="http://localhost:8080/api/subjects" />
    </div>


    <div>
      <label>Options: </label>

      <div className="row-group">
        <>
          <div className="form-control">
            <label htmlFor="option1">A:</label>
            <input type="text" name="option1" id="option1" onChange={handleOptionChange} value={options.option1} />
          </div>

          <div className="form-control">
            <label htmlFor="option2">B:</label>
            <input type="text" name="option2" id="option2" onChange={handleOptionChange} value={options.option2} />
          </div>

          <div className="form-control">
            <label htmlFor="option3">C:</label>
            <input type="text" name="option3" id="option3" onChange={handleOptionChange} value={options.option3} />
          </div>

          <div className="form-control">
            <label htmlFor="option4">D:</label>
            <input type="text" name="option4" id="option4" onChange={handleOptionChange} value={options.option4} />
          </div>
        </>
      </div>

      <p>Correct Option: </p>

  
      <div className="control-group radio-group">
        <div className="form-control">
          <label htmlFor="A">A</label>
          <input type="radio" name="solution" value="1" id="A" onChange={handleRadioChange}/>
        </div>

        <div className="form-control">
          <label htmlFor="B">B</label>
          <input type="radio" name="solution" value="2"  id="B" onChange={handleRadioChange}/>
        </div>

        <div className="form-control">
          <label htmlFor="C">C</label>
          <input type="radio" name="solution" value="3"  id="C" onChange={handleRadioChange}/>
        </div>

        <div className="form-control">
          <label htmlFor="D">D</label>
          <input type="radio" name="solution" value="4"  id="D" onChange={handleRadioChange}/>
        </div>
      </div>


    </div>



    <button>Add Question</button>


  </form>

  </main>
  )
}

export default CreateQuestion
