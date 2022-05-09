import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [fetchedQuestions, setFetchedQuestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/questions")
      .then(response => response.json())
      .then(questions => setFetchedQuestions(questions))
      .catch(error => alert(error.message))
      .finally(console.log("Initial fetching successful."))
  }, [])

  function handleAddNewQuestion(formData) {
    fetch("http://localhost:3000/questions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt: formData.prompt,
        answers: [
          formData.answer1,
          formData.answer2,
          formData.answer3,
          formData.answer4
        ],
        correctIndex: formData.correctIndex
      })
    })
    .then(response => response.json())
    .then(addNewQuestion => setFetchedQuestions([...fetchedQuestions, addNewQuestion]))
    .catch(error => alert(error.message))
    .finally(console.log("New question successfully added."))
  }

  function handleUpdateAnswer(event, questionId) {
    for (let i = 0; i < event.target.childNodes.length; i++) {
      if (event.target.childNodes[i].value === event.target.value) {

        return fetch(`http://localhost:3000/questions/${questionId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ correctIndex: event.target.childNodes[i].index })
        })
        .then(response => response.json())
        .catch(error => alert(error.message))
        .finally(console.log("Answer index successfully updated."))
      }
    }
  }

  function handleDeleteQuestion(targetQuestion) {
    const newQuestions = fetchedQuestions.filter(question => question.id !== targetQuestion.id);
    setFetchedQuestions(newQuestions);
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm OnNewQuestionSubmit={handleAddNewQuestion} /> : <QuestionList fetchedQuestions={fetchedQuestions} onDeleteClick={handleDeleteQuestion} onChangeAnswer={handleUpdateAnswer} />}
    </main>
  );
}

export default App;
