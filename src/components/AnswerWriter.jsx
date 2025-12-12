import { useState, useEffect } from 'react';
import { evaluateAnswer } from '../services/api';
import './AnswerWriter.css';

export default function AnswerWriter({ question, statement, taskType, onEvaluationComplete }) {
  const [answer, setAnswer] = useState('');
  const [wordCount, setWordCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const words = answer.trim().split(/\s+/).filter(word => word.length > 0);
    setWordCount(words.length);
  }, [answer]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!answer.trim()) {
      setError('Please write an answer before submitting.');
      return;
    }

    if (wordCount < 50) {
      setError('Your answer is too short. Please write at least 50 words.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await evaluateAnswer({
        question: question,
        answer: answer.trim(),
        wordCount: wordCount,
        task_type: taskType,
      });

      if (response.success && response.data) {
        onEvaluationComplete(response.data);
      } else {
        setError('Failed to evaluate answer. Please try again.');
      }
    } catch (err) {
      setError(err.message || 'Failed to evaluate answer. Please check your API key and connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="answer-writer">
      <h2>Write Your Answer</h2>
      
      {statement && (
        <div className="statement-box">
          <h3>Statement</h3>
          <p>{statement}</p>
        </div>
      )}

      <div className="question-box">
        <h3>Question</h3>
        <p>{question}</p>
      </div>

      <form onSubmit={handleSubmit} className="answer-form">
        <div className="form-group">
          <label htmlFor="answer">
            Your Answer
            <span className="word-count">({wordCount} words)</span>
          </label>
          <textarea
            id="answer"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Write your essay answer here..."
            rows={15}
            className="answer-textarea"
          />
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="form-actions">
          <button type="submit" disabled={loading || wordCount < 50} className="btn btn-primary">
            {loading ? 'Evaluating...' : 'Submit for Evaluation'}
          </button>
          {wordCount < 50 && (
            <span className="hint">Minimum 50 words required</span>
          )}
        </div>
      </form>
    </div>
  );
}

