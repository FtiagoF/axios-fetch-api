import React, { useState, useEffect } from 'react';
import { useAPI } from './hooks/useApi';

type Question = {
  id: number,
  question: string,
  answers: {
    answer_a: string,
    answer_b: string,
    answer_c: string,
    answer_d: string,
    answer_e: string
  },
  correct_answers: [],
  category: string,
  difficult: string
}

function App() {
  const { response: questions, Error, isFetching } = 
  useAPI<Question[]>('/api/v1/questions', {
    params: {
      'apiKey': process.env.REACT_APP_QUIZAPI_KEY,
      'limit': 10
    }
  });
  return (
    <ul>
      { isFetching && <p>Carregando...</p> }
      { Error && alert(Error.message) }
      { questions?.map((quest:any) => {
        return (
          <li key={quest.id}>          
            <p><strong>{quest.id}</strong> - {quest.question}</p>
            <ol>
              {Object.keys(quest.answers).map((answer) => (
                <li key={(answer.split('_')[1])}>{quest.answers[answer]}</li>
              ))}
            </ol>
          </li>          
        );
      }) }
    </ul>
  );
}

export default App;
