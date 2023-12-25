import React, { useState } from 'react'

const QuestionType = ({ type }) => {
    return (
        <div>
            <label>Options: </label>

            <div className="row-group">
                {type === "MCQ" &&

                    <>
                        <div className="control-group">
                            <label htmlFor="option1">A:</label>
                            <input type="text" name="option1" id="option1" />
                        </div>

                        <div className="control-group">
                            <label htmlFor="option2">B:</label>
                            <input type="text" name="option1" id="option1" />
                        </div>

                        <div className="control-group">
                            <label htmlFor="option3">C:</label>
                            <input type="text" name="option3" id="option3" />
                        </div>

                        <div className="control-group">
                            <label htmlFor="option4">D:</label>
                            <input type="text" name="option4" id="option4" />
                        </div>
                    </>
                }

            </div>

            <p>Correct Option: </p>
            <div className="radioCon">
                <div className="control-group">
                    <label htmlFor="A">A</label>
                    <input type="radio" name="solution" id="A" />
                </div>

                <div className="control-group">
                    <label htmlFor="B">B</label>
                    <input type="radio" name="solution" id="B" />
                </div>

                <div className="control-group">
                    <label htmlFor="C">C</label>
                    <input type="radio" name="solution" id="C" />
                </div>

                <div className="control-group">
                    <label htmlFor="D">D</label>
                    <input type="radio" name="solution" id="D" />
                </div>
            </div>


        </div>
    )
}

export default QuestionType;
