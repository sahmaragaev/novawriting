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
      <div className="answer-writer-container">
        <div className="question-panel">
          <div className="question-header">
            <h2>Writing Task 2</h2>
            <div className="task-info">You should spend about 40 minutes on this task</div>
          </div>
          
          {statement && (
            <div className="statement-box">
              <p className="statement-text">{statement}</p>
            </div>
          )}

          <div className="question-box">
            <p className="question-text">{question}</p>
          </div>

          <div className="instructions">
            <p>Write at least 250 words.</p>
            <p>You should write your answer in the space provided on the right.</p>
          </div>
        </div>

        <div className="writing-panel">
          <form onSubmit={handleSubmit} className="answer-form">
            <div className="writing-header">
              <label htmlFor="answer" className="writing-label">
                Your Answer
              </label>
              <div className="word-count-badge">
                <span className="word-count">{wordCount}</span>
                <span className="word-label">words</span>
              </div>
            </div>
            
            <textarea
              id="answer"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Write your essay here..."
              className="answer-textarea"
            />

            {error && <div className="error-message">{error}</div>}

            <div className="form-actions">
              {wordCount < 50 && (
                <span className="hint">Minimum 50 words required</span>
              )}
              <button type="submit" disabled={loading || wordCount < 50} className="btn btn-primary">
                {loading ? 'Evaluating...' : 'Submit for Evaluation'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

