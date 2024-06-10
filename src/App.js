import React, { useState } from 'react';
import './App.css';
import SummarizerForm from './components/SummarizerForm';
import QuestionForm from './components/QuestionForm';

function App() {
  const [answer, setAnswer] = useState('');
  const [showQuestionForm, setShowQuestionForm] = useState(true);
  const [summary, setSummary] = useState('');
  const [textHeight, setTextHeight] = useState('auto');
  const [loading, setLoading] = useState(false);

  const handleShowQuestionForm = () => {
    setShowQuestionForm(true);
    setAnswer('');
    setSummary('');
  };

  const handleShowSummarizer = () => {
    setShowQuestionForm(false);
    setAnswer('');
    setSummary('');
  };

  const handleTextChange = e => {
    const lines = e.target.value.split('\n').length;
    setTextHeight(`${lines * 20}px`);
  };

  const handleLoading = isLoading => {
    setLoading(isLoading);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Question and Summarizer System</h1>
      </header>
      <div className="chat-container">
        {showQuestionForm ? (
          <div className="form-container">
            <QuestionForm
              setAnswer={setAnswer}
              handleTextChange={handleTextChange}
              textHeight={textHeight}
              handleLoading={handleLoading}
            />
            <button className="switch-button" onClick={handleShowSummarizer}>
              Go to Summarizer
            </button>
          </div>
        ) : (
          <div className="form-container">
            <SummarizerForm
              setSummary={setSummary}
              handleTextChange={handleTextChange}
              textHeight={textHeight}
              handleLoading={handleLoading}
            />
            <button className="switch-button" onClick={handleShowQuestionForm}>
              Go Back to Question Form
            </button>
          </div>
        )}
        {loading && <div className="loading">Loading...</div>}
        {answer && (
          <div className="chat-response">
            <p className="chat-answer">{answer}</p>
          </div>
        )}
        {summary && (
          <div className="chat-response">
            <p className="chat-summary">{summary}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
