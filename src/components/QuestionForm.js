import React, { useState } from 'react';
import axios from 'axios';

const QuestionForm = ({ setAnswer, handleLoading }) => {
  const [text, setText] = useState('');
  const [question, setQuestion] = useState('');

  const handleTextChange = e => {
    setText(e.target.value);
    adjustTextareaHeight(e.target); // Điều chỉnh kích thước của textarea
  };

  const adjustTextareaHeight = textarea => {
    textarea.style.height = 'auto'; // Đặt chiều cao về auto để tính toán lại kích thước
    textarea.style.height = `${textarea.scrollHeight}px`; // Đặt chiều cao mới
  };

  const handleQuestionChange = e => {
    setQuestion(e.target.value);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (text && question) {
      handleLoading(true); // Đặt trạng thái loading khi bắt đầu submit
      try {
        const response = await axios.post('http://localhost:5000/api/answer', {
          text: text,
          question: question,
        });
        setAnswer(response.data.answer);
      } catch (error) {
        console.error('Error fetching the answer:', error);
      } finally {
        handleLoading(false); // Đặt trạng thái loading sau khi nhận phản hồi
      }
    }
  };

  return (
    <div className="form-container">
      <h2>Question Form</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          className="chat-textarea"
          placeholder="Type your text here..."
          value={text}
          onChange={handleTextChange}
          rows={5}
        />
        <input
          className="chat-input"
          type="text"
          placeholder="Ask your question here..."
          value={question}
          onChange={handleQuestionChange}
        />
        <button className="chat-submit" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default QuestionForm;
