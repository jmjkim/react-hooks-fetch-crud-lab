import React from "react";

function QuestionItem({ fetchedQuestions, onDeleteClick, onChangeAnswer }) {
  function handleDeleteClick(question) {
    fetch(`http://localhost:3000/questions/${question.id}`, {
      method: "DELETE"
    })
    .then(response => response.json())
    .then(() => onDeleteClick(question))
    .catch(error => alert(error.message))
    .finally(console.log("Question successfully deleted."))
  }

  return fetchedQuestions.map(question => {
    return (
      <React.Fragment key={question.id}>
        <li>
         <h4>Question {question.id}</h4>
         <h5>Prompt: {question.prompt}</h5>
         <label>
           Correct Answer:
           <select defaultValue={question.correctIndex} onChange={(event) => onChangeAnswer(event, question.id)}>
             {question.answers.map((option, index) => <option key={option} id={index}>{option}</option>)}
           </select>
         </label>
         <button onClick={() => handleDeleteClick(question)}>Delete Question</button>
       </li>
    </React.Fragment>
    );
  })
}

export default QuestionItem;
