import React, { useState } from 'react';
import axios from 'axios';

const SummarizerForm = ({ setSummary, handleLoading }) => {
  const [text, setText] = useState('');

  const handleTextChange = e => {
    setText(e.target.value);
    adjustTextareaHeight(e.target); // Điều chỉnh kích thước của textarea
  };

  const adjustTextareaHeight = textarea => {
    textarea.style.height = 'auto'; // Đặt chiều cao về auto để tính toán lại kích thước
    textarea.style.height = `${textarea.scrollHeight}px`; // Đặt chiều cao mới
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (text) {
      handleLoading(true); // Đặt trạng thái loading khi bắt đầu submit
      try {
        const response = await axios.post('http://localhost:5000/api/answer', {
          text: text,
        });
        setSummary(response.data.summary);
      } catch (error) {
        console.error('Error fetching the summary:', error);
      } finally {
        handleLoading(false); // Đặt trạng thái loading sau khi nhận phản hồi
      }
    }
  };

  return (
    <div className="form-container">
      <h2>Summarizer Form</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          className="chat-textarea"
          placeholder="Type your text here..."
          value={text}
          onChange={handleTextChange}
          rows={5}
        />
        <button className="chat-submit" type="submit">
          Summarize
        </button>
      </form>
    </div>
  );
};

export default SummarizerForm;
