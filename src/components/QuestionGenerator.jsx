import { useState } from 'react';
import { generateQuestion } from '../services/api';
import './QuestionGenerator.css';

const TASK_TYPES = [
  { value: 'opinion', label: 'Opinion' },
  { value: 'advantage_disadvantage', label: 'Advantage/Disadvantage' },
  { value: 'problem_solution', label: 'Problem/Solution' },
  { value: 'discuss_both_views', label: 'Discuss Both Views' },
];

export default function QuestionGenerator({ onQuestionGenerated }) {
  const [taskType, setTaskType] = useState('');
  const [includeTopics, setIncludeTopics] = useState('');
  const [excludeTopics, setExcludeTopics] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const params = {
        test_type: 'task2',
        ...(taskType && { task_type: taskType }),
        ...(includeTopics && {
          include_topics: includeTopics.split(',').map(t => t.trim()).filter(Boolean),
        }),
        ...(excludeTopics && {
          exclude_topics: excludeTopics.split(',').map(t => t.trim()).filter(Boolean),
        }),
      };

      const response = await generateQuestion(params);
      
      if (response.success && response.data) {
        onQuestionGenerated({
          question: response.data.question,
          statement: response.data.statement,
          taskType: taskType || 'opinion',
        });
      } else {
        setError('Failed to generate question. Please try again.');
      }
    } catch (err) {
      setError(err.message || 'Failed to generate question. Please check your API key and connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="question-generator">
      <h2>Generate Writing Question</h2>
      <form onSubmit={handleSubmit} className="question-form">
        <div className="form-group">
          <label htmlFor="taskType">Task Type (Optional)</label>
          <select
            id="taskType"
            value={taskType}
            onChange={(e) => setTaskType(e.target.value)}
            className="form-select"
          >
            <option value="">Any</option>
            {TASK_TYPES.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="includeTopics">Include Topics (Optional, comma-separated)</label>
          <input
            id="includeTopics"
            type="text"
            value={includeTopics}
            onChange={(e) => setIncludeTopics(e.target.value)}
            placeholder="e.g., technology, education, environment"
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="excludeTopics">Exclude Topics (Optional, comma-separated)</label>
          <input
            id="excludeTopics"
            type="text"
            value={excludeTopics}
            onChange={(e) => setExcludeTopics(e.target.value)}
            placeholder="e.g., politics, religion"
            className="form-input"
          />
        </div>

        {error && <div className="error-message">{error}</div>}

        <button type="submit" disabled={loading} className="btn btn-primary">
          {loading ? 'Generating...' : 'Generate Question'}
        </button>
      </form>
    </div>
  );
}

