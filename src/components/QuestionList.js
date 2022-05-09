import React from "react";
import QuestionItem from "./QuestionItem";

function QuestionList({ fetchedQuestions, onDeleteClick, onChangeAnswer }) {
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        <QuestionItem fetchedQuestions={fetchedQuestions} onDeleteClick={onDeleteClick} onChangeAnswer={onChangeAnswer} />
      </ul>
    </section>
  );
}

export default QuestionList;
