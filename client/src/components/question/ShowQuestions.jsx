import { useContext, useEffect, useState } from 'react'
import loading from "../assets/images/giphy.gif";


import QuestionContext from '../../contexts/question/QuestionContext';
import QuestionTypeContext from '../../contexts/questiontype/QuestionTypeContext';
import ClassContext from '../../contexts/class/ClassContext';
import QuestionSubjectContext from '../../contexts/subject/QuestionSubjectContext';
import SelectFilters from './SelectFilters';

import SearchBox from '../Search/SearchBox';
import QuestionSourceContext from '../../contexts/source/QuestionSourceContext';
import TRQuestion from './TRQuestion';
import "./css/showQuestion.css";

const ShowQuestions = () => {

  const q = useContext(QuestionContext);
  const qt = useContext(QuestionTypeContext);
  const c = useContext(ClassContext);
  const s = useContext(QuestionSubjectContext);
  const src = useContext(QuestionSourceContext);

  const [showQue, setShowQue] = useState(q.questions);

  const handleSelectChange = (e) => {
    if (e.currentTarget.options.selectedIndex === 0) {
      setShowQue(q.questions);
      return;
    }
    setShowQue(q.questions.filter(que => que[e.currentTarget.name] === e.currentTarget.options[e.currentTarget.options.selectedIndex].value));
  }

  useEffect(() => {
    setShowQue(q.questions);
  }, [q.questions, src.questionSources])


  return (
    <main className="showQuestionCon">
      <h1>Manage Questions</h1>

      <div className="searchMainCon">
        <div className="form-control">
          <input type='number' id='results' value={q.limit} onChange={(e) => q.setLimit(e.target.value)} />
          <label htmlFor="results">Items Per Page</label>
        </div>

        <SearchBox />

      </div>

      <div className="control-group">
        <SelectFilters name="queTypeId" label="Type" arr={qt.questionTypes} handleSelectChange={handleSelectChange} />
        <SelectFilters name="classId" label="Class" arr={c.classes} handleSelectChange={handleSelectChange} />
        <SelectFilters name="subjectId" label="Subject" arr={s.questionSubjects} handleSelectChange={handleSelectChange} />
      </div>


      <table>
        <thead>
          <tr>
            <th>Actions</th>
            <th>Sr.No.</th>
            <th>Question</th>
            <th>Options</th>
            <th>Solution</th>
            <th>Source</th>
          </tr>
        </thead>


        {<tbody>
          {showQue.map((question,i)=> <TRQuestion key={question._id} i={i+1} question={question} src={src}/>)}
        </tbody>}

      </table>



      {(showQue.length === 0) && <h1>No Results To Show...</h1>}

      {q.loading && <img src={loading} />}
      {q.isNext && <button onClick={q.getNextQuestions}>Load More</button>}
    </main>
  );
}

export default ShowQuestions
