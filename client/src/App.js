import './components/css/App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ClassState from './contexts/class/ClassState';

import QuestionState from './contexts/question/QuestionState';
import Home from "./components/Home";
import Navbar from './components/navbar/Navbar';
import QuestionTypeState from './contexts/questiontype/QuestionTypeState';
import QuestionSubjectState from './contexts/subject/QuestionSubjectState';
import Sidebar from './components/sidebar/Sidebar';
import QuestionsScreen from './screens/question/QuestionsScreen';
import QuestionSourceState from './contexts/source/QuestionSourceState';


import ShowQuestions from './components/question/ShowQuestions'
import CreateQuestion from "./components/question/CreateQuestion";

const App = () => {
  return (
    <ClassState>
      <QuestionTypeState>
        <QuestionSourceState>
        <QuestionSubjectState>
          <QuestionState>
            <BrowserRouter>
              <Navbar />
                <main className='mainCon'>
              <Sidebar/>
              <Routes>
                  <Route exact path={"/"} element={<Home />} />
                  <Route path={"/createquestion"} element={<QuestionsScreen element={<CreateQuestion/>}/>} />
                  <Route path={"/showquestion"} element={<QuestionsScreen element={<ShowQuestions/>}/>} />
              </Routes>
                </main>
            </BrowserRouter>
          </QuestionState>
        </QuestionSubjectState>
        </QuestionSourceState>
      </QuestionTypeState>

    </ClassState>
  )
}

export default App
